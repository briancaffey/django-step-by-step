module "main" {
  # for local development
  source          = "../../../../../../terraform-aws-django/modules/ad-hoc/base"
  # for production use use git URL pointing to the module (recommended to use tags instead of main branch)
  # source          = "git::https://github.com/briancaffey/terraform-aws-django.git//modules/ad-hoc/base"
  certificate_arn = var.certificate_arn
  domain_name     = var.domain_name
}
