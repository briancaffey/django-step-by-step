terraform {
  required_version = ">=1.1.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.4.0"
    }
  }

  backend "s3" {}
}

provider "aws" {
  region = var.region
}

module "main" {
  source              = "briancaffey/django/aws"
  version             = "0.3.1"
  ecr_be_repo_url     = var.ecr_be_repo_url
  ecr_fe_repo_url     = var.ecr_fe_repo_url
  region              = var.region
  acm_certificate_arn = var.acm_certificate_arn
  instance_type       = var.instance_type
  frontend_url        = var.frontend_url
  zone_name           = var.zone_name
  record_name         = var.record_name
  force_destroy       = true
  extra_env_vars      = []
}
