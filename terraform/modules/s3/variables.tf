variable "force_destroy" {
  description = "Force destroy S3 bucket"
  type        = bool
}

variable "bucket_name" {
  description = "Bucket name for backend assets"
  type        = string
}
