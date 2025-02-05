# Bootstrap Terraform Backend Resources

This directory sets up the following resources:

- S3 bucket
- DynamoDB table
- ECR repositories (backend and frontend)

These resources provide the Terraform S3 backend that will be used for the base/app stacks.

## TODO

- Add IAM roles to be used with GitHub Actions for infrastructure and application deployments
- The resources in `bootstrap` should be moved to a formal module in `terraform-aws-django` (called `foundation`, `prerequisites` or similar)
- I might add the provisioning of the ACM certificate to this new module