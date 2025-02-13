import * as fs from 'fs';
import { App, Stack, Tags } from 'aws-cdk-lib';
import { EcsBase, EcsApp } from 'cdk-django';

const companyName = process.env.COMPANY_NAME || 'abc';
const ecsBaseEnvName = process.env.BASE_NAME || 'dev';
const ecsAppEnvName = process.env.APP_NAME || 'alpha';

// TODO: define interfaces for these config and type check them
var ecsBaseEnvConfig = JSON.parse(fs.readFileSync(`src/ecs/configs/base/${ecsBaseEnvName}.json`, 'utf8'));
var ecsAppEnvConfig = JSON.parse(fs.readFileSync(`src/ecs/configs/app/${ecsAppEnvName}.json`, 'utf8'));


// look up the following values from environment variables
const certificateArn = process.env.CERTIFICATE_ARN || 'arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012';
const domainName = process.env.DOMAIN_NAME || 'example.com';

const app = new App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const baseStack = new Stack(app, ecsBaseEnvName, { stackName: ecsBaseEnvName, env });
baseStack.node.setContext('config', ecsBaseEnvConfig);

const appStack = new Stack(app, ecsAppEnvName, { stackName: ecsAppEnvName, env });
appStack.node.setContext('config', ecsAppEnvConfig);

const ecsBase = new EcsBase(baseStack, 'base', { certificateArn, domainName });

const ecsApp = new EcsApp(appStack, 'app', {
  baseStackName: ecsBaseEnvName,
  vpc: ecsBase.vpc,
  alb: ecsBase.alb,
  appSecurityGroup: ecsBase.appSecurityGroup,
  rdsInstance: ecsBase.databaseInstance,
  assetsBucket: ecsBase.assetsBucket,
  domainName: ecsBase.domainName,
  listener: ecsBase.listener,
  elastiCacheHost: ecsBase.elastiCacheHostname,
  companyName,
  rdsPasswordSecretName: ecsBase.rdsPasswordSecretName,
});

/**
 * Add tagging for this construct and all child constructs
 */
Tags.of(ecsBase).add('env', baseStack.stackName);
Tags.of(ecsApp).add('env', appStack.stackName);


app.synth();
