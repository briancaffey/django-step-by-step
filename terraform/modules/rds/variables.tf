variable "rds_db_name" {
  description = "RDS database name"
  default     = "postgres"
}
variable "rds_username" {
  description = "RDS database username"
  default     = "postgres"
}
variable "rds_password" {
  description = "RDS database password"
}

variable "rds_instance_class" {
  description = "RDS instance type"
  default     = "db.t2.micro"
}

variable "vpc_id" {
  type = string
}

variable "private_subnets" {
  type = list(string)
}

variable "ecs_sg_id" {
  type = string
}
