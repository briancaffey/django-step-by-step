##############################################################################
# Terraform Remote State
##############################################################################

variable "s3_bucket" {
  type = string
}

variable "prod_base_env" {
  type = string
}

##############################################################################
# AWS
##############################################################################

variable "region" {
  default = "us-east-1"
}

variable "ecr_be_repo_url" {
  type = string
}

variable "ecr_fe_repo_url" {
  type = string
}

variable "be_image_tag" {
  type = string
}

variable "domain_name" {
  type = string
}

