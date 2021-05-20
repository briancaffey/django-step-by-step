import { Construct } from 'constructs';
import * as k8s from '../../imports/k8s';


export class DatabaseResources extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const selector = { app: 'database' };

    new k8s.KubeService(this, 'PostgresService', {
      metadata: {
        name: "postgres",
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
    });

    new k8s.KubeDeployment(this, 'PostgresDeployment', {
      metadata: {
        name: 'postgres-deployment',
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
                name: 'database-deployment',
                image: 'postgres:13-alpine',
                env: [
                  {
                    name: "POSTGRES_PASSWORD",
                    value: "postgres"
                  }
                ],
                ports: [
                  {
                    containerPort: 5432
                  }
                ],
                volumeMounts: [
                  {
                    name: 'dbdata',
                    mountPath: '/var/lib/postgresql/data'
                  }
                ]
              }
            ],
            volumes: [
              {
                name: 'dbdata',
                persistentVolumeClaim: {
                  claimName: 'dbdata',
                }
              }
            ]
          }
        }
      }
    });

    new k8s.KubePersistentVolume(this, 'PostgresPV', {
      metadata: {
        name: "postgres-pv",
        labels: {
          type: "local"
        },
      },
      spec: {
        storageClassName: "manual",
        capacity: {
          storage: "2Gi",
        },
        accessModes: [
          "ReadWriteOnce"
        ],
        hostPath: {
          path: "/data/postgres-pv1"
        }
      }
    })

    new k8s.KubePersistentVolumeClaim(this, 'PostgresPVC', {
      metadata: {
        creationTimestamp: undefined,
        labels: {
          app: 'dbdata',
        },
        name: 'dbdata',
      },
      spec: {
        accessModes: [
          'ReadWriteOnce',
        ],
        resources: {
          requests: {
            storage: '100Mi',
          }
        }
      }
    })
  }
}
