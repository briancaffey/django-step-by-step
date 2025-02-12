module "main" {
  # for local development
  # source          = "../../../../../../terraform-aws-django/modules/ecs/base"
  # for production use use git URL pointing to the module (recommended to use tags instead of main branch)
  source          = "git::https://github.com/briancaffey/terraform-aws-django.git//modules/ecs/base" # add ?ref=<branch> to use a branch
  certificate_arn = var.certificate_arn
  domain_name     = var.domain_name
}
