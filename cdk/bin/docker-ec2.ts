#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DockerEc2Stack } from '../lib/docker-ec2-stack';

const env = {
  region: process.env.AWS_DEFAULT_REGION || 'us-east-1',
  account: process.env.AWS_ACCOUNT_ID,
};

const stackName = process.env.STACK_NAME || 'DockerEc2Stack';

const app = new cdk.App();
new DockerEc2Stack(app, stackName, {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },
  env,

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
