# shared resources
# see https://github.com/briancaffey/terraform-aws-ad-hoc-environments

# https://www.terraform.io/language/settings/backends/s3#s3-state-storage
data "terraform_remote_state" "this" {
  backend = "s3"
  config = {
    bucket               = var.s3_bucket
    key                  = "terraform.tfstate"
    region               = var.region
    workspace_key_prefix = "shared-resources"
  }
  workspace = var.shared_resources_workspace
}

# main

module "main" {
  source                         = "git::https://github.com/briancaffey/terraform-aws-django.git//modules/ad-hoc/app" # add ?ref=<branch> to use a branch
  vpc_id                         = data.terraform_remote_state.this.outputs.vpc_id
  assets_bucket_name             = data.terraform_remote_state.this.outputs.assets_bucket_name
  private_subnet_ids             = data.terraform_remote_state.this.outputs.private_subnet_ids
  app_sg_id                      = data.terraform_remote_state.this.outputs.app_sg_id
  alb_sg_id                      = data.terraform_remote_state.this.outputs.alb_sg_id
  listener_arn                   = data.terraform_remote_state.this.outputs.listener_arn
  alb_dns_name                   = data.terraform_remote_state.this.outputs.alb_dns_name
  rds_address                    = data.terraform_remote_state.this.outputs.rds_address
  domain_name                    = data.terraform_remote_state.this.outputs.domain_name
  base_stack_name                = data.terraform_remote_state.this.outputs.base_stack_name
  region                         = var.region
  redis_service_host             = data.terraform_remote_state.this.outputs.redis_service_host
  app_name                       = var.app_name
  rds_password_secret_name       = data.terraform_remote_state.this.outputs.rds_password_secret_name
  email_host_user                = var.email_host_user
  email_host_password            = var.email_host_password
  nvidia_api_key                 = var.nvidia_api_key
}
