variable "vpc_id" {
  description = "value of the VPC ID"
  type        = string
}

variable "private_subnets" {
  type = list(string)
}

variable "ecs_sg_id" {
  type = string
}

variable "azs" {
  description = "AZs in which to place the ElastiCache cluster"
  type        = list(string)
}

variable "env" {
  description = "Name of environment to deploy (used for naming)"
  type        = string
}
