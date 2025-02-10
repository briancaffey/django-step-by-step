import { AdHocBaseEnvComponent } from 'pulumi-aws-django';

const adHocBaseEnv = new AdHocBaseEnvComponent('myAdHocEnv', {
  certificateArn: process.env.ACM_CERTIFICATE_ARN || 'arn:aws:acm:us-east-1:111111111111:certificate/11111111-1111-1111-1111-111111111111',
  domainName: process.env.DOMAIN_NAME || 'example.com'
});

export const vpcId = adHocBaseEnv.vpc.vpcId;
export const assetsBucket = adHocBaseEnv.assetsBucket.id;
export const privateSubnetIds = adHocBaseEnv.vpc.privateSubnetIds;
export const appSgId = adHocBaseEnv.appSecurityGroup.id;
export const albSgId = adHocBaseEnv.albSecurityGroup.id;
export const listenerArn = adHocBaseEnv.listener.arn;
export const albDnsName = adHocBaseEnv.alb.dnsName;
export const serviceDiscoveryNamespaceId = adHocBaseEnv.serviceDiscoveryNamespace.id;
export const rdsAddress = adHocBaseEnv.databaseInstance.address;
export const domainName = adHocBaseEnv.domainName;
export const baseStackName = adHocBaseEnv.stackName;
export const bastionHostInstanceId = adHocBaseEnv.bastionHostInstanceId;
