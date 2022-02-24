output "s3_backend_bucket" {
  value = aws_s3_bucket.terraform-state-backend-s3.id
}
output "s3_backend_region" {
  value = aws_s3_bucket.terraform-state-backend-s3.region
}
output "dynamodb_lock_table" {
  value = aws_dynamodb_table.dynamodb-terraform-state-lock.id
}

output "ecr_be_repo_url" {
  value = aws_ecr_repository.backend-ecr-repo.repository_url
}

################################################################################
# Used for the S3 backend (backend.config)
################################################################################

output "bucket" {
  value = aws_s3_bucket.terraform-state-backend-s3.id
}

output "key" {
  value = var.key
}

output "region" {
  value = var.region
}
