import * as k8s from '@pulumi/kubernetes';

import {
  createBackendApiDeployment,
  createBackendApiService,
  createMigrateJob,
} from './resources/api';
import {
  createPostgresDeployment,
  createPostgresService,
  createPostgresPvc,
  createPostgresPv,
} from './resources/postgres';

import { createRedisDeployment, createRedisService } from './resources/redis';
import { createCeleryBeatDeployment, createCeleryWorkerDeployment } from './resources/celery';
import { isMinikube } from './resources/constants';

// application namespace
const namespace = process.env.NAMESPACE || "my-app";
const ns = new k8s.core.v1.Namespace(namespace, { metadata: { name: namespace } });

// backend api resources
const backendAppName = "backend";
const backendImage = process.env.BACKEND_IMAGE || 'nginx:latest';

const backendApiDeployment = createBackendApiDeployment(
  'backend-api-deployment', {
  namespace,
  appName: backendAppName,
  image: backendImage,
  command: ['python3', 'manage.py', 'runserver_plus']
}
);

const backendApiService = createBackendApiService(
  'backend-api-service', {
  namespace,
  appName: backendAppName,
}
);

// postgres resources
const postgresAppName = 'postgres-app';

const postgresDeployment = createPostgresDeployment(
  'postgres-deployment', {
  namespace,
  appName: postgresAppName,
}
);

const postgresService = createPostgresService(
  'postgres-service', {
  namespace,
  appName: postgresAppName,
}
);

const postgresPv = createPostgresPv(
  'postgres-pv', {
  namespace,
}
);

const postgresPvc = createPostgresPvc(
  'postgres-pvc', {
  namespace,
}
);

// migrate job 
const migrateJob = createMigrateJob(
  'migrate-job', {
  namespace,
  appName: 'postgres-migration',
  image: backendImage,
  command: ['python3', 'manage.py', 'migrate']
}
)


// redis resources
const redisAppName = 'redis';
const redisDeployment = createRedisDeployment(
  'redis-deployment', {
  namespace,
}
);

const redisService = createRedisService(
  'redis-service', {
  namespace,
}
);

// celery resources
// celery worker
const celeryWorker = createCeleryWorkerDeployment(
  'celery-worker-deployment', {
  namespace,
  // TODO: replace with versioned image
  image: backendImage,
  command: [
    'bash', '-c', 'celery -A backend.celery_app:app worker -l INFO'
  ],
}
);

// celery beat
const celeryBeat = createCeleryBeatDeployment(
  'celery-beat-deployment', {
  namespace,
  image: backendImage,
  command: [
    'bash', '-c', 'celery -A backend.celery_app:app beat -l INFO -s /tmp/celerybeat-schedule'
  ],
}
)


// print the public IP when finished
export const ip = isMinikube
  ? backendApiService.spec.clusterIP
  : backendApiService.status.loadBalancer.apply(
    (lb) => lb.ingress[0].ip || lb.ingress[0].hostname
  );
