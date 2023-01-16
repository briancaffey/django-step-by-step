---
prev: /deploy/digital-ocean
---

# How to deploy μblog on AWS

This page will describe how to deploy μblog on AWS using an Infrastructure as Code (IAC) tool called AWS CloudDevelopment Kit (CDK).

[[toc]]

## About [`django-cdk`](https://github.com/briancaffey/django-cdk)

`django-cdk` is a library for that includes constructs for deploying Django applications on AWS, focusing on containerization and serverless. `django-cdk` code lives on GitHub, and the package can be used with CDK in both Python and JavaScript/TypeScript CDK applications. Here are links for `django-cdk`:

- [https://github.com/briancaffey/django-cdk](https://github.com/briancaffey/django-cdk) - GitHub
- [https://www.npmjs.com/package/django-cdk](https://www.npmjs.com/package/django-cdk) - NPM
- [https://pypi.org/project/django-cdk/](https://pypi.org/project/django-cdk/) - PyPI

## `django-cdk` constructs

- ad-hoc-base
- ad-hoc-app
- prod-base
- prod-app

## About CDK constructs

Here are some important points that will give some important context around CDK and IaC on AWS:

- CDK is an AWS tool that allows you to write Infrastructure as Code
- CDK generates CloudFormation (JSON/YAML that defines AWS resources at a low level)
- CDK contains different levels of constructs that can be used to generate CloudFormation:
    - L1 (Level 1) CDK constructs are a 1:1 mapping from CDK to CloudFormation resources. They are prefixed with `Cfn` (e.g. `s3.CfnBucket`)
    - L2 CDK constructs are abstractions that generate several related CloudFormation resources that help support a single AWS resource or a group of related resource. For example, the L2 CDK construct for creating a VPC generates CloudFormation for a VPC, a subnet, and a NAT Gateway, routing tables and other related resources.
    - L3 CDK constructs generate groups of resources. For example, the L3 CDK construct for creating a load-balanced web services generates CloudFormation for an ECS service, a load balancer and related target groups.

The resources in `django-cdk` can be thought of as `L4` constructs. A single construct will contain all of the resources needed to create an application that has a number of different resources.

## Features of the `DjangoVue`, `DjangoEcs` and `StaticSite` constructs

`DjangoVue` is the highest-level construct in the library. It combines two other constructs in the library: `DjangoEcs` and `StaticSite`.

### `DjangoVue` resources

`DjangoVue` deploys the following resources:

- VPC (Subnets, Security Groups, AZs, NAT Gateway)
- Application Load Balancer
- ECS cluster, services and tasks for the Django API server and celery workers
- Postgres databases
- Static site for a Single Page Application deployed with CloudFront and S3
- Route 53 DNS records
- Certificate Manager certificates
- IAM roles and policies
- Outputs that provide commands for allowing an AWS admin to access an interactive shell running in a serverless container
- Optional automatic commands (useful if you want to run Django migrations or collect static on each deploy)

### Configuring Django and Vue to use the same domain and subdomain

The `DjangoVue` construct deploys a CloudFront distribution that includes three different origins:

- Static Site Bucket (serves Vue SPA assets)
- Application Load Balancer DNS Name
- Django assets S3 Bucket (static and media files for the Django application)

This allows for Django and Vue to use the same domain and subdomain. Assuming that you have a Route 53 domain called `domain.com`, CloudFront will route requests as follows:

- `app.domain.com/{api,admin,graphql}/` requests will be routed to the load balancer
- `app.domain.com/{static,media}/` requests will be routed to the assets bucket
- all other requests to `app.domain.com` will be routed to the static site bucket (Vue SPA)

One important implication of this relates to authentication: we can set an `HttpOnly` cookie on the Vue client that comes from a request to the Django API. **This would not be possible if the Vue client is served on `app.domain.com` and the Django API is served on `api.domain.com`.**

### Automatic commands

The CDK allows you to define Custom Resources that can either:

- run an AWS JavaScript SDK command
- run a Lambda function that does something

The `DjangoEcs` construct optionally defines custom resources that can run ECS tasks for running Django management commands that you might want run on each deployment such as:

- `python manage.py migrate --no-input`
- `python manage.py collectstatic --no-input`

### ECS Exec

ECS Exec is a new feature of ECS that allows you to open a shell in a container running on ECS Fargate.

Here are some helpful links for more information about ECS Exec:

- [AWS Developer Guide](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html)
- [ecs-exec-cdk-demo repo from pahud](https://github.com/pahud/ecs-exec-cdk-demo)

## `django-cdk` documentation

Documentation for `django-cdk` is generated automatically from the source code. The most up-to-date documentation for using `django-cdk` constructs can be found here: [https://github.com/briancaffey/django-cdk/blob/main/API.md](https://github.com/briancaffey/django-cdk/blob/main/API.md)

To use one of the constructs you need to provide:

- A path to the root of your Django project
- The location of the `Dockerfile` used to build your application's image relative to your Django project's root directory
- The commands used to start the process that run your application:
  - web server process (required)
  - celery (optional)
  - celery beat (optional)
- Options for how to run the application and which additional services your application requires

If you are hosting your application outside of AWS, there is also a construct that can be used for provisioning a new S3 bucket along with an IAM user with the necessary permissions to access it. This can be used for hosting static files as well as media files.

### ECS

<img :src="$withBase('/diagrams/django-ecs.png')" alt="docker-compose">

The ECS construct uses the `ApplicationLoadBalancedFargateService` construct from `@aws-cdk/aws-ecs-patterns`. This is a powerful abstraction that handles a lot of the networking requirements for the construct.

## projen

This project uses [projen](https://github.com/projen/projen).

> projen synthesizes project configuration files such as package.json, tsconfig.json, .gitignore, GitHub Workflows, eslint, jest, etc from a well-typed definition written in JavaScript.

## Development

For development of this library, a sample Django application is included as a git submodule in `test/django-step-by-step`. This Django project is used when deploying the application, and can be replaced with your own project for testing purposes. See the `Makefile` in the `django-cdk` repository for some commonly used

## Current Development Efforts

This project is under active development. Here are some issues that need to be addressed:

- Media file uploads are currently broken, this needs to be fixed
- Go over this Kubernetes checklist: [https://www.weave.works/blog/production-ready-checklist-kubernetes](https://www.weave.works/blog/production-ready-checklist-kubernetes)
- Add snapshot tests and refactor the application
- Add unit tests
- Add autoscaling rules to `DjangoEcs` for horizontal scaling and do load-testing

## GitHub Discussions

If you have any questions about the `django-cdk` construct library, please start a Discussion on the GitHub repo: [https://github.com/briancaffey/django-cdk/discussions](https://github.com/briancaffey/django-cdk/discussions).

You can also open an issue: [https://github.com/briancaffey/django-cdk/issues/new](https://github.com/briancaffey/django-cdk/issues/new)
