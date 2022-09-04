---
next: /topics/twelve-factor-app
---

# Project Introduction

This is a Django reference project showing how to develop and deploy Django applications using multiple tools and methodologies with best practices and consice examples.

## tl;dr

This project implements a simple blog app using vanilla Django function-based views and class-based views as well as DRF function and class-based views. There is also an implementation of the same application using GraphQL. The application involves a simple data model including users, posts with text and image and post likes. Local development using virtual environments and docker are both covered in detail, including guidance on how to run the application on different operating systems (Linux, Intel Mac, M1 Mac, Windows, WSL). There is 100% test coverage for the project and comprehensive e2e tests using Cypress. The project can be deployed to multiple production environments including AWS. Deployment to AWS environment on Elastic Container Service (ECS) is powered by CDK and [a CDK construct library that I wrote specifically for deploying containerized Django projects on AWS](https://github.com/briancaffey/django-cdk).

This project is originally designed as a reference or example project that I can use when I need to recall common patterns, syntax and frequently-used code snippets. I have tried to carefully document each part of the development process as a guide for someone who wants to learn how this project is built and deployed from the ground up. Please see [/STEP_BY_STEP.md](STEP_BY_STEP.md) for a complete explination of the project, step-by-step. The last part of the article goes over the 12 Factor App principles and how this project conforms to those principles.

This project is open-source and new-comers to Django and Python and welcome to create issues and pull requests.

## Core application

This project implements a simple microblogging application called μblog. Here are some of the core features of μblog:

- Anyone (incuding unathenticated users) can publish posts with text and an optional image
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

Django templates and and Bootstrap are used for the function and class based Django viesw. Vue.js is used to implement the like button using AJAX (with axios).

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

This project can be deployed to multiple live environments including:

- AWS ECS
- AWS EKS
- docker swarm cluster (planned)

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

### AWS EKS

AWS Elastic Kubernetes Service (EKS)

## This project is open source and MIT Licensed

See [LICENSE.md](/LICENSE.md)
