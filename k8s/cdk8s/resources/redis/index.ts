import { Construct } from 'constructs';
import * as k8s from '../../imports/k8s';

export class RedisResources extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new k8s.KubeService(this, "RedisService", {
      metadata: {
        name: "redis",
      },
      spec: {
        selector: {
          app: "redis",
        },
        ports: [
          {
            protocol: "TCP",
            port: 6379,
            targetPort: 6379,
          }
        ]
      }
    });

    new k8s.KubeDeployment(this, "RedisDeployment", {
      metadata: {
        name: "redis",
        labels: {
          app: "redis",
        },
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: "redis",
          },
        },
        template: {
          metadata: {
            labels: {
              app: "redis",
            },
          },
          spec: {
            containers: [
              {
                name: "redis",
                image: "redis:alpine",
                resources: {
                  requests: {
                    cpu: "100m",
                    memory: "100Mi",
                  },
                },
                ports: [
                  {
                    containerPort: 6379,
                  }
                ],
              }
            ],
          }
        }
      }
    });
  }
}