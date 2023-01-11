# Overview of options for deploying μblog

This project focuses on deploying to AWS using ECS Fargate. GitHub Actions are used for deployment pipelines.

There are three options for Infrastructure as Code:

- [`terraform-aws-django`](https://github.com/briancaffey/terraform-aws-django)
- [`cdk-django`](https://github.com/briancaffey/cdk-django)
- [`pulumi-aws-django`](https://github.com/briancaffey/pulumi-aws-django)

Each of these options has corresponding GitHub Actions workflow files.

[See this article for an in-depth overview of these different deployment options](https://briancaffey.github.io/2023/01/07/i-deployed-the-same-containerized-serverless-django-app-with-aws-cdk-terraform-and-pulumi)
