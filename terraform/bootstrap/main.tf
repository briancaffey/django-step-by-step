terraform {
  required_version = ">=1.1.2"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.74.0"
    }
  }
}

provider "aws" {
  region = var.region
}

# S3 bucket for storing state file
resource "aws_s3_bucket" "this" {
  bucket = "${var.backend_name}-bucket"
  versioning {
    enabled = true
  }

  lifecycle {
    prevent_destroy = true
  }
}

# DynamoDB table for locking the state file
resource "aws_dynamodb_table" "this" {
  name           = "${var.backend_name}-lock-table"
  hash_key       = "LockID"
  read_capacity  = 20
  write_capacity = 20

  attribute {
    name = "LockID"
    type = "S"
  }

  lifecycle {
    prevent_destroy = true
  }
}

# ECR repository for the backend web app
resource "aws_ecr_repository" "this" {
  name                 = "backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
