import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';
import * as k8s from './imports/k8s';

import { BackendApi } from './resources/api-deployment';
import { DatabaseResources } from './resources/database';
import { RedisResources } from './resources/redis';
import { CeleryDeafultWorkerDeployment } from './resources/celery-deployment';
import { CeleryBeat } from './resources/celery-beat';

const NAMESPACE = process.env.NAMESPACE || 'app';

export class AppChart extends Chart {
  constructor(scope: Construct, id: string) {
    super(scope, id, { namespace: NAMESPACE });

    new k8s.KubeNamespace(this, 'AppNamespace', {
      metadata: {
        name: NAMESPACE,
        labels: {
          name: NAMESPACE
        }
      }
    });

    new BackendApi(this, 'BackendApi');
    new DatabaseResources(this, 'DatabaseResources');
    new RedisResources(this, 'RedisResources');
    new CeleryDeafultWorkerDeployment(this, "CeleryDefaultWorkerDeployment");
    new CeleryBeat(this, "CeleryBeat");

  }
}

const app = new App();
new AppChart(app, 'cdk8s');
// synthesize the application to a single YAML file
app.synth();
