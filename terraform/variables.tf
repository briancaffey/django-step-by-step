##############################################################################
# VPC
##############################################################################

variable "cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "azs" {
  default     = ["us-east-1a", "us-east-1b", "us-east-1c"]
  description = "AZs to use for VPC"
  type        = list(string)
}

variable "private_subnets" {
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  description = "Private subnets to use for VPC"
  type        = list(string)
}

variable "public_subnets" {
  default     = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  description = "Public subnets to use for VPC"
  type        = list(string)
}


##############################################################################
# AWS
##############################################################################

variable "region" {
  default = "us-east-1"
}

variable "env" {
  default = "dev"
}

##############################################################################
# ALB
##############################################################################

variable "health_check_path" {
  description = "Health check path for the default target group"
  default     = "/api/health-check/"
  type        = string
}

##############################################################################
# Route 53
##############################################################################

variable "zone_name" {
  description = "Name of the hosted zone. Last character should be a period (e.g. example.com.)"
  type        = string
}

variable "record_name" {
  description = "Name of the record to create (e.g. app.example.com)"
  type        = string
}

##############################################################################
# ECS / ECR
##############################################################################

variable "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  default     = "ecs-dev-cluster"
}

variable "ecr_be_repo_url" {
  description = "URL of the ECR repository that contains the backend image. Take from output value of bootstrap"
}

variable "be_image_tag" {
  description = "Image tag to use in backend container definitions"
  default     = "latest"
}

variable "ecr_fe_repo_url" {
  description = "URL of the ECR repository that contains the frontend image. Take from output value of bootstrap"
}

variable "fe_image_tag" {
  description = "Image tag to use in frontend container definitions"
  default     = "latest"
}

variable "instance_type" {
  description = "ECS instance type"
  default     = "t3.small"
}

##############################################################################
# Backend Application - Gunicorn, Celery, Beat, etc.
##############################################################################

# Shared

variable "extra_env_vars" {
  description = "User-defined environment variables to pass to the backend service and task containers (api, worker, migrate, etc.)"
  type        = list(object({ name = string, value = string }))
}

variable "s3_bucket_name" {
  default     = "s3-bucket-dev"
  description = "S3 bucket name for backend assets (media and static assets)"
}

variable "django_settings_module" {
  description = "Django settings module"
  default     = "backend.settings.production"
}

# frontend

variable "frontend_command" {
  description = "Command to run in the frontend container"
  default     = ["nginx", "-g", "daemon off;"]
  type        = list(string)
}

variable "frontend_cpu" {
  default     = null
  description = "CPU to allocate to container for the frontend task"
  type        = number
}

variable "frontend_memory" {
  default     = 128
  description = "Amount (in MiB) of memory used by the frontend task"
  type        = number
}

# Celery beat

variable "celery_beat_command" {
  default     = ["celery", "--app=backend.celery_app:app", "beat", "--loglevel=INFO"]
  description = "Command used to start celery beat"
  type        = list(string)
}

variable "celery_beat_cpu" {
  default     = null
  description = "CPU to allocate to container"
  type        = number
}

variable "celery_beat_memory" {
  default     = 128
  description = "Amount (in MiB) of memory used by the task"
  type        = number
}

# default celery worker

variable "default_celery_worker_command" {
  description = "Command used to start celery worker"
  default     = ["celery", "--app=backend.celery_app:app", "worker", "--loglevel=INFO", "-Q", "default"]
  type        = list(string)
}

variable "default_celery_worker_cpu" {
  default     = null
  description = "CPU to allocate to container"
  type        = number
}

variable "default_celery_worker_memory" {
  default     = 128
  description = "Amount (in MiB) of memory used by the task"
  type        = number
}

# api

variable "api_command" {
  description = "Command used to start backend API container"
  default     = ["gunicorn", "-t", "1000", "-b", "0.0.0.0:8000", "--log-level", "info", "backend.wsgi"]
  type        = list(string)
}

variable "api_cpu" {
  default     = null
  description = "CPU to allocate to container"
  type        = number
}

variable "api_memory" {
  default     = 128
  description = "Amount (in MiB) of memory used by the task"
  type        = number
}

# migrate

variable "migrate_command" {
  description = "Command used to run database migrations"
  default     = ["python", "manage.py", "migrate"]
  type        = list(string)
}

variable "migrate_cpu" {
  default     = null
  description = "CPU to allocate to container"
  type        = number
}

variable "migrate_memory" {
  default     = 128
  description = "Amount (in MiB) of memory used by the task"
  type        = number
}

# collectstatic

variable "collectstatic_command" {
  description = "Command used to run the collectstatic command"
  default     = ["python", "manage.py", "collectstatic", "--noinput"]
  type        = list(string)
}

variable "collectstatic_cpu" {
  default     = null
  description = "CPU to allocate to container"
  type        = number
}

variable "collectstatic_memory" {
  default     = 128
  description = "Amount (in MiB) of memory used by the task"
  type        = number
}

##############################################################################
# RDS
##############################################################################

variable "rds_db_name" {
  description = "RDS database name"
  default     = "postgres"
}
variable "rds_username" {
  description = "RDS database username"
  default     = "postgres"
}
variable "rds_password" {
  description = "RDS database password"
  default     = "postgres"
}

variable "rds_instance_class" {
  description = "RDS instance type"
  default     = "db.t3.small"
}

##############################################################################
# ACM
##############################################################################

variable "acm_certificate_arn" {
  description = "ACM certificate ARN"
}

##############################################################################
# Frontend
##############################################################################

variable "frontend_url" {
  type        = string
  description = "Frontend URL"
}



##############################################################################
# S3
##############################################################################

variable "force_destroy" {
  description = "Force destroy of S3 bucket"
  default     = false
  type        = bool
}
