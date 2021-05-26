import * as k8s from '@pulumi/kubernetes';
import { env } from '../../constants';

interface createCeleryWorkerDeployment {
  namespace: string;
  appName?: string;
  image: string;
  command: string[];
}

export function createCeleryWorkerDeployment(
  name: string,
  args: createCeleryWorkerDeployment,
): k8s.apps.v1.Deployment {

  const appName = args.appName ?? "celery-worker";
  const appLabels = { app: appName };

  return new k8s.apps.v1.Deployment(
    name,
    {
      metadata: {
        namespace: args.namespace,
        name: args.appName,
      },
      spec: {
        selector: { matchLabels: appLabels },
        replicas: 1,
        template: {
          metadata: { labels: appLabels },
          spec: {
            containers: [
              {
                name: appName,
                image: args.image,
                command: args.command,
                env,
                imagePullPolicy: 'Never',
              },
            ]
          }
        }
      }
    }
  )
}