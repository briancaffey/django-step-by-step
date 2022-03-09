# Development environment Terraform Configuration

This configuration file defines a terraform configuration for a development environment.

## About the terraform configuration

It is:

- meant to be spun up for testing a feature and then spun down (destroyed) after testing
- not meant to be used for production
- Sensitive information that you don't want to commit to git in the `terraform.tfvars` file can be added as `TF_VAR_` variables
- able to be run both from a developer's laptop or in a CI/CD pipeline. See the GitHub Actions for more information folder for an example of how to deploy a development environment using a GitHub Action.

## How to run locally

To use this configuration locally, you need to:

- Setup resources for the S3 backend and ECR repositories for frontend and backend ECR repos. See the bootstrap folder to see how to provision these resources with Terraform.
- Pushed tagged images to the ECR repositories for frontend and backend (see `terraform/scripts` for scripts that can be used to do this)
- Create an Amazon Hosted Zone with a domain name (optionally purchased through Route 53)
- Request a wildcard AMC certificate (the ARN is passed as a module parameter)
- Export the S3 backend environment variables: `TF_BACKEND_BUCKET`, `TF_BACKEND_REGION` and `TF_BACKEND_KEY`
- Run the following terraform commands:

```bash
# move into the directory that contains the
cd terraform/live/dev

# terraform init
terraform init \
  -backend-config="bucket=${TF_BACKEND_BUCKET}" \
  -backend-config="key=${TF_BACKEND_KEY}" \
  -backend-config="region=${TF_BACKEND_REGION}"

# terraform plan
terraform plan

terraform apply
```

## TODO
- [ ] define variables for parameters for the `main` module (such as the `env`) and replace hard-coded module parameters with variables
- [ ] add a variable for the `region` value
- [ ] define outputs that can be used in CI/CD pipeline
- [ ] to support numerous multiple environments in the same AWS account, reference ID and subnets of a common VPC rather than creating a new VPC per environment
- [ ] finish GitHub action for deploying this terraform configuration
- [ ] add examples directory in the `aws-terraform-django` repository with an example configuration file like the one here
- [ ] add a `.gitignore` file or add a `main.tf.example` file avoid committing account-specific information


Documentation for the `main` module source: https://registry.terraform.io/modules/briancaffey/django/aws/latest?tab=dependencies
