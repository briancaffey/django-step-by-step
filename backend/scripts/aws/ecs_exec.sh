: '
This script is used to gain access to a container running in an app environment

The user is asked for the name of the ad hoc environment and then the script starts a shell in the gunicorn container
'

read -p "App environment name: " APP_ENV_NAME

TASK_ARN=$(aws ecs list-tasks \
  --cluster $APP_ENV_NAME-cluster \
  --service-name  $APP_ENV_NAME-gunicorn | jq -r '.taskArns | .[0]' \
)

echo $TASK_ARN

aws ecs execute-command --cluster $APP_ENV_NAME-cluster \
    --task $TASK_ARN \
    --container gunicorn \
    --interactive \
    --command "/bin/bash"
