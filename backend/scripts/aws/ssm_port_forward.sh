: '
This script is used to port forward to the bastion host instance using SSM

The user is prompted for the name of the shared environment and then a port forwarding session is opened to a bastion host

You can then connect to postgres on you computer using localhost:5432 and via port forwarding it will connect to the RDS instance

The bastion host runs a service with socat that forwards all traffic on port 5432 to the associated RDS instance
'

read -p "Ad hoc shared environment name (dev): " AD_HOC_BASE_ENV

BASTION_INSTANCE_ID=$(aws ec2 describe-instances \
  --filters "Name=tag:env,Values=$AD_HOC_BASE_ENV" \
  --filters "Name=instance-state-name,Values=running" \
  --query "Reservations[*].Instances[*].InstanceId" \
  --output text \
  --region us-east-1
)

aws ssm start-session \
    --target $BASTION_INSTANCE_ID \
    --document-name AWS-StartPortForwardingSession \
    --parameters '{"portNumber":["5432"],"localPortNumber":["5432"]}' \
    --region us-east-1
