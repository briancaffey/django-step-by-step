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

- `DjangoEcs`
- `DjangoEks` (almost complete)
- `StaticSite` (Vue, React, etc.)
- `DjangoVue` (combines the `Django ECS` and `Static Site` constructs, the easiest way to deploy all components of μblog)
- `DockerEc2` (complete)
- `S3BucketResources` S3 bucket and IAM user (useful if you are hosting your Django application outside of AWS, such as on DigitalOcean)

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
- The location of the `Dockerfile` used to build your application's image (for EKS and ECS) relative to your Django project's root directory
- The commands used to start the process that run your application:
  - web server process (required)
  - celery (optional)
  - celery beat (optional)
- Options for how to run the application and which additional services your application requires

If you are hosting your application outside of AWS, there is also a construct that can be used for provisioning a new S3 bucket along with an IAM user with the necessary permissions to access it. This can be used for hosting static files as well as media files.

## Using the constructs

This repository includes sample CDK applications that use the libraries.

### DjangoEks

Overview of the EKS construct:

<img :src="$withBase('/diagrams/django-cdk.png')" alt="django cdk ecs">

1 - Resource in this diagram are defined by a CDK construct library called `django-eks` which is written in TypeScript and published to PyPi and npmjs.org. The project is managed by projen.

2 - The project uses jsii to transpile Typescript to Python, and the project is published to both PyPI and npm.

3 - The library is imported in a CDK application that is written in either TypeScript or Python.

4 - The CDK application is synthesized into CloudFormation templates which are used to build a CloudFormation stack that will contain all of the resources defined in the contstruct.

5 - An ECR registry is created when running `cdk bootstrap`, and it is used to store docker images that the application builds and later uses.

6 - An S3 bucket is also created by the `cdk bootstrap` command. This bucket is used for storing assets needed by CDK.

7 - The VPC is a the skeleton of the application. The CDK construct used for creating the VPC in our application sets up several resources including subnets, NAT gateways, internet gateway, route tables, etc.

8 - The Route53 record points to the Application Load Balancer (ALB) that routes traffic to our application. The record is created indirectly by CDK; external-dns creates the A Record resource based on annotations on the ALB.

9 - The Internet Gateway attached to our VPC

10 - The Application Load Balancer that is created by the AWS Load Balancer Controller

11 - EKS, the container orchestration layer in our application. AWS manages the control plane

12 - OpenIDConnect Provider used for handling permissions between pods and other AWS resources

13 - This is a node in the default node group of the EKS cluster

14 - The app namespace is where our application's Kubernetes resources will be deployed

15 - The Ingress that Routes traffic to the service for the Django application

16 - The service for the Django application

17 - The deployment/pods for the Django application. These pods have a service account that will give it access to other AWS resources through IRSA

18 - The deployment/pods for the celery workers in the Django application

19 - The IAM role and service account that are attached to the pods in our application. The service account is annotated with the IAM role's ARN (IRSA).

20 - external-dns is installed in our cluster to a dedicated namespace called external-dns. It is responsible for creating the Route53 record that points to the ALB. In future version of AWS Load Balancer Controller, external-dns may not be necessary.

21 - AWS Load Balancer Controller is installed into the kube-system namespace. This controller is responsible for provisioning an AWS Load Balancer when an Ingress object is deployed to the EKS cluster.

22 - RDS Postgres Instance that is placed in an isolated subnet. The security group for the default node group has access to the security group where the RDS instance is placed in an isolated subnet.

23 - Secrets Manager is used to provide the database password. The pods that run the Django application have access to the database secret in Secrets Manager, and they request it via a library that wraps boto3 calls and also caches secrets to reduce calls to secrets manager.

24 - ElastiCache Redis instance handles application caching and serves as the message broker for celery.

25 - Since the application runs in private subnets, outbound traffic is sent through NAT Gateways (Network Adress Translation) in public subnets that can be routed back to the public internet.

26 - An S3 bucket that our application can use for storing media assets.

Here's an example from `src/integ.django-eks.ts`:

```ts
import * as cdk from "@aws-cdk/core";
import { DjangoEks } from "./index";

const env = {
  region: process.env.AWS_DEFAULT_REGION || "us-east-1",
  account: process.env.AWS_ACCOUNT_ID,
};

const app = new cdk.App();
const stack = new cdk.Stack(app, "DjangoEks", { env });

const construct = new DjangoEks(stack, "Cdk-Sample-Lib", {
  imageDirectory: "./test/django-step-by-step/backend",
  webCommand: ["./scripts/start_prod.sh"],
});

/**
 * Add tagging for this construct and all child constructs
 */
cdk.Tags.of(construct).add("stack", "MyStack");
```

This sample application (and others defined in the `integ.*.ts` files in this repo) can be easily deployed for testing purposes with targets defined in the `Makefile`. To deploy the above application, you can run:

```
npm run build
make deploy-eks
```

Destroy the application with:

```
make destroy-eks
```

This assumes that you have credentials configured in your AWS CLI with sufficient permissions and that you have [bootstrapped your AWS account](https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html). You will also need to have docker CLI configured in order for CDK to build images and push them to ECR.

### ECS

<img :src="$withBase('/diagrams/django-ecs.png')" alt="docker-compose">

The ECS construct uses the `ApplicationLoadBalancedFargateService` construct from `@aws-cdk/aws-ecs-patterns`. This is a powerful abstraction that handles a lot of the networking requirements for the construct.

## Key differences between ECS and EKS constructs

The ECS and EKS constructs aim to do the same thing: deploy containerized applications to AWS.

### Container orchestration

The ECS constructs uses Amazon's proprietary, closed-source container orchestration tool called ECS. The EKS construct uses an [open source distribution of Kubernetes](https://github.com/aws/eks-distro) called Amazon EKS Distro (EKS-D).

### Load Balancer

Another important difference from an infrastructure and Infrastructure as Code (IaC) perspective is the use of Application Load Balancers (ALBs).

> The load balancer distributes incoming application traffic across multiple targets, such as EC2 instances, in multiple Availability Zones.

The ECS and EKS constructs go about provisioning ALBs differently. In the ECS construct, the `ApplicationLoadBalancedFargateService` in the CDK code results in CloudFormation code that requests an application load balancer.

The EKS construct does not directly request an ALB. Instead, it installs the [AWS Load Balancer Controller](https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html), [an open source project](https://github.com/kubernetes-sigs/aws-load-balancer-controller), using a Helm chart. This controller satisfies Kubernetes Ingress resources by provisioning Application Load Balancers. The contruct defines a Kubernetes Ingress object which, when deployed to the EKS cluster, causes the AWS Load Balancer Controller to provision an ALB. You can read more about Kubernetes Controllers [here](https://kubernetes.io/docs/concepts/architecture/controller/#direct-control).

The Ingress object defined in the construct uses [annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) that the controller processes when provisioning the ALB. A list of all supported annotations can be found [here on the AWS Load Balancer Controller website](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.2/guide/ingress/annotations/#annotations)

### Compute

One other important difference between the two constructs is the type of compute used to run the container workloads. The ECS construct uses Fargate, a serverless computer offering from AWS. The EKS construct uses EC2 instances for the worker nodes of the EKS cluster. It is possible to use Fargate with EKS, but AWS currently recommends not using Fargate for sensitive workloads on EKS.

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
