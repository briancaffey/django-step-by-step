#!/bin/bash

# This script will be called to update an ad hoc environment backend
# It is called from the ad_hock_backend_update.yml GitHub Actions file

# Required env vars:

# WORKSPACE - ad hoc environment workspace
# SHARED_RESOURCES_WORKSPACE - shared resources workspace
# BACKEND_IMAGE_TAG - backend image tag to update the backend services to (e.g. v1.2.3)

echo "Updating backend services..."

# register new task definitions
# https://docs.aws.amazon.com/cli/latest/reference/ecs/describe-task-definition.html#description
for TASK in "migrate" "gunicorn" "default" "beat"
do
  echo "Updating $TASK task definition..."
  TASK_FAMILY=$WORKSPACE-$TASK
  aws ecs describe-task-definition \
    --task-definition $TASK_FAMILY \
    | jq -r \
    .taskDefinition.containerDefinitions \
    > /tmp/$TASK_FAMILY.json

  # write new container definition JSON with updated image
  echo "Writing new $TASK_FAMILY container definitions JSON..."
  cat /tmp/$TASK_FAMILY.json \
    | jq \
    --arg IMAGE "$BACKEND_IMAGE_TAG" '.[0].image |= $IMAGE' \
    > /tmp/$TASK_FAMILY-new.json


  # https://github.com/aws/aws-cli/issues/4453
  # Get the existing memory configuration for the task definition
  echo "Getting existing memory configuration for $TASK_FAMILY..."
  MEMORY=$( \
    aws ecs describe-task-definition \
      --task-definition $TASK_FAMILY \
      | jq -r \
      .taskDefinition.memory \
  )

  # check the content of the new container definition JSON
  cat /tmp/$TASK_FAMILY-new.json

  # register new task definition
  echo "Registering new $TASK_FAMILY task definition..."
  TASK_DEFINITION=$( \
    aws ecs register-task-definition \
      --family $TASK_FAMILY \
      --container-definitions file:///tmp/$TASK_FAMILY-new.json \
      --memory $MEMORY \
      | jq -r .taskDefinition.taskDefinitionArn \
  )
done

# TASK_FAMILY=$WORKSPACE-migrate
TASK_DEFINITION=$( \
  aws ecs describe-task-definition \
    --task-definition $WORKSPACE-migrate \
    | jq -r \
    .taskDefinition.taskDefinitionArn \
)

echo $TASK_DEFINITION

# get private subnets as space separated string
SUBNETS=$( \
  aws ec2 describe-subnets \
    --filters "Name=tag:env,Values=$SHARED_RESOURCES_WORKSPACE" "Name=tag:Name,Values=*private*" \
    --query 'Subnets[*].SubnetId' \
    --output text \
)

# replace spaces with commas
SUBNET_IDS=$(echo $SUBNETS | tr " " ",")

# get ecs_sg_id - just a single value
ECS_SG_ID=$( \
  aws ec2 describe-security-groups \
    --filters "Name=tag:env,Values=$SHARED_RESOURCES_WORKSPACE" \
    --query 'SecurityGroups[*].GroupId' \
    --output text \
)

echo "Running database migrations..."

START_TIME=$(date +%s000)

TASK_ID=$( \
  aws ecs run-task \
    --cluster $WORKSPACE-cluster \
    --task-definition $TASK_DEFINITION \
    --network-configuration '{"awsvpcConfiguration":{"subnets":['"$SUBNET_IDS"'],"securityGroups":['"$ECS_SG_ID"'],"assignPublicIp":"ENABLED"}}' \
    | jq -r '.tasks[0].taskArn' \
  )

aws ecs wait tasks-stopped \
  --tasks $TASK_ID \
  --cluster $WORKSPACE-cluster

END_TIME=$(date +%s000)

# print the CloudWatch log events
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

  # get task ARN for `update-service` command
  TASK_DEFINITION=$( \
    aws ecs describe-task-definition \
      --task-definition $WORKSPACE-migrate \
      | jq -r \
      .taskDefinition.taskDefinitionArn \
  )
  # update service
  aws ecs update-service --cluster $WORKSPACE-cluster \
    --service $WORKSPACE-$TASK \
    --task-definition $TASK_DEFINITION
done

echo "Services updated. Waiting for services to become stable..."

  # wait for service to be updated
  aws ecs wait services-stable \
    --cluster $WORKSPACE-cluster \
    --services $WORKSPACE-$TASK

echo "Services are now stable. Backend services are now up to date with $BACKEND_IMAGE_TAG."
