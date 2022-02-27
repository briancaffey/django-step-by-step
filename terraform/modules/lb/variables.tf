variable "certificate_arn" {
  type        = string
  description = "The ARN of the certificate to be used for the HTTPS listener."
}

variable "health_check_path" {
  default     = "/api/health-check/"
  description = "Health check path for the default target group"
  type        = string
}

variable "public_subnets" {
  description = "Subnets to be used for the public subnet group"
  type        = list(string)
}

variable "vpc_id" {
  description = "ID of the VPC to create the ALB in"
  type        = string
}

variable "env" {
  description = "Name of environment to deploy (used for naming)"
  type        = string
}
