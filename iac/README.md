# Infrastructure as Code (IaC)

This folder shows how to setup the django-step-by-step application on AWS using three of the popular Infrastructure as Code (IaC) tools:

- AWS CDK
- Terraform
- Pulumi

The IaC programs in this folder use three different IaC libraries:

- cdk-django
- terraform-aws-django
- pulumi-aws-django

These libraries define different "stacks" of infrastructure:

- base (VPC, databases, security groups, etc.)
- app (ECS cluster, ECS services, ECS tasks, etc.)

To deploy the application, the base infrastructure is first deployed, and then the app infrastructure is deployed. In each of the IaC tools, app infrastructure r layer references values from the base infrastructure layer.

## Deployment pipelines

The `.github` directory of each IaC library repo contains reusable GitHub workflows. These can be used

## AWS CDK

AWS Cloud Development Kit (CDK) is used to generate CloudFormation scripts that are used to provision infrastructure through stacks. A stack is a grouping of resources.

This project uses a CDK Construct library called [`django-cdk`](#) that is published online as a reusable construct. The repo for this reusable construct library can be found here: [https://github.com/briancaffey/cdk-django](https://github.com/briancaffey/cdk-django). `cdk-django` is developed using a tool called `projen`.

The `cdk-django` library is used in this project, and to use this project, we are also using `projen` to manage the code that makes use of `cdk-django`.

### bootstrap account

```
cdk bootstrap aws://123456789012/us-east-1
```

### Create `awscdk-app-ts`

```
cd iac/cdk
npx projen new awscdk-app-ts --no-git
```

Install `cdk-django`:

Instead of running the following:

```
yarn add cdk-django
```

We can add `cdk-django@0.0.0` to the `deps` array in `.projenrc.js` in our new `AwsCdkTypeScriptApp` project, follow by `npx projen` in the `iac/cdk` directory which will install the package locally in `node_modules`.

## Pulumi


Start with `container-aws-typescript`:

```
cd iac/pulumi
pulumi new container-aws-typescript
```

## Terraform

TODO: add documentation here
