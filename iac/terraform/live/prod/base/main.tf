terraform {
  required_version = ">=1.3.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.48.0"
    }
  }

  backend "s3" {}
}

provider "aws" {
  region = var.region
  default_tags {
    tags = {
      env = terraform.workspace
    }
  }
}

module "main" {
  source          = "git::https://github.com/briancaffey/terraform-aws-django.git//modules/prod/base"
  certificate_arn = var.certificate_arn
  domain_name     = var.domain_name
}
