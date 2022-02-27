data "aws_route53_zone" "this" {
  name         = var.zone_name
  private_zone = false
}

resource "aws_route53_record" "this" {
  zone_id = data.aws_route53_zone.this.id
  name    = var.record_name
  type    = "CNAME"
  ttl     = "60"
  records = [var.alb_dns_name]
}
