locals {
  name = "api"
}

resource "aws_cloudwatch_log_group" "this" {
  name              = var.log_group_name
  retention_in_days = var.log_retention_in_days
}

resource "aws_cloudwatch_log_stream" "this" {
  name           = var.log_stream_name
  log_group_name = aws_cloudwatch_log_group.this.name
}

resource "aws_ecs_task_definition" "this" {
  family = "${var.env}-api"
  container_definitions = jsonencode([
    {
      name  = local.name
      image = var.image
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
      portMappings = [
        {
          containerPort = 8000
          hostPort      = 0
          protocol      = "tcp"
        }
      ]
    }
  ])
  task_role_arn = var.task_role_arn
}

resource "aws_ecs_service" "this" {
  name            = "${var.env}-api"
  cluster         = var.ecs_cluster_id
  task_definition = aws_ecs_task_definition.this.arn
  iam_role        = var.ecs_service_iam_role_arn # aws_iam_role.ecs_service.arn # change
  desired_count   = var.app_count

  # TODO move depends on to module ?
  # depends_on      = [aws_alb_listener.ecs-alb-http-listener, aws_iam_role_policy.ecs-service-role-policy]

  load_balancer {
    target_group_arn = var.alb_default_tg_arn # change
    container_name   = local.name
    container_port   = 8000
  }
}
