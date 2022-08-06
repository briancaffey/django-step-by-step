#!/bin/bash

# This script will be called to update an ad hoc environment backend
# with a new image tag. It will first run pre-update tasks (such as migrations)
# and then do a rolling update of the backend services.

# It is called from the ad_hock_backend_update.yml GitHub Actions file

# Required environment variables that need to be exported before running this script:

# WORKSPACE - ad hoc environment workspace
# SHARED_RESOURCES_WORKSPACE - shared resources workspace
# BACKEND_IMAGE_TAG - backend image tag to update services to (e.g. v1.2.3)
# AWS_ACCOUNT_ID - AWS account ID is used for the ECR repository URL

echo "Updating backend services..."

# first define a variable containing the new image URI
NEW_BACKEND_IMAGE_URI="$AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/backend:$BACKEND_IMAGE_TAG"


# register new task definitions
# https://docs.aws.amazon.com/cli/latest/reference/ecs/describe-task-definition.html#description
for TASK in "migrate" "gunicorn" "default" "beat"
do
  echo "Updating $TASK task definition..."

  # in Terraform we name our tasks based on the ad hoc environment name
  # (also the Terraform workspace name) and the name of the task
  # (e.g. migrate, gunicorn, default, beat)
  TASK_FAMILY=$WORKSPACE-$TASK

  # save the task definition JSON to a variable
  TASK_DESCRIPTION=$(aws ecs describe-task-definition \
    --task-definition $TASK_FAMILY \
  )

  # save container definitions to a file for each task
  echo $TASK_DESCRIPTION | jq -r \
    .taskDefinition.containerDefinitions \
    > /tmp/$TASK_FAMILY.json

  # write new container definition JSON with updated image
  echo "Writing new $TASK_FAMILY container definitions JSON..."

  # replace old image URI with new image URI in a new container definitions JSON
  cat /tmp/$TASK_FAMILY.json \
    | jq \
      --arg image "$NEW_BACKEND_IMAGE_URI" \
      --arg containerName $TASK \
      '.[] | select(.containerName == $containerName).image |= $image' \
    > /tmp/$TASK_FAMILY-new.json

  # Get the existing configuration for the task definition (memory, cpu, etc.)
  # from the variable that we saved the task definition JSON to earlier
  echo "Getting existing configuration for $TASK_FAMILY..."

  MEMORY=$( echo $TASK_DESCRIPTION | jq -r \
    .taskDefinition.memory \
  )

  CPU=$( echo $TASK_DESCRIPTION | jq -r \
    .taskDefinition.cpu \
  )

  ECS_EXECUTION_ROLE_ARN=$( echo $TASK_DESCRIPTION | jq -r \
    .taskDefinition.executionRoleArn \
  )

  ECS_TASK_ROLE_ARN=$( echo $TASK_DESCRIPTION | jq -r \
    .taskDefinition.taskRoleArn \
  )

  # check the content of the new container definition JSON
  cat /tmp/$TASK_FAMILY-new.json

  # register new task definition using the new container definitions
  # and the values that we read off of the existing task definitions
  echo "Registering new $TASK_FAMILY task definition..."

  aws ecs register-task-definition \
    --family $TASK_FAMILY \
    --container-definitions file:///tmp/$TASK_FAMILY-new.json \
    --memory $MEMORY \
    --cpu $CPU \
    --network-mode awsvpc \
    --execution-role-arn $ECS_EXECUTION_ROLE_ARN \
    --task-role-arn $ECS_TASK_ROLE_ARN \
    --requires-compatibilities "FARGATE"

done

# Now we need to run migrate, collectstatic and any other commands that need to be run
# before doing a rolling update of the backend services

# We will use the new task definitions we just created to run these commands

# get the ARN of the most recent revision of the migrate task definition
TASK_DEFINITION=$( \
  aws ecs describe-task-definition \
    --task-definition $WORKSPACE-migrate \
    | jq -r \
    .taskDefinition.taskDefinitionArn \
)

# get private subnets as space separated string from shared resources VPC
SUBNETS=$( \
  aws ec2 describe-subnets \
    --filters "Name=tag:env,Values=$SHARED_RESOURCES_WORKSPACE" "Name=tag:Name,Values=*private*" \
    --query 'Subnets[*].SubnetId' \
    --output text \
)

# replace spaces with commas using tr
SUBNET_IDS=$(echo $SUBNETS | tr ' ' ',')

# https://github.com/aws/aws-cli/issues/5348
# get ecs_sg_id - just a single value
ECS_SG_ID=$( \
  aws ec2 describe-security-groups \
    --filters "Name=tag:Name,Values=$SHARED_RESOURCES_WORKSPACE-ecs-sg" \
    --query 'SecurityGroups[*].GroupId' \
    --output text \
)

echo "Running database migrations..."

# timestamp used for log retrieval (milliseconds after Jan 1, 1970 00:00:00 UTC)
START_TIME=$(date +%s000)

# run the migration task and capture the taskArn into a variable called TASK_ID
TASK_ID=$( \
  aws ecs run-task \
    --cluster $WORKSPACE-cluster \
    --task-definition $TASK_DEFINITION \
    --network-configuration "awsvpcConfiguration={subnets=[$SUBNET_IDS],securityGroups=[$ECS_SG_ID],assignPublicIp=ENABLED}" \
    | jq -r '.tasks[0].taskArn' \
  )

echo "Task ID is $TASK_ID"

# wait for the migrate task to exit
# https://docs.aws.amazon.com/cli/latest/reference/ecs/wait/tasks-stopped.html#description
# > It will poll every 6 seconds until a successful state has been reached.
# > This will exit with a return code of 255 after 100 failed checks.
aws ecs wait tasks-stopped \
  --tasks $TASK_ID \
  --cluster $WORKSPACE-cluster

# timestamp used for log retrieval (milliseconds after Jan 1, 1970 00:00:00 UTC)
END_TIME=$(date +%s000)

# print the CloudWatch log events to STDOUT
aws logs get-log-events \
  --log-group-name "/ecs/$WORKSPACE/migrate" \
  --log-stream-name "migrate/migrate/${TASK_ID##*/}" \
  --start-time $START_TIME \
  --end-time $END_TIME \
  | jq -r '.events[].message'

echo "Migrations complete. Starting rolling update for backend services..."

# update backend services
for TASK in "gunicorn" "default" "beat"
do

  # get taskDefinitionArn for each service to be used in update-service command
  # this will get the most recent revision of each task (the one that was just created)
  # https://docs.aws.amazon.com/cli/latest/reference/ecs/describe-task-definition.html#description
  TASK_DEFINITION=$( \
    aws ecs describe-task-definition \
      --task-definition $WORKSPACE-$TASK \
      | jq -r \
      .taskDefinition.taskDefinitionArn \
  )

  # update each service with new task definintion
  aws ecs update-service \
    --cluster $WORKSPACE-cluster \
    --service $WORKSPACE-$TASK \
    --task-definition $TASK_DEFINITION \
    --no-cli-pager

done

echo "Services updated. Waiting for services to become stable..."

# wait for all service to be stable (runningCount == desiredCount for each service)
aws ecs wait services-stable \
  --cluster $WORKSPACE-cluster \
  --services $WORKSPACE-gunicorn $WORKSPACE-default $WORKSPACE-beat

echo "Services are now stable. Backend services are now up to date with $BACKEND_IMAGE_TAG."

echo "Backend update is now complete!"
