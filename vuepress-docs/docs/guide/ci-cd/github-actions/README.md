# GitHub Actions Guide

GitHub Actions are used to run unit tests and to deploy the application using CDK.

There are two jobs defined for out GitHub actions:

- `lint-and-test-python`
- `deploy`

## `lint-and-test-python`

This job checks the code quality of the Django application and runs unit tests using a Postgres database.

If this job fails, the pipeline will be terminated and will not continue on to the `deploy` job

## `deploy`

The deploy job uses `ubuntu-latest`. More information on the tools that are included in this environment can be found here: [https://github.com/actions/virtual-environments/blob/main/images/linux/Ubuntu2004-README.md#tools](https://github.com/actions/virtual-environments/blob/main/images/linux/Ubuntu2004-README.md#tools).

The environment does include docker, so we will not need to install or configure docker separately. The `cdk deploy` command that this job runs uses docker to build our application's backend docker image and then pushes that image to Elastic Container Registry (ECR).
