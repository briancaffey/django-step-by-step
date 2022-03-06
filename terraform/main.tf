###############################################################################
# VPC
###############################################################################

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "${var.env}-vpc"
  cidr = var.cidr

  azs             = var.azs
  private_subnets = var.private_subnets
  public_subnets  = var.public_subnets

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
# S3 - TODO add S3 bucket resource for app assets
###############################################################################

module "s3" {
  source        = "./modules/s3"
  bucket_name   = "${replace(var.record_name, ".", "-")}-${var.env}-bucket"
  force_destroy = var.force_destroy
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
      name  = "S3_BUCKET_NAME"
      value = module.s3.bucket_name
    },
    {
      name  = "FRONTEND_URL"
      value = var.frontend_url
    }
  ]
  be_image = "${var.ecr_be_repo_url}:${var.be_image_tag}"
  fe_image = "${var.ecr_fe_repo_url}:${var.fe_image_tag}"
}

###############################################################################
# Frontend ECS Service
###############################################################################

module "web-ui" {
  source                   = "./modules/web"
  name                     = "web-ui"
  ecs_cluster_id           = module.ecs.cluster_id
  task_role_arn            = module.ecs.task_role_arn
  ecs_service_iam_role_arn = module.ecs.service_iam_role_arn
  command                  = var.frontend_command
  env_vars                 = []
  image                    = local.fe_image
  env                      = var.env
  alb_default_tg_arn       = module.lb.alb_default_tg_arn
  log_group_name           = "/ecs/web-ui"
  log_stream_name          = "web-ui"
  region                   = var.region
  cpu                      = var.api_cpu
  memory                   = var.api_memory
  port                     = 80
  path_patterns            = ["/*"]
  health_check_path        = "/"
  listener_arn             = module.lb.listener_arn
  vpc_id                   = module.vpc.vpc_id
  priority                 = 2
}

###############################################################################
# Gunicorn ECS Service
###############################################################################

module "api" {
  source                   = "./modules/web"
  name                     = "gunicorn"
  ecs_cluster_id           = module.ecs.cluster_id
  task_role_arn            = module.ecs.task_role_arn
  ecs_service_iam_role_arn = module.ecs.service_iam_role_arn
  command                  = var.api_command
  env_vars                 = concat(local.env_vars, var.extra_env_vars)
  image                    = local.be_image
  env                      = var.env
  alb_default_tg_arn       = module.lb.alb_default_tg_arn
  log_group_name           = "/ecs/api"
  log_stream_name          = "api"
  region                   = var.region
  cpu                      = var.api_cpu
  memory                   = var.api_memory
  port                     = 8000
  path_patterns            = ["/api/*", "/admin/*", "/graphql/*", "/mtv/*"]
  health_check_path        = "/api/health-check/"
  listener_arn             = module.lb.listener_arn
  vpc_id                   = module.vpc.vpc_id
  priority                 = 1
}

###############################################################################
# Celery - Default Worker
###############################################################################

module "default_celery_worker" {
  source                   = "./modules/celery_worker"
  name                     = "default"
  ecs_cluster_id           = module.ecs.cluster_id
  task_role_arn            = module.ecs.task_role_arn
  ecs_service_iam_role_arn = module.ecs.service_iam_role_arn
  command                  = var.default_celery_worker_command
  env_vars                 = concat(local.env_vars, var.extra_env_vars)
  image                    = local.be_image
  env                      = var.env
  log_group_name           = "/ecs/celery-default-worker"
  log_stream_name          = "celery-default-worker"
  region                   = var.region
  cpu                      = var.default_celery_worker_cpu
  memory                   = var.default_celery_worker_memory
}

###############################################################################
# Celery Beat
###############################################################################

module "celery_beat" {
  source                   = "./modules/celery_beat"
  name                     = "beat"
  ecs_cluster_id           = module.ecs.cluster_id
  task_role_arn            = module.ecs.task_role_arn
  ecs_service_iam_role_arn = module.ecs.service_iam_role_arn
  command                  = var.celery_beat_command
  env_vars                 = concat(local.env_vars, var.extra_env_vars)
  image                    = local.be_image
  env                      = var.env
  log_group_name           = "/ecs/celery-beat"
  log_stream_name          = "celery-beat"
  region                   = var.region
  cpu                      = var.celery_beat_cpu
  memory                   = var.celery_beat_memory
}

###############################################################################
# Migrate - Database Migrate Task Definition
###############################################################################

module "migrate" {
  name                     = "migrate"
  source                   = "./modules/management_command"
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
  cpu                      = var.migrate_cpu
  memory                   = var.migrate_memory
}

###############################################################################
# collectstatic - collectstatic task
###############################################################################

module "collectstatic" {
  name                     = "collectstatic"
  source                   = "./modules/management_command"
  ecs_cluster_id           = module.ecs.cluster_id
  task_role_arn            = module.ecs.task_role_arn
  ecs_service_iam_role_arn = module.ecs.service_iam_role_arn
  command                  = var.collectstatic_command
  env_vars                 = concat(local.env_vars, var.extra_env_vars)
  image                    = local.be_image
  env                      = var.env
  log_group_name           = "/ecs/collectstatic"
  log_stream_name          = "collectstatic"
  region                   = var.region
  cpu                      = var.collectstatic_cpu
  memory                   = var.collectstatic_memory
}
