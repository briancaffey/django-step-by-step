output "vpc_id" {
  value = module.main.vpc_id
}

output "rds_address" {
  value = module.main.rds_address
}

output "redis_service_host" {
  value = module.main.redis_service_host
}

output "task_role_arn" {
  value = module.main.task_role_arn
}

output "execution_role_arn" {
  value = module.main.execution_role_arn
}

output "listener_arn" {
  value = module.main.listener_arn
}

output "alb_dns_name" {
  value = module.main.alb_dns_name
}

output "ecs_sg_id" {
  value = module.main.ecs_sg_id
}

output "alb_default_tg_arn" {
  value = module.main.alb_default_tg_arn
}

output "private_subnets" {
  value = module.main.private_subnets
}

output "public_subnets" {
  value = module.main.public_subnets
}
