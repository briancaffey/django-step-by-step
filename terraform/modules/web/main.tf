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
      portMappings = [
        {
          containerPort = var.port
          hostPort      = 0
          protocol      = "tcp"
        }
      ]
    }
  ])
  task_role_arn = var.task_role_arn
}

resource "aws_ecs_service" "this" {
  name            = "${var.env}-${var.name}"
  cluster         = var.ecs_cluster_id
  task_definition = aws_ecs_task_definition.this.arn
  iam_role        = var.ecs_service_iam_role_arn
  desired_count   = var.app_count

  load_balancer {
    target_group_arn = aws_lb_target_group.this.arn
    container_name   = var.name
    container_port   = var.port
  }
}

resource "aws_lb_target_group" "this" {
  port     = var.port
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  health_check {
    healthy_threshold   = "5"
    unhealthy_threshold = "2"
    interval            = "120"
    matcher             = "200-399"
    path                = var.health_check_path
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = "5"
  }
  tags = {
    Name = "${var.env}-${var.name}-tg" #* https://github.com/hashicorp/terraform-provider-aws/issues/636#issuecomment-397459646
  }

  lifecycle {
    create_before_destroy = true
  }

}

resource "aws_lb_listener_rule" "this" {
  listener_arn = var.listener_arn
  priority     = var.priority

  condition {
    path_pattern {
      values = var.path_patterns
    }
  }
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this.arn
  }
}
