resource "aws_elasticache_subnet_group" "this" {
  name       = "elasticache-subnet-group"
  subnet_ids = var.private_subnets
}

resource "aws_security_group" "redis" {
  name        = "redis-security-group"
  description = "Allows inbound access from ECS only"
  vpc_id      = var.vpc_id

  ingress {
    protocol        = "tcp"
    from_port       = "6379"
    to_port         = "6379"
    security_groups = [var.ecs_sg_id]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_elasticache_cluster" "this" {
  cluster_id           = "${var.env}-redis-cluster"
  engine               = "redis"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis6.x"
  engine_version       = "6.x"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.this.name
  security_group_ids   = [aws_security_group.redis.id]
}
