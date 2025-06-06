# S3 bucket for storing state file
resource "aws_s3_bucket" "this" {
  bucket = "${var.backend_name}-bucket"

  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_s3_bucket_versioning" "this" {
  bucket = aws_s3_bucket.this.id
  versioning_configuration {
    status = "Enabled"
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
    prevent_destroy = false
  }
}

# ECR repository for the backend web app
resource "aws_ecr_repository" "backend" {
  name                 = "${var.backend_name}-backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

# ECR repository for the backend web app sidecar NGINX container
resource "aws_ecr_repository" "backend-nginx" {
  name                 = "${var.backend_name}-backend-nginx"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

# ECR repository for the frontend web app
resource "aws_ecr_repository" "frontend" {
  name                 = "${var.backend_name}-frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
