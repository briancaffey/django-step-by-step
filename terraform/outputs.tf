output "migrate_command" {
  value = "aws ecs run-task --cluster ${module.ecs.cluster_arn} --task-definition ${module.migrate.migrate_task_arn}"
}
