output "migrate_command" {
  value = "aws ecs run-task --cluster ${module.ecs.cluster_arn} --task-definition ${module.migrate.task_arn}"
}

output "collectstatic_command" {
  value = "aws ecs run-task --cluster ${module.ecs.cluster_arn} --task-definition ${module.collectstatic.task_arn}"
}

output "record_name" {
  value = "https://${module.route53.record_name}"
}
