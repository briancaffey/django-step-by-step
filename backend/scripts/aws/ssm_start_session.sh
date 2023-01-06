: '
This script is used to start a bash shell on the bastion host instance using SSM
'

read -p "Base environment name (dev): " AD_HOC_BASE_ENV

BASTION_INSTANCE_ID=$(aws ec2 describe-instances \
  --filters "Name=tag:env,Values=$AD_HOC_BASE_ENV" \
  --filters "Name=instance-state-name,Values=running" \
  --query "Reservations[*].Instances[*].InstanceId" \
  --output text \
  --region us-east-1
)

aws ssm start-session \
    --target $BASTION_INSTANCE_ID
