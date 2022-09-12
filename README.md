<span><img src="https://img.shields.io/badge/code%20style-black-000000.svg" />
<a href="https://github.com/briancaffey/django-step-by-step/actions/workflows/backend_linting_and_unit_tests.yml"><img src="https://github.com/briancaffey/django-step-by-step/actions/workflows/backend_linting_and_unit_tests.yml/badge.svg" /></a>
</span>

Project Documentation: [https://briancaffey.github.io/django-step-by-step/](https://briancaffey.github.io/django-step-by-step/)

# Django Step by Step

This is a Django reference project showing how to develop and deploy Django applications using multiple tools and methodologies with best practices and concise examples.

## tl;dr

This project implements a simple blog app using vanilla Django function-based views and class-based views as well as DRF function and class-based views. There is also an implementation of the same application using GraphQL. The application involves a simple data model including users, posts with text and image and post likes. Local development using virtual environments and docker are both covered in detail, including guidance on how to run the application on different operating systems (Linux, Intel Mac, M1 Mac, Windows, WSL). There is 100% test coverage for the project and comprehensive e2e tests using Cypress.

Deployment to AWS environment on Elastic Container Service (ECS) is shown with both:

- CDK and [a CDK construct library that I wrote specifically for deploying containerized Django projects on AWS](https://github.com/briancaffey/django-cdk)
- Terraform using [`terraform-aws-django`](https://github.com/briancaffey/terraform-aws-django)

This project is originally designed as a reference or example project that I can use when I need to recall common patterns, syntax and frequently-used code snippets. I have tried to carefully document each part of the development process as a guide for someone who wants to learn how this project is built and deployed from the ground up. Please visit the project documentation site ([briancaffey.github.io/django-step-by-step/](https://briancaffey.github.io/django-step-by-step/)) for a complete explanation of the project, step-by-step.

This project is open-source and new-comers to Django and Python and welcome to create issues and pull requests.

## Core application

This project implements a simple microblogging application called μblog. Here are some of the core features of μblog:

- Anyone (including unauthenticated users) can publish posts with text and an optional image
- Users can sign up for accounts that are activated by clicking a link in an email
- Signed-in users can like posts
- Signed-in users can edit and delete their own posts

## Implementation

μblog's core microblogging application is implemented in 5 different ways:

- Django function-based views
- Django class-based views
- Django REST Framework function-based views
- Django REST Framework class-based views
- GraphQL with Graphene

Each of the implementations are tested and documented with OpenAPI (Swagger UI). GraphiQL is exposed for the GraphQL API which includes documentation for queries and mutations.

Django templates and and Bootstrap are used for the function and class based Django views. Vue.js is used to implement the like button using AJAX (with axios).

## Local development

This project is heavily focused on the process of setting up the development environment. This project has been tested and developed on:

- Ubuntu 20.04
- macOS 11.4 (Apple Silicon)
- Windows 10 (WSL + Docker Desktop)

Windows 10 PowerShell development environment is still WIP. Here are some important features of the local development environment:

### Makefile

A Makefile is included in the root of the project to document. This file helps to document each step of the local development environment and deployment process.

### Python dependencies

This project's Python dependencies are managed with poetry. Poetry dependencies and dev-dependencies are specified in `pyproject.toml`. These dependencies are exported to two files:

- `requirements.txt`: This contains only the dependencies that are required by the project for running in production
- `requirements_dev.txt`: This contains all the dependencies that are required for running in production and for local development

### Developing with virtual environments

The application can be developed with a virtual environment locally. This requires starting postgres and redis services locally. Alternatively, postgres, redis and other supporting services can be started with a docker-compose file that exposes the services on `localhost`.

### Developing with docker

Docker is a popular choice for developing and deploying applications, including Django. docker-compose can be used to run the application and dependent services in containers. See `docker-compose.yml` in the root directory for more details.

The docker-compose file contains the following services:

- postgres: Postgres service
- redis: Redis service
- pgadmin: Postgres admin service
- redis-commander: Redis admin service
- backend: main Django web application
- celery_default: celery worker that processes the default queue
- beat: celery process that queues tasks on a schedule
- mailhog: a local SMTP server for testing

The application can also run locally inside a local Kubernetes cluster. This is made possible with minikube. cdk8s and pulumi are both used to show how kubernetes manifest files can be generated dynamically from code (TypeScript) and deployed to a cluster.

### e2e testing with Cypress

Cypress is used for e2e testing which can run locally against the docker-compose development environment. To test user registration and email verification in e2e tests, MailHog and the MailHog API are used to retrieve the email confirmation link from the email sent by the Django application.

## Continuous Intergration

Multiple tools are used for running unit tests and code quality checks on each commit. These include:

- GitHub Actions
- GitLab CI
- Bitbucket Pipelines

Continuous integration checks that all unit tests pass and that code is formatted correctly. Unit tests run the Python code in a simulated environment that contains the dependent services (postgres and redis). The following tools are used in CI:

- flake8
- black
- pytest

## Deployment

This project focuses on deployment to AWS using Elastic Container Service.

### AWS ECS

ECS is my preferred way of running containerized web applications on AWS. To help document best practices for deploying Django applications on ECS, I wrote a reusable CDK construct library that handles infrastructure provisioning for typical deployment scenarios. This project can be found [here](https://github.com/briancaffey/django-cdk).

The Django ECS construct included in the library creates the following AWS resources:

- VPC (public, private and isolated subnets, NAT Gateways, routing tables, Internet Gateway, etc)
- S3 bucket for storing static files and media files
- ECS Cluster (a grouping of ECS resources)
- ECS tasks and services for various components of the application (web, celery workers, management commands and tasks)
- A docker image built from our Django application code and specified Dockerfile
- Application Load Balancer
- TLS certificate that can attached to the Application Load Balancer terminating SSL/TLS
- A Route53 DNS record that points to the Application Load Balancer public DNS name
- AWS RDS Postgres database instance that servers as the database for the Django application
- A single-node AWS ElastiCache Redis cluster that provides caching and messaging brokering for celery workers
- Secrurity groups that allow for the stateless application layer to communicate with the Postgres database and Redis cluster
- Automated database migrations for the Django application using ECS tasks

The Django ECS construct takes a few inputs, including:

- The path to the Django application code
- The path to the Dockerfile that defines the main image used for the Django application
- The domain name in Route53 that will be used to generate DNS records in your account
- Optionally provide the ARN of an ACM certificate to be attached to the Application Load Balancer
- A list of strings to be used as the command for the web service
- A list of strings to be used as the command for the celery workers
- A list of strings to be used as the command for the celery beat process


This project can deploy ECS from the command line (using `make cdk-deploy`) or from a CI/CD pipeline. GitHub Actions and GitLab CI both include pipeline stages that deploy the application to AWS ECS.

Additional [ECS Exec](https://aws.amazon.com/blogs/containers/new-using-amazon-ecs-exec-access-your-containers-fargate-ec2/) is used to run management commands and open shells inside of the containers running on Fargate.

## This project is open source and MIT Licensed

See [LICENSE.md](/LICENSE.md)

## 12 Factor App

This project tries to follow the [12 Factor App](https://12factor.net/) principles. Here are the 12 factors of the 12 Factor app with a brief description of how they are achived in this project across multiple deployment environments.

### I: Codebase

The code can be found in multiple public repositories:

> One codebase tracked in revision control, many deploys

- **GitHub** (please open any issues, pull requests or discussions here): [https://github.com/briancaffey/django-step-by-step](https://github.com/briancaffey/django-step-by-step)

### II: Dependencies

There are a few different ways in which this project manages dependencies:

- `poetry` manages Python dependencies
- `npm` manages TypeScript/JavaScript dependencies for the construct library application
- The `Dockerfile` defines dependencies needed for the container, including the version of Python to use
- The `django-cdk` library defines specific version of AWS services to use, such as the version of postgres and Redis that are used
- `terraform-aws-django` also defines specific versions, such as the database engine version to use for Postgres

### III: Config

There is a good amount of environment variables used for configuration both locally and in the different production environments.

Locally, the application uses default values that allow development in a virtual environment to work without the need for configuring any environment variables as a separate step.

For example, Postgres is configured with the following default values in the Django application:

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": os.environ.get("POSTGRES_NAME", "postgres"),
        "USER": os.environ.get("POSTGRES_USERNAME", "postgres"),
        "PASSWORD": os.environ.get("POSTGRES_PASSWORD", "postgres"),
        "HOST": os.environ.get("POSTGRES_SERVICE_HOST", "localhost"),
        "PORT": os.environ.get("POSTGRES_SERVICE_PORT", 5432),
    }
}
```

The `django-cdk` application uses environment variables to determine which options to use for deployment. For example, the `HostedZoneName` is read in from the environment and use to determin which DNS records and ACM records to create. CloudFormation Stacks help to isolate environments, and no infrstructure is shared between environments.

> A litmus test for whether an app has all config correctly factored out of the code is whether the codebase could be made open source at any moment, without compromising any credentials.

This is another important point from the 12 Factor App principles that is true for this project.

One interesting part about config is the Postgres password for the ECS environment. The ECS environment uses an AWS Secrets Manager `Secret` to store the database password information, including the password, in a JSON string.

The name of this `Secret` is passed as an environment to the Django application, and the Django application uses another library to retrieve and cache the database password for later use. Again, the value of the secret is not passed to Django as an environment variable, but the name of the `Secret` (from AWS Secrets Manager) is the value passed. This way we don't even have to worry about what the password is. It is not stored in the code base and it is not even stored anywhere in config (until is created in AWS Secrets Manager).

### IV: Backing Services

In AWS, it is easy to start relying on AWS services such as RDS, ElastiCache, S3 and other services.

### V: Build, release, run

This step in the 12 Factor App is where CDK really shines. The `cdk deploy` command builds, releases and runs the application in one command. First, it is important to note that CDK uses something called `DockerImageAsset`, which allows us to point to the directory and Dockerfile of an application that we want to build and push to a docker registry. To use this feature, we must first run `cdk bootstrap` once in our AWS account. This will create the ECR registry that any `DockerImageAsset` will be pushed to.

When `cdk deploy` runs, it first builds and pushes the docker image to the ECR registry created by the `cdk bootstrap` command. `cdk deploy` then proceeds to create or update the AWS resources defined in the construct. Another advantage of CDK is automatic rollbacks.

### VI: Processes

> Execute the app as one or more stateless processes

In each environment, both local and non-local, the application's processes are clearly defined.

The CDK construct is passed a list of strings that define the processes that are run in the container for the wep services as well as the celery worker and celery beat proceses.

### VII: Port binding

This is done in ECS.

### VIII: Concurrency

> The array of process types and number of processes of each type is known as the process formation.

The ECS construct has a simple process formation: web service that scales up and down between a minimum and maximum number of instances. Celery workers that scale between a minimum and maximum number of instances, and a single celery beat process.

### IX: Disposability

Using CDK is a great way to put application disposability into practice. ECS services make sure that some number of ECS Tasks are running at a given point in time. If we go into the AWS console and delete a task, it will be started again almost instantly.

### X: Dev/prod parity

This project makes dev/prod partiy somewhat trivial. Using Infrastrucutre as Code, we can be condifent that two environments will only vary by the values that are passed in through through environment variables. If the only difference between two application stacks is the subdomain, then we can expect that everything else about the two applications is similar and that none of the other resources between the two enviroments will be shared.

### XI: Logs

CloudWatch is a great tool for monitoring logs and getting observability with minimal effort.

### XII: Admin processes

> Run admin/management tasks as one-off processes

Developers will often wish to do one-off administrative or maintenance tasks for the app, such as:

- Running database migrations
- Running a console
- Running one-time scripts committed into the app’s repo

With ECS and CDK, management commands can be run easily either through automation or using a tool called ECS Exec.

To run automated tasks, `managementCommandProps` can be passed a value of `true` (`false` by default). This will run the task each time the application is deployed with `cdk deploy`. This uses the an AWS Custom Resource that is defined in the construct. The CR's `onCreate` and `unUpdate` are set to an `AwsSdkCall` that runs `ecs:RunTask` with the appropiate parameters.

If you do not want to run database migrations automatically as a Custom Resource in CDK, you can use the AWS CLI to run the command from your CI tool, or you can use ECS Exec.

ECS Exec would also be a good choice if you want to run a one-time script or open a console in the container.
