terraform {
  required_version = ">=1.10.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.84.0"
    }
  }

  backend "s3" {}
}

provider "aws" {
  region = var.region
  default_tags {
    tags = {
      env                = terraform.workspace
      ad_hoc_env         = terraform.workspace
      ad_hoc_environment = "true"
    }
  }
}
