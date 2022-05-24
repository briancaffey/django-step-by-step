# VPC

output "vpc_id" {
  value = module.main.vpc_id
}

output "private_subnets" {
  value = module.main.private_subnets
}

output "public_subnets" {
  value = module.main.public_subnets
}

# Security groups

output "ecs_sg_id" {
  value = module.main.ecs_sg_id
}

# Load balancer

output "listener_arn" {
  value = module.main.listener_arn
}

output "alb_default_tg_arn" {
  value = module.main.alb_default_tg_arn
}

output "alb_dns_name" {
  value = module.main.alb_dns_name
}

# Service Discovery

output "service_discovery_namespace_id" {
  value = module.main.service_discovery_namespace_id
}

# IAM

output "task_role_arn" {
  value = module.main.task_role_arn
}

output "execution_role_arn" {
  value = module.main.execution_role_arn
}

# RDS

output "rds_address" {
  value       = module.main.rds_address
  description = "address of the RDS instance"
}

# Bastion

output "ssh_command" {
  value = module.main.ssh_command
}