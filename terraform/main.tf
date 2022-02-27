###############################################################################
# VPC
###############################################################################

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = ""
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway     = true
  single_nat_gateway     = true
  one_nat_gateway_per_az = false
}

###############################################################################
# ALB - Module for Application Load Balancer and releted resources
###############################################################################

module "lb" {
  source            = "./modules/lb"
  vpc_id            = module.vpc.vpc_id
  certificate_arn   = var.acm_certificate_arn
  health_check_path = var.health_check_path
  public_subnets    = module.vpc.public_subnets
  env               = var.env
}

###############################################################################
# ECS - ECS Cluster, EC2 Instances, ASG, Launch Configurations
###############################################################################

module "ecs" {
  source            = "./modules/ecs"
  vpc_id            = module.vpc.vpc_id
  private_subnets   = module.vpc.private_subnets
  instance_type     = var.instance_type
  alb_sg_id         = module.lb.alb_sg_id
  cluster_name      = "${var.env}-cluster"
  env               = var.env
  region            = var.region
  autoscale_desired = 1
  autoscale_min     = 1
  autoscale_max     = 1
}

###############################################################################
# S3 - TODO add S3 bucket resource for app assets
###############################################################################


###############################################################################
# RDS
###############################################################################

module "rds" {
  source             = "./modules/rds"
  vpc_id             = module.vpc.vpc_id
  private_subnets    = module.vpc.private_subnets
  ecs_sg_id          = module.ecs.ecs_sg_id
  rds_password       = var.rds_password
  rds_username       = var.rds_username
  rds_db_name        = var.rds_db_name
  rds_instance_class = var.rds_instance_class
}

###############################################################################
# ElastiCache
###############################################################################

module "elasticache" {
  source          = "./modules/elasticache"
  private_subnets = module.vpc.private_subnets
  vpc_id          = module.vpc.vpc_id
  ecs_sg_id       = module.ecs.ecs_sg_id
  azs             = module.vpc.azs
  env             = var.env
}

###############################################################################
# Route 53
###############################################################################

module "route53" {
  source       = "./modules/route53"
  zone_name    = var.zone_name
  record_name  = var.record_name
  alb_dns_name = module.lb.dns_name
}

###############################################################################
# Common variables for ECS Services and Tasks
###############################################################################

locals {
  env_vars = [
    {
      name  = "REDIS_SERVICE_HOST"
      value = module.elasticache.redis_service_host
    },
    {
      name  = "POSTGRES_SERVICE_HOST"
      value = module.rds.postgres_service_host
    },
    {
      name  = "DJANGO_SETTINGS_MODULE"
      value = var.django_settings_module
    },
    {
      name = "S3_BUCKET_NAME"
      #TODO change this
      value = "my-bucket"
    },
    {
      name  = "FRONTEND_URL"
      value = var.frontend_url
    }
    # "S3_BUCKET" = module.s3.bucket TODO: Add this
  ]
  be_image = "${var.ecr_be_repo_url}:${var.be_image_tag}"
}

###############################################################################
# Gunicorn ECS Service
###############################################################################

module "api" {
  source                   = "./modules/api"
  ecs_cluster_id           = module.ecs.cluster_id
  task_role_arn            = module.ecs.task_role_arn
  ecs_service_iam_role_arn = module.ecs.service_iam_role_arn
  command                  = var.web_command
  env_vars                 = concat(local.env_vars, var.extra_env_vars)
  image                    = local.be_image
  env                      = var.env
  alb_default_tg_arn       = module.lb.alb_default_tg_arn
  log_group_name           = "/ecs/api"
  log_stream_name          = "api"
  region                   = var.region
}

###############################################################################
# Celery Default Worker
###############################################################################

# module "celery_default_worker" {
#   source                   = "./modules/default_celery_worker"
#   ecs_cluster_id           = module.ecs.cluster_id
#   task_role_arn            = module.ecs.task_role_arn
#   ecs_service_iam_role_arn = module.ecs.service_iam_role_arn
#   command                  = var.default_celery_worker_command
#   env_vars                 = concat(local.env_vars, var.extra_env_vars)
#   image                    = local.be_image
#   env                      = var.env
#   log_group_name           = "/ecs/celery-default-worker"
#   log_stream_name          = "celery-default-worker"
#   region                   = var.region
# }

###############################################################################
# Migrate - Database Migrate Task Definition
###############################################################################

module "migrate" {
  source                   = "./modules/migrate"
  ecs_cluster_id           = module.ecs.cluster_id
  task_role_arn            = module.ecs.task_role_arn
  ecs_service_iam_role_arn = module.ecs.service_iam_role_arn
  command                  = var.migrate_command
  env_vars                 = concat(local.env_vars, var.extra_env_vars)
  image                    = local.be_image
  env                      = var.env
  log_group_name           = "/ecs/migrate"
  log_stream_name          = "migrate"
  region                   = var.region
}
