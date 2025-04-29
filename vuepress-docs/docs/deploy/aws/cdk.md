---
prev: /deploy/aws
next: /deploy/aws/terraform

head:
  - - meta
    - name: description
      content: How to deploy the Django application on AWS ECS Fargate using CDK
  # - - link
  #   - rel: canonical
  #     href: https://briancaffey.github.io/django-step-by-step/
---

# AWS CDK (Cloud Development Kit)

## Repo

[`cdk-django`](https://github.com/briancaffey/cdk-django)

## Package

The `cdk-django` package is available on [`npm`](https://www.npmjs.com/package/cdk-django)

## Notes

::: tip
For the most up-to-date information on `cdk-django`, please see the repository's [open issues](https://github.com/briancaffey/cdk-django/issues) and [Changelog](https://github.com/briancaffey/cdk-django/blob/main/CHANGELOG.md).
:::

- `cdk-django` is a CDK Component Library that is built using the `projen` framework
- The base and app stack have 2 stacks in the same CDK **app**
- The related Pulumi and Terraform libraries pass references via unique identifiers, CDK uses stack references
