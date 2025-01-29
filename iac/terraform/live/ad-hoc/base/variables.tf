variable "certificate_arn" {
  type = string
}

variable "region" {
  type    = string
  default = "us-east-1"
}

variable "backend_name" {
  type = string
}

variable "domain_name" {
  type = string
}
