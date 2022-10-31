# Infrastructure as Code (IaC)

This folder defines infrastructure as code for the project using Terraform and CDK.

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
