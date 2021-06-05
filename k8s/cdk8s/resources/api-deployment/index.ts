import { Construct } from 'constructs';
import * as k8s from '../../imports/k8s';
import { env, backendImage } from '../environment-variables';

/**
 * The deployment and service and migration job for the backend API
 */
export class BackendApi extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const selector = { app: 'api-http' }


    new k8s.KubeService(this, 'ApiService', {
      metadata: {
        labels: selector,
        name: 'api-http',
      },
      spec: {
        selector,
        ports: [
          {
            name: 'api-http',
            port: 8000,
            targetPort: 8000,
            nodePort: 32083,
          }
        ],
        type: 'NodePort',
      }
    });

    new k8s.KubeJob(this, 'ApiDeploymentMigrateJob', {
      metadata: {
        name: 'django-migrate',
      },
      spec: {
        template: {
          spec: {
            containers: [
              {
                name: 'migrate',
                image: backendImage,
                env,
                args: ['python3', 'manage.py', 'migrate']
              }
            ],
            restartPolicy: 'Never',
          }
        },
        backoffLimit: 5,
      }
    });

    new k8s.KubeDeployment(this, 'ApiDeployment', {
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
            containers: [{
              args: [
                'bash', '-c', 'python3 manage.py runserver_plus 0.0.0.0:8000'
              ],
              image: backendImage,
              name: 'api',
              env,
              imagePullPolicy: "",
              ports: [{
                name: 'http',
                containerPort: 8000,
              }],
            }],
            restartPolicy: 'Always'
          }
        }
      }
    })
  }
}