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

data "terraform_remote_state" "shared" {
  backend = "s3"
  config = {
    bucket               = var.s3_bucket
    key                  = "terraform.tfstate"
    region               = var.region
    workspace_key_prefix = "prod/base"
  }
  workspace = var.prod_base_env
}

module "main" {
  source = "git::https://github.com/briancaffey/terraform-aws-django.git//modules/prod/app"

  # remote state from local module
  vpc_id             = data.terraform_remote_state.shared.outputs.vpc_id
  rds_address        = data.terraform_remote_state.shared.outputs.rds_address
  redis_service_host = data.terraform_remote_state.shared.outputs.redis_service_host
  task_role_arn      = data.terraform_remote_state.shared.outputs.task_role_arn
  execution_role_arn = data.terraform_remote_state.shared.outputs.execution_role_arn
  listener_arn       = data.terraform_remote_state.shared.outputs.listener_arn
  alb_dns_name       = data.terraform_remote_state.shared.outputs.alb_dns_name
  ecs_sg_id          = data.terraform_remote_state.shared.outputs.ecs_sg_id
  alb_default_tg_arn = data.terraform_remote_state.shared.outputs.alb_default_tg_arn
  private_subnets    = data.terraform_remote_state.shared.outputs.private_subnets
  public_subnets     = data.terraform_remote_state.shared.outputs.public_subnets

  # variables
  ecr_be_repo_url = var.ecr_be_repo_url
  ecr_fe_repo_url = var.ecr_fe_repo_url
  be_image_tag    = var.be_image_tag
  domain_name     = var.domain_name
}
