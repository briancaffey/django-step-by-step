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

resource "aws_elasticache_replication_group" "this" {
  automatic_failover_enabled    = true
  replication_group_description = "elasticache-replication-group"
  replication_group_id          = "elasticache-replication-group-id"
  availability_zones            = var.azs
  node_type                     = "cache.t2.micro"
  port                          = 6379
  engine                        = "redis"
  engine_version                = "5.0.6"
  parameter_group_name          = "default.redis5.0"
  number_cache_clusters         = 2
  subnet_group_name             = aws_elasticache_subnet_group.this.name
  security_group_ids            = [aws_security_group.redis.id]
  lifecycle {
    ignore_changes = [number_cache_clusters]
  }
}

resource "aws_elasticache_cluster" "elasticache" {
  cluster_id           = "${var.env}-ec-cluster-id"
  replication_group_id = aws_elasticache_replication_group.this.id
}
