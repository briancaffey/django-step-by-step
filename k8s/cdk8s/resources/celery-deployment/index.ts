import { Construct } from 'constructs';
import * as k8s from '../../imports/k8s';
import { env, backendImage } from '../environment-variables';


export class CeleryDeafultWorkerDeployment extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const name = "celery-default-worker";
    const selector = { deployment: name }

    new k8s.KubeDeployment(this, "CeleryDefaultWorkerDeployment", {
      metadata: {
        labels: selector,
        name,
      },
      spec: {
        selector: {
          matchLabels: selector,
        },
        template: {
          metadata: {
            labels: selector,
          },
          spec: {
            containers: [{
              name,
              image: backendImage,
              args: [
                'bash', '-c', 'celery -A backend.celery_app:app worker -l INFO'
              ],
              env,
            }]
          }
        }
      }
    })
  }
}
