terraform {
  required_version = ">=1.1.2"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.74.0"
    }

    cloudinit = {
      source  = "hashicorp/cloudinit"
      version = "2.2.0"
    }
  }

  # values read from `backend.config`
  backend "s3" {}
}

provider "aws" {
  region = var.region
}

provider "cloudinit" {
  # cloudinit config
}
