import * as cdk from '@aws-cdk/core';
import { DjangoEcs } from 'django-cdk';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new DjangoEcs(this, 'DjangoEcs', {
      imageDirectory: './backend',
      webCommand: [
        './scripts/start_prod.sh',
      ],
      useCeleryBeat: true,
      domainName: process.env.DOMAIN_NAME,
    });
  }
}
