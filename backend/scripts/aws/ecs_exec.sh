: '
This script is used to gain access to a container running in an ad hoc environment

The user is asked for the name of the ad hoc environment and then the script starts a shell in the gunicorn container
'

read -p "Ad hoc environment name: " AD_HOC_ENV

TASK_ARN=$(aws ecs list-tasks \
  --cluster $AD_HOC_ENV-cluster \
  --service-name  $AD_HOC_ENV-gunicorn | jq -r '.taskArns | .[0]' \
)
aws ecs execute-command --cluster $AD_HOC_ENV-cluster \
    --task $TASK_ARN \
    --container gunicorn \
    --interactive \
    --command "/bin/bash"
