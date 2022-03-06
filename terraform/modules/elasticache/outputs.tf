output "redis_service_host" {
  value = aws_elasticache_cluster.this.cache_nodes[0].address
}
