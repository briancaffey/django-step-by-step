variable "app_name" {
  type = string
}

##############################################################################
# Terraform Remote State
##############################################################################

variable "s3_bucket" {
  type = string
}

variable "shared_resources_workspace" {
  type    = string
  default = "dev"
}

##############################################################################
# AWS
##############################################################################

variable "region" {
  default = "us-east-1"
}

##############################################################################
# Route 53
##############################################################################

variable "domain_name" {
  description = "Domain name to use for Route 53 records (e.g. example.com)"
  type        = string
}

##############################################################################
# ECR
##############################################################################

# variable "ecr_be_repo_url" {
#   description = "URL of the ECR repository that contains the backend image. Take from output value of bootstrap"
# }

variable "be_image_tag" {
  description = "Image tag to use in backend container definitions"
  default     = "latest"
}

# variable "ecr_fe_repo_url" {
#   description = "URL of the ECR repository that contains the frontend image. Take from output value of bootstrap"
# }

variable "fe_image_tag" {
  description = "Image tag to use in frontend container definitions"
  default     = "latest"
}

# ##############################################################################
# # Application Services - Gunicorn, Celery, Beat, frontend SPA, etc.
# ##############################################################################

# # TODO: add these to main.tf so that they can be overridden if needed
# # also fix cpu and memory values so that they are valid values for use with Fargate

# # Shared

# variable "extra_env_vars" {
#   description = "User-defined environment variables to pass to the backend service and task containers (api, worker, migrate, etc.)"
#   type        = list(object({ name = string, value = string }))
#   default     = []
# }

# variable "django_settings_module" {
#   description = "Django settings module"
#   default     = "backend.settings.production"
# }

# # frontend

# variable "frontend_command" {
#   description = "Command to run in the frontend container"
#   default     = ["nginx", "-g", "daemon off;"]
#   type        = list(string)
# }

# variable "frontend_cpu" {
#   default     = null
#   description = "CPU to allocate to container for the frontend task"
#   type        = number
# }

# variable "frontend_memory" {
#   default     = 128
#   description = "Amount (in MiB) of memory used by the frontend task"
#   type        = number
# }

# # Celery beat

# variable "celery_beat_command" {
#   default     = ["celery", "--app=backend.celery_app:app", "beat", "--loglevel=INFO"]
#   description = "Command used to start celery beat"
#   type        = list(string)
# }

# variable "celery_beat_cpu" {
#   default     = null
#   description = "CPU to allocate to container"
#   type        = number
# }

# variable "celery_beat_memory" {
#   default     = 128
#   description = "Amount (in MiB) of memory used by the task"
#   type        = number
# }

# # default celery worker

# variable "default_celery_worker_command" {
#   description = "Command used to start celery worker"
#   default     = ["celery", "--app=backend.celery_app:app", "worker", "--loglevel=INFO", "-Q", "default"]
#   type        = list(string)
# }

# variable "default_celery_worker_cpu" {
#   default     = null
#   description = "CPU to allocate to container"
#   type        = number
# }

# variable "default_celery_worker_memory" {
#   default     = 128
#   description = "Amount (in MiB) of memory used by the task"
#   type        = number
# }

# # api

# variable "api_command" {
#   description = "Command used to start backend API container"
#   default     = ["gunicorn", "-t", "1000", "-b", "0.0.0.0:8000", "--log-level", "info", "backend.wsgi"]
#   type        = list(string)
# }

# variable "api_cpu" {
#   default     = null
#   description = "CPU to allocate to container"
#   type        = number
# }

# variable "api_memory" {
#   default     = 128
#   description = "Amount (in MiB) of memory used by the task"
#   type        = number
# }

# # migrate

# variable "migrate_command" {
#   description = "Command used to run database migrations"
#   default     = ["python", "manage.py", "migrate"]
#   type        = list(string)
# }

# variable "migrate_cpu" {
#   default     = null
#   description = "CPU to allocate to container"
#   type        = number
# }

# variable "migrate_memory" {
#   default     = 128
#   description = "Amount (in MiB) of memory used by the task"
#   type        = number
# }

# # collectstatic

# variable "collectstatic_command" {
#   description = "Command used to run the collectstatic command"
#   default     = ["python", "manage.py", "collectstatic", "--noinput"]
#   type        = list(string)
# }

# variable "collectstatic_cpu" {
#   default     = null
#   description = "CPU to allocate to container"
#   type        = number
# }

# variable "collectstatic_memory" {
#   default     = 128
#   description = "Amount (in MiB) of memory used by the task"
#   type        = number
# }
