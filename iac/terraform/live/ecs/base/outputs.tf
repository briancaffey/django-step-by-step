output "vpc_id" {
  value = module.main.vpc_id
}

output "assets_bucket_name" {
  value       = module.main.assets_bucket_name
  description = "Bucket name used for S3 assets"
}

output "private_subnet_ids" {
  value = module.main.private_subnet_ids
}

output "app_sg_id" {
  value = module.main.app_sg_id
}

output "alb_sg_id" {
  value = module.main.alb_sg_id
}

output "listener_arn" {
  value = module.main.listener_arn
}

output "alb_dns_name" {
  value = module.main.alb_dns_name
}

output "rds_address" {
  value       = module.main.rds_address
  description = "address of the RDS instance"
}

output "domain_name" {
  value = module.main.domain_name
}

output "base_stack_name" {
  value = module.main.base_stack_name
}

output "redis_service_host" {
  value = module.main.redis_service_host
}

output "rds_password_secret_name" {
  value = module.main.rds_password_secret_name
}
