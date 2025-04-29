---
next: /deploy/aws/terraform
prev: /guide/ci-cd/github-actions

head:
  - - meta
    - name: description
      content: Using different Infrastructure as Code tools for deploying Django projects
---

# Overview of options for deploying μblog

This project primarily focuses on deploying to AWS using ECS Fargate. GitHub Actions are used for deployment pipelines.

## Infrastructure as Code Libraries

There are three options for Infrastructure as Code:

- [`terraform-aws-django`](https://github.com/briancaffey/terraform-aws-django)
- [`pulumi-aws-django`](https://github.com/briancaffey/pulumi-aws-django)
- [`cdk-django`](https://github.com/briancaffey/cdk-django)

## Consuming IaC libraries

The `django-step-by-step` repo includes a directory called `iac` with the following structure:

```
iac
├── cdk
├── pulumi
└── terraform
```

Each of these directories includes code that uses the IaC libraries referenced above. These directories include the "live" configuration files (`{env}.json`, `{env}.tfvars`, `Pulumi.{env}.yaml`) that map to environments in AWS.

## Infrastructure pipeline workflow filename convention

Each of these options has corresponding GitHub Actions workflow files.

These workflow files can be found in the `.github/workflows` folder of `django-step-by-step` under the following names:

```yaml
iac_cdk_actions.yml
iac_pulumi_actions.yml
iac_terraform_actions.yml
```

These three GitHub Actions all work in the same way:

- they can be used for deploying either the `base` or `app` infrastructure stack
- they can accept a name for the `base` and `app` stack that must correspond to the "live" configuration files mentioned above
- they can be used to destroy resources for a stack by selecting a `destroy` option
- the plan/preview/diff is added to the summary of each workflow

These workflows can be easily copied or adapted for different needs. For example, if you would like to manually approve the deployment of infrastructure resources after viewing the plan/preview/diff, then you can using GitHub environments for the deploy steps.

::: warning
Understanding the difference between infrastructure and application CI/CD pipelines is very important! The following sections go into detail about the `app` infrastructure pipeline and the `App Update` pipeline and things to consider when using these pipelines.
:::

## `app` stack

When the `app` stack is deployed, it sets up the ECS cluster, ECS task definitions and ECS services for an `app` environment. Each task definition uses the `latest` tag for the container image (for the backend and frontend services) and uses a `desiredCount` of `0` for each service.

For each of the IaC libraries, the ECS service uses `ignore_changes` for the `task_definition` and `desired_count`, this means that deploying a change to the `app` stack (such as adding a new environment variable to the backend task definitions) will not change anything in the running application. Instead, it publishes a new task definition. This new task definition will be used as the basis for the new task definition created by the `[CD] App Update` workflow.

After you deploy the `app` stack, you need to run the `[CD] App Update` GitHub Action. This will use the most recent version of each task definition and updated the `image` tag to the version specified in the Action's inputs (e.g. `v1.2.3`). Also the desired count for each service will be set to `1` which will start each service. You may want to use different values for the `desiredCount` when deploying your own application.

## `[CD] App Update`

To make regular application updates, you can use the `[CD] App Update` GitHub Action. This Action will first run the `pre-backend-update` job. This job is set up to run migrations, collectstatic and anything else that must be done prior to updating the server code (`gunicorn`, `celery`, `celery-beat` services).

The `pre-backend-update` step will also attempt to create a database using the name of the `app` environment. For example, if you select the `app` name `alpha`, this step will attempt to create an `alpha-db` database if it does not already exist. This allows for using a shared RDS instance with multiple postgres databases for each `app` environment.

After creating the database, the `pre-backend-update` job runs database migrations using Django's `migrate` command.

The `[CD] App Update` Action then does a rolling update for each of the backend application services (`gunicorn`, `default` celery worker and celery `beat`).

These actions use the official AWS GitHub Action called `aws-actions/amazon-ecs-deploy-task-definition` for updating task definitions, updating services and running one-off tasks (like the `pre-backend-update`).

::: tip
For the most up-to-date information on these projects, please see their open-issues and recent CHANGELOG entries.
:::
