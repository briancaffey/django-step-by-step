import * as k8s from '@pulumi/kubernetes';
import { env } from '../../constants';

interface createCeleryBeatDeployment {
  namespace: string;
  appName?: string;
  image: string;
  command: string[];
}

export function createCeleryBeatDeployment(
  name: string,
  args: createCeleryBeatDeployment,
): k8s.apps.v1.Deployment {

  const appName = args.appName ?? "celery-beat";
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