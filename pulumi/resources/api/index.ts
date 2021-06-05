import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';
import { isMinikube, env } from '../constants';

const appName = "http-api";
const appLabels = { app: appName };

interface createBackendApiDeploymentArgs {
  namespace: string;
  appName: string;
  image: string;
  command?: string[];
};

export function createBackendApiDeployment(
  name: string,
  args: createBackendApiDeploymentArgs,
): k8s.apps.v1.Deployment {
  return new k8s.apps.v1.Deployment(
    name,
    {
      metadata: {
        namespace: args.namespace,
        name: appName,
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
              }
            ]
          }
        }
      }
    }
  )
};

interface createBackendApiServiceArgs {
  namespace: string;
  appName: string;
};

export function createBackendApiService(
  name: string,
  args: createBackendApiServiceArgs,
): k8s.core.v1.Service {
  return new k8s.core.v1.Service(
    name,
    {
      metadata: {
        namespace: args.namespace,
        name: appName,
      },
      spec: {
        type: isMinikube ? 'NodePort' : 'LoadBalancer',
        ports: [{ port: 80, targetPort: 80, nodePort: 32013, protocol: 'TCP' }],
        selector: appLabels,
      }
    }
  )
};

interface createMigrateJobArgs {
  namespace: string;
  appName?: string;
  image: string;
  command: string[];
}

export function createMigrateJob(
  name: string,
  args: createMigrateJobArgs,
): k8s.batch.v1.Job {
  return new k8s.batch.v1.Job(
    name,
    {
      metadata: {
        namespace: args.namespace,
        name: args.appName ?? appName,
      },
      spec: {
        template: {
          spec: {
            restartPolicy: 'Never',
            containers: [
              {
                name: args.appName ?? appName,
                image: args.image,
                command: args.command,
                env,
                imagePullPolicy: 'Never',
              }
            ]
          }
        }
      }
    }
  )
};