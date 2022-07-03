output "migrate_command" {
  value       = module.main.migrate_command
  description = "Command for running database migrations use run-task"
}

output "ecs_exec_command" {
  value = module.main.ecs_exec_command
}
