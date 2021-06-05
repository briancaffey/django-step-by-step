import * as k8s from '@pulumi/kubernetes';

const name = 'redis';
const selector = { app: name };

interface createRedisDeploymentArgs {
  namespace: string;
}

export function createRedisDeployment(
  name: string,
  args: createRedisDeploymentArgs,
): k8s.apps.v1.Deployment {
  return new k8s.apps.v1.Deployment(
    name,
    {
      metadata: {
        namespace: args.namespace,
        name,
        labels: selector,
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: selector,
        },
        template: {
          metadata: {
            labels: selector,
          },
          spec: {
            containers: [
              {
                name: 'redis-deployment',
                image: 'redis:alpine',
                ports: [
                  {
                    containerPort: 6379,
                  }
                ],
                resources: {
                  requests: {
                    cpu: '100m',
                    memory: '100Mi',
                  },
                }
              }
            ],
          }
        }
      }
    }
  )
};


interface createRedisServiceArgs {
  namespace: string;
};

export function createRedisService(
  name: string,
  args: createRedisServiceArgs,
): k8s.core.v1.Service {
  return new k8s.core.v1.Service(
    name,
    {
      metadata: {
        namespace: args.namespace,
        name,
      },
      spec: {
        selector,
        ports: [
          {
            protocol: 'TCP',
            port: 6379,
            targetPort: 6379,
          }
        ]
      }
    }
  )
};