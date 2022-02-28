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

variable "instance_type" {
  description = "ECS instance type"
  default     = "t2.micro"
}

##############################################################################
# Backend Application - Gunicorn, Celery, Beat, etc.
##############################################################################

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

variable "web_container_name" {
  default = "web"
}

variable "celery_beat_command" {
  default     = ["celery", "--app=backend.celery_app:app", "beat", "--loglevel=INFO"]
  description = "Command used to start celery beat"
  type        = list(string)
}

variable "default_celery_worker_command" {
  description = "Command used to start celery worker"
  default     = ["celery", "--app=backend.celery_app:app", "worker", "--loglevel=INFO", "-Q", "default"]
  type        = list(string)
}

variable "web_command" {
  description = "Command used to start backend web container"
  default     = ["gunicorn", "-t", "1000", "-b", "0.0.0.0:8000", "--log-level", "info", "backend.wsgi"]
  type        = list(string)
}

variable "migrate_command" {
  description = "Command used to run database migrations"
  default     = ["python", "manage.py", "migrate"]
  type        = list(string)
}

variable "collectstatic_command" {
  description = "Command used to run the collectstatic command"
  default     = ["python", "manage.py", "collectstatic", "--noinput"]
  type        = list(string)
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
  default     = "db.t2.micro"
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
