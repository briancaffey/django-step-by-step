import { EcsBaseEnvComponent } from 'pulumi-aws-django';

const ecsBaseEnv = new EcsBaseEnvComponent('myEcsEnv', {
  certificateArn: process.env.CERTIFICATE_ARN || 'arn:aws:acm:us-east-1:111111111111:certificate/11111111-1111-1111-1111-111111111111',
  domainName: process.env.DOMAIN_NAME || 'example.com'
});

export const vpcId = ecsBaseEnv.vpc.vpcId;
export const assetsBucket = ecsBaseEnv.assetsBucket.id;
export const privateSubnetIds = ecsBaseEnv.vpc.privateSubnetIds;
export const appSgId = ecsBaseEnv.appSecurityGroup.id;
export const albSgId = ecsBaseEnv.albSecurityGroup.id;
export const listenerArn = ecsBaseEnv.listener.arn;
export const albDnsName = ecsBaseEnv.alb.dnsName;
export const rdsAddress = ecsBaseEnv.databaseInstance.address;
export const domainName = ecsBaseEnv.domainName;
export const baseStackName = ecsBaseEnv.stackName;
export const rdsPasswordSecretName = ecsBaseEnv.rdsPasswordSecretName;
export const redisServiceHost = ecsBaseEnv.redisServiceHost;
