---
next: /deploy/aws/cdk
prev: /guide/ci-cd/github-actions

head:
  - - meta
    - name: description
      content: Using Terraform for Infrastructure as Code for Django projects
  # - - link
  #   - rel: canonical
  #     href: https://briancaffey.github.io/
---

# Overview of options for deploying μblog

This project focuses on deploying to AWS using ECS Fargate. GitHub Actions are used for deployment pipelines.

## Infrastructure as Code Libraries

There are three options for Infrastructure as Code:

- [`terraform-aws-django`](https://github.com/briancaffey/terraform-aws-django)
- [`cdk-django`](https://github.com/briancaffey/cdk-django)
- [`pulumi-aws-django`](https://github.com/briancaffey/pulumi-aws-django)

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

These workflow files can be found in the `.github/workflows` folder of `django-step-by-step` using the following naming convention:

```
{ad_hoc,prod}_{base,app}_{create_update,destroy}_{cdk,terraform_pulumi}.yml
```

::: warning
Some workflow files may be missing
:::

::: warning
At some point these GitHub Actions and associated files in the `iac` directory may be moved to another GitHub repository
:::

::: warning
Some workflow files may be using different patterns. All workflows should be using the `actions/upload-artifact` and `actions/download-artifact` GitHub Actions
:::

::: tip
For the most up-to-date information on these projects, please see their open-issues and recent CHANGELOG entries.
:::

## Article

[See this article for an in-depth overview of these different deployment options](https://briancaffey.github.io/2023/01/07/i-deployed-the-same-containerized-serverless-django-app-with-aws-cdk-terraform-and-pulumi)
