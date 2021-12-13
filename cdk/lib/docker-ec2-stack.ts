import * as cdk from '@aws-cdk/core';
import { DockerEc2 } from 'django-cdk';

export class DockerEc2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const construct = new DockerEc2(this, 'DockerEc2Sample', {
      imageDirectory: './backend',
      frontendImageDirectory: '.',
      frontendImageDockerfile: 'nginx/prod/Dockerfile',
      keyName: process.env.KEY_PAIR_NAME || 'my-key-pair',
      domainName: process.env.DOMAIN_NAME || 'app.example.com',
      zoneName: process.env.ZONE_NAME || 'example.com',
    });

    /**
     * Add tagging for this construct and all child constructs
     */
    cdk.Tags.of(construct).add('stack', 'DockerEc2Stack');
  }
}

