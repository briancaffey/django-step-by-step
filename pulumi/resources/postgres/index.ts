import * as k8s from '@pulumi/kubernetes';

const selector = { app: 'postgres' };

interface createPostgresDeploymentArgs {
  namespace: string;
  appName: string;
};

export function createPostgresDeployment(
  name: string,
  args: createPostgresDeploymentArgs,
): k8s.apps.v1.Deployment {

  return new k8s.apps.v1.Deployment(
    name,
    {
      metadata: {
        namespace: args.namespace,
        name: args.appName,
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
                name: 'postgres-deployment',
                image: 'postgres:13-alpine',
                env: [
                  {
                    name: 'POSTGRES_PASSWORD',
                    value: 'postgres',
                  }
                ],
                ports: [
                  {
                    containerPort: 5432,
                  }
                ],
                volumeMounts: [
                  {
                    name: 'postgres-data',
                    mountPath: '/var/lib/postgresql/data',
                  }
                ]
              }
            ],
            volumes: [
              {
                name: 'postgres-data',
                persistentVolumeClaim: {
                  claimName: 'postgres-data-pvc',
                }
              }
            ]
          }
        }
      }
    }
  )
}


interface createPostgresServiceArgs {
  namespace: string;
  appName: string;
};

export function createPostgresService(
  name: string,
  args: createPostgresServiceArgs,
): k8s.core.v1.Service {
  return new k8s.core.v1.Service(
    name,
    {
      metadata: {
        namespace: args.namespace,
        name: args.appName,
      },
      spec: {
        selector,
        ports: [
          {
            protocol: 'TCP',
            port: 5432,
            targetPort: 5432,
          }
        ]
      }
    }
  )
};

interface createPostgresPvcArgs {
  namespace: string;
}
export function createPostgresPvc(
  name: string,
  args: createPostgresPvcArgs,
): k8s.core.v1.PersistentVolumeClaim {
  return new k8s.core.v1.PersistentVolumeClaim(
    name,
    {
      metadata: {
        namespace: args.namespace,
        labels: {
          type: 'local',
        },
        name: 'postgres-data-pvc',
      },
      spec: {
        accessModes: [
          'ReadWriteOnce',
        ],
        resources: {
          requests: {
            storage: '100Mi',
          },
        },
      }
    }
  )
};

interface createPostgresPvArgs {
  namespace: string;
}

export function createPostgresPv(
  name: string,
  args: createPostgresPvArgs,
): k8s.core.v1.PersistentVolume {
  return new k8s.core.v1.PersistentVolume(
    name,
    {
      metadata: {
        namespace: args.namespace,
        name: 'postgres-pvo',
        labels: {
          type: 'local',
        },
      },
      spec: {
        accessModes: [
          'ReadWriteOnce',
        ],
        storageClassName: 'manual',
        hostPath: {
          path: '/data/postgres-pv2',
        },
        capacity: {
          storage: '2Gi'
        }
      }
    }
  )
}