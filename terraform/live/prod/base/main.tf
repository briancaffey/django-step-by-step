terraform {
  required_version = ">=1.1.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.4.0"
    }
  }
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
  source          = "git@github.com:briancaffey/terraform-aws-django.git//modules/prod/base?ref=main"
  certificate_arn = var.certificate_arn
  key_name        = var.key_name
  region          = var.region
}
