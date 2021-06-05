import * as pulumi from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';

const config = new pulumi.Config()

export const isMinikube = config.requireBoolean('isMinikube');


export const env: k8s.types.input.core.v1.EnvVar[] = [
  {
    name: 'DJANGO_SETTINGS_MODULE',
    value: 'backend.settings.development',
  },
  {
    name: "POSTGRES_PASSWORD",
    value: "postgres",
  },
]