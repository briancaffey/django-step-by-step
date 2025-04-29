<span><img src="https://img.shields.io/badge/code%20style-black-000000.svg" />
<a href="https://github.com/briancaffey/django-step-by-step/actions/workflows/backend_linting_and_unit_tests.yml"><img src="https://github.com/briancaffey/django-step-by-step/actions/workflows/backend_linting_and_unit_tests.yml/badge.svg" /></a>
</span>

Project Documentation: [https://briancaffey.github.io/django-step-by-step/](https://briancaffey.github.io/django-step-by-step/)

# Django Step by Step

This is a Django reference project showing how to develop and deploy Django applications using multiple tools and methodologies with best practices and concise examples.

## tl;dr

This project implements a simple blog app using vanilla Django function-based views and class-based views as well as DRF function and class-based views. There is also an implementation of the same application using GraphQL. The application involves a simple data model including users, posts with text and image and post likes.

This project is designed as a reference or example project that demonstrates common patterns, syntax and frequently-used code snippets. This project is open-source and newcomers are welcome to create issues and pull requests.

## Core application

This project implements a simple microblogging application called μblog. Here are some of the core features of μblog:

- Anyone (including unauthenticated users) can publish posts with text and an optional image
- Users can sign up for accounts that are activated by clicking a link in an email
- Signed-in users can like posts
- Signed-in users can edit and delete their own posts

μblog's core microblogging application is implemented in 5 different ways:

- Django function-based views
- Django class-based views
- Django REST Framework function-based views
- Django REST Framework class-based views
- GraphQL with Graphene

Each implementation is tested and documented with OpenAPI (Swagger UI). GraphiQL is exposed for the GraphQL API which includes documentation for queries and mutations.

Django templates and Bootstrap are used for the function and class based Django views. Vue.js is used to implement the like button using AJAX (with axios).

## Local development

This project is heavily focused on the process of setting up the development environment. This project has been tested and developed on:

- Ubuntu 24.04
- macOS Sequoia 15.4 (Apple Silicon)
- Windows 11 (WSL + Docker Desktop)

### Makefile

A Makefile is included in the root of the project to document. This file helps to document each step of the local development environment and deployment process.

### Python dependencies

Python dependencies are currently managed with Poetry.

### Developing with docker

Docker is a popular choice for developing and deploying applications, including Django. docker-compose can be used to run the application and dependent services in containers. See `docker-compose.yml` in the root directory for more details.

The docker-compose file contains the following services:

- postgres: Postgres service
- redis: Redis service
- pgadmin: Postgres admin service
- redis-commander: Redis admin service
- backend: main Django web application
- celery_worker: celery worker that processes the default queue
- celery_beat: celery process that queues tasks on a schedule
- mailhog: a local SMTP server for testing
- nuxt
- nginx (allows or the backend and frontend to both run on `localhost` during development)

## Continuous Integration with GitHub Actions

Continuous integration checks that all unit tests pass and that code is formatted correctly. Unit tests run the Python code in a simulated environment that contains the dependent services (postgres and redis). The following tools are used in CI:

- flake8
- black
- pytest tests

## Deployment

This project focuses on deployment to AWS using Elastic Container Service. This project has three related repositories for setting up AWS resources using Infrastructure as Code using some of the popular IaC tools: Terraform, Pulumi and CDK:

- [https://github.com/briancaffey/terraform-aws-django](https://github.com/briancaffey/terraform-aws-django)
- [https://github.com/briancaffey/cdk-django](https://github.com/briancaffey/cdk-django)
- [https://github.com/briancaffey/pulumi-aws-django](https://github.com/briancaffey/pulumi-aws-django)

These repositories each contain a reusable library that can be used to deploy nearly the same set of AWS resources for running this Django + Nuxt application. There also GitHub Actions workflows for creating, updating and deleting AWS resources using these libraries and related tools. See `.github/workflows/iac_{terraform,pulumi,cdk}_actions.yml`.

For application updates there is a workflow in `.github/workflows/cd_app_update.yml` that can update a new version of the Django and Nuxt applications. This workflow can work with any of the three IaC libraries mentioned above.

## This project is open source and MIT Licensed

See [LICENSE.md](/LICENSE.md)
