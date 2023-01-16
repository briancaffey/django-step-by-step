---
next: /deploy/aws/pulumi
prev: /deploy/aws/cdk

head:
  - - meta
    - name: description
      content: Using Terraform for Infrastructure as Code for Django projects
  # - - link
  #   - rel: canonical
  #     href: https://briancaffey.github.io/
---

# Iac with Terraform

## Repo

[`terraform-aws-django`](https://github.com/briancaffey/terraform-aws-django)

## Terraform Registry

The modules are available on the [Terraform Registry](https://registry.terraform.io/modules/briancaffey/django/aws/latest)

## Notes

::: tip
For the most up-to-date information on `terraform-aws-django`, please see the repository's [open issues](https://github.com/briancaffey/terraform-aws-django/issues) and [Changelog](https://github.com/briancaffey/terraform-aws-django/blob/main/CHANGELOG.md).
:::

- Terraform is currently the most feature-complete
- GitHub Actions for prod are using the pattern that other workflows should be using eventually
- The project uses `release-please` for versioning and release management
- The project can be used either directly via GitHub or via the [Terraform Registry](https://registry.terraform.io/modules/briancaffey/django/aws/latest)
