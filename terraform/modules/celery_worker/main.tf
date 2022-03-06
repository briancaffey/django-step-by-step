resource "aws_cloudwatch_log_group" "this" {
  name              = var.log_group_name
  retention_in_days = var.log_retention_in_days
}

resource "aws_cloudwatch_log_stream" "this" {
  name           = var.log_stream_name
  log_group_name = aws_cloudwatch_log_group.this.name
}

resource "aws_ecs_task_definition" "this" {
  family = "${var.env}-${var.name}"
  container_definitions = jsonencode([
    {
      name        = var.name
      image       = var.image
      cpu         = var.cpu
      memory      = var.memory
      essential   = true
      links       = []
      environment = var.env_vars
      command     = var.command
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = var.log_group_name
          "awslogs-region"        = var.region
          "awslogs-stream-prefix" = var.log_stream_name
        }
      }
    }
  ])
  task_role_arn = var.task_role_arn
}

resource "aws_ecs_service" "this" {
  name            = "${var.env}_${var.name}"
  cluster         = var.ecs_cluster_id
  task_definition = aws_ecs_task_definition.this.arn
  desired_count   = var.app_count
}
