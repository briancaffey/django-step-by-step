output "migrate_command" {
  value = "aws ecs run-task --cluster ${module.ecs.cluster_arn} --task-definition ${module.migrate.task_arn}"
}

output "collectstatic_command" {
  value = "aws ecs run-task --cluster ${module.ecs.cluster_arn} --task-definition ${module.collectstatic.task_arn}"
}

output "app_url" {
  value = "https://${module.route53.record_name}"
}

output "migrate_script" {
  value = module.migrate.task_execution_command
}

output "collectstatic_script" {
  value = module.collectstatic.task_execution_command
}
