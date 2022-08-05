#!/bin/bash

# This script will be called to update an ad hoc environment frontend
# with a new image tag.

# It is called from the ad_hock_update_frontend.yml GitHub Actions file

# Required environment variables that need to be exported before running this script:

# WORKSPACE - ad hoc environment workspace
# SHARED_RESOURCES_WORKSPACE - shared resources workspace
# FRONTEND_IMAGE_TAG - frontend image tag to update services to (e.g. v1.2.3)
# AWS_ACCOUNT_ID - AWS account ID is used for the ECR repository URL

echo "Updating frontend service..."

# first define a variable containing the new image URI
NEW_FRONTEND_IMAGE_URI="$AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/frontend:$FRONTEND_IMAGE_TAG"


# register new task definitions
# https://docs.aws.amazon.com/cli/latest/reference/ecs/describe-task-definition.html#description
TASK_FAMILY=$WORKSPACE-web-ui

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
  --arg IMAGE "$NEW_FRONTEND_IMAGE_URI" '.[0].image |= $IMAGE' \
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

# update frontend services


TASK_DEFINITION=$( \
  aws ecs describe-task-definition \
    --task-definition $WORKSPACE-web-ui \
    | jq -r \
    .taskDefinition.taskDefinitionArn \
)

# update each service with new task definintion
aws ecs update-service \
  --cluster $WORKSPACE-cluster \
  --service $WORKSPACE-web-ui \
  --task-definition $TASK_DEFINITION \
  --no-cli-pager

echo "Services updated. Waiting for services to become stable..."

# wait for all service to be stable (runningCount == desiredCount for each service)
aws ecs wait services-stable \
  --cluster $WORKSPACE-cluster \
  --services $WORKSPACE-web-ui

echo "Service is now stable. Frontend service is now on $FRONTEND_IMAGE_TAG."

echo "Frontend update is now complete!"
