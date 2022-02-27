variable "zone_name" {
  description = "The name of the Route 53 zone. Last character should be a period"
  type        = string
}

variable "record_name" {
  description = "value of the record name (e.g. app.example.com)"
  type        = string
}

variable "alb_dns_name" {
  description = "ALB DNS name"
  type        = string
}
