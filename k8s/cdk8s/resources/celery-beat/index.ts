import { Construct } from 'constructs';
import * as k8s from '../../imports/k8s';
import { env, backendImage } from '../environment-variables';

export class CeleryBeat extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const selector = { app: 'api-http' };

    new k8s.KubeDeployment(this, 'CeleryBeatDeployment', {
      metadata: {
        name: 'celery-beat',
        labels: selector,
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: selector
        },
        template: {
          metadata: {
            labels: selector,
          },
          spec: {
            containers: [
              {
                name: 'celery-beat',
                image: backendImage,
                args: [
                  'bash', '-c', 'celery -A backend.celery_app:app beat -l INFO -s /tmp/celerybeat-schedule'
                ],
                env,
              }
            ]
          }
        }
      }
    })
  }
}