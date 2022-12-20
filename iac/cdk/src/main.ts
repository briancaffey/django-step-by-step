import { App, Stack, Tags } from 'aws-cdk-lib';
import { AdHocBase, AdHocApp } from 'cdk-django';

// look up the following values from environment variables
const certificateArn = process.env.ACM_CERTIFICATE_ARN || 'arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012';
const domainName = process.env.DOMAIN_NAME || 'example.com';

// the environments for the base stack and the app stack
// the ad hoc environment for the following would have a URL of
// alpha.dev.domain.com
const adHocBaseEnvName = process.env.AD_HOC_BASE_NAME || 'dev';
const adHocAppEnvName = process.env.AD_HOC_APP_NAME || 'alpha';

const app = new App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const adHocBaseStack = new Stack(app, 'AdHocBaseStack', { stackName: adHocBaseEnvName, env });
const adHocAppStack = new Stack(app, 'AdHocAppStack', { stackName: adHocAppEnvName, env });

const adHocBase = new AdHocBase(adHocBaseStack, 'AdHocBase', { certificateArn, domainName });

const adHocApp = new AdHocApp(adHocAppStack, 'AdHocApp', {
  baseStackName: adHocBaseEnvName,
  vpc: adHocBase.vpc,
  alb: adHocBase.alb,
  appSecurityGroup: adHocBase.appSecurityGroup,
  serviceDiscoveryNamespace: adHocBase.serviceDiscoveryNamespace,
  rdsInstance: adHocBase.databaseInstance,
  assetsBucket: adHocBase.assetsBucket,
  domainName: adHocBase.domainName,
  listener: adHocBase.listener,

  djangoSettingsModule: process.env.DJANGO_SETTINGS_MODULE || 'backend.settings.aws',
  backendVersion: process.env.BACKEND_VERSION || 'latest',
  frontendVersion: process.env.FRONTEND_VERSION || 'latest',
});

/**
 * Add tagging for this construct and all child constructs
 */
Tags.of(adHocBase).add('env', adHocBaseStack.stackName);

Tags.of(adHocApp).add('env', adHocAppStack.stackName);


app.synth();
