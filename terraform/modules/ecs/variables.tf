variable "env" {
  description = "Name of environment to deploy (used for naming)"
  type        = string
}

# VPC

variable "vpc_id" {
  type = string
}

variable "private_subnets" {
  type = list(string)
}

variable "alb_sg_id" {
  description = "value of the Application Load Balancer Security Group ID"
  type        = string
}

# ECS

variable "cluster_name" {
  description = "name of the cluster"
  type        = string
  default     = "dev"
}

# EC2

variable "instance_type" {
  default = "t2.micro"
}

variable "amis" {
  description = "Which AMI to spawn."
  default = {
    us-east-1 = "ami-0fe19057e9cb4efd8"
  }
}

variable "region" {
  default = "us-east-1"
}

variable "ssh_pubkey_file" {
  description = "Path to an SSH public key"
  default     = "~/.ssh/id_rsa.pub"
}

# CloudWatch

variable "log_retention_in_days" {
  default = 1
}

# ASG

variable "autoscale_min" {
  default = 1
}

variable "autoscale_max" {
  default = 2
}

variable "autoscale_desired" {
  default = 1
}
