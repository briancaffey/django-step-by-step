output "migrate_script" {
  value = module.main.migrate_script
}

output "collectstatic_script" {
  value = module.main.collectstatic_script
}

output "app_url" {
  value = module.main.app_url
}

output "frontend_task_family" {
  value = module.main.frontend_task_family
}

output "frontend_service_name" {
  value = module.main.frontend_service_name
}

output "ecs_cluster_name" {
  value = module.main.ecs_cluster_name
}
