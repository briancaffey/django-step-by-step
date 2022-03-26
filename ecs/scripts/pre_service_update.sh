#!/bin/bash

# $TASK_FAMILY
# $NEW_IMAGE
# $CLUSTER_NAME
# $LOG_GROUP_NAME
# $LOG_STREAM_PREFIX

# get container definitions JSON for task definition
aws ecs describe-task-definition \
  --task-definition $TASK_FAMILY \
  | jq -r \
  .taskDefinition.containerDefinitions \
  > /tmp/container-defs.json

# write new container definitions JSON
cat /tmp/container-defs.json \
  | jq \
  --arg IMAGE "$NEW_IMAGE" '.[0].image |= $IMAGE' \
  > /tmp/new-container-defs.json

# register new task definition
TASK_DEFINITION=$( \
  aws ecs register-task-definition \
    --family $TASK_FAMILY \
    --container-definitions file:///tmp/new-container-defs.json \
    | jq -r .taskDefinition.taskDefinitionArn \
)

# get task name (used in log_stream_name)
TASK_NAME=$( \
  aws ecs describe-task-definition \
    --task-definition $TASK_DEFINITION \
    | jq -r .taskDefinition.family \
)

echo $TASK_DEFINITION

START_TIME=$(date +%s000)

TASK_ID=$( \
  aws ecs run-task \
    --cluster $CLUSTER_NAME \
    --task-definition $TASK_DEFINITION \
    | jq -r '.tasks[0].taskArn' \
  )

aws ecs wait tasks-stopped \
  --tasks $TASK_ID \
  --cluster $CLUSTER_NAME

END_TIME=$(date +%s000)

aws logs get-log-events \
  --log-group-name $LOG_GROUP_NAME \
  --log-stream-name $LOG_STREAM_PREFIX/${TASK_NAME}/${TASK_ID##*/} \
  --start-time $START_TIME \
  --end-time $END_TIME \
  | jq -r '.events[].message'
