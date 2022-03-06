output "alb_sg_id" {
  value = aws_security_group.this.id
}

output "alb_default_tg_arn" {
  value = aws_alb_target_group.default.arn
}

output "dns_name" {
  value = aws_lb.this.dns_name
}

output "listener_arn" {
  value = aws_alb_listener.https.arn
}
