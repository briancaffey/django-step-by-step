output "backend_update_command" {
  value       = module.main.backend_update_command
  description = "Command for running backend update commands with run-task"
}

output "ecs_exec_command" {
  value = module.main.ecs_exec_command
}
