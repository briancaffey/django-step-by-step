variable "alb_default_tg_arn" {
  description = "The ARN of the default target group"
  type        = string
}

variable "app_count" {
  description = "Number of Docker containers to run"
  default     = 1
}

variable "ecs_cluster_id" {
  description = "ECS Cluster ID"
  type        = string
}

variable "ecs_service_iam_role_arn" {
  description = "ECS Service IAM Role ARN"
  type        = string
}

variable "env" {
  description = "Environment"
  type        = string
}

variable "command" {
  type        = list(string)
  description = "Command to run in Docker container"
}

variable "env_vars" {
  type        = list(object({ name = string, value = string }))
  description = "Environment variables to set in Docker container"
}

variable "image" {
  type        = string
  description = "Container image from ECS to run"
}

variable "api_log_group_name" {
  type        = string
  description = "Name of the CloudWatch Logs group"
}

variable "api_log_stream_name" {
  type        = string
  description = "Name of the CloudWatch Logs stream"
}

variable "log_retention_in_days" {
  default = 1
  type    = number
}

variable "region" {
  default     = "us-east-1"
  description = "AWS region"
  type        = string
}
