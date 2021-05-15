import * as k8s from '../imports/k8s';

export const env: k8s.EnvVar[] = [
  {
    name: 'DJANGO_SETTINGS_MODULE',
    value: 'backend.settings.development',
  }
]

const baseImage = 'localhost:32000/'
const TAG = process.env.TAG || 'latest';
export const backendImage = `${baseImage}api-backend:${TAG}`;