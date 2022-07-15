# Create the s3 bucket with policies
module "sipios_formation_s3" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = var.s3.vars.name
  acl    = "public-read"

  force_destroy = true

  versioning = {
    enabled = false # Chose qu'on va vouloir faire en production
  }

  website = {
    index_document = "index.html"
    error_document = "index.html" # En tant normal on a un fichier dédié
  }

  # Policies
  attach_policy = true
  policy        = data.aws_iam_policy_document.sipios_formation_s3_policies.json

}

# Output to access website deployed
output "website_domain" {
  value = module.sipios_formation_s3.s3_bucket_website_domain
}

output "BUCKET_NAME" {
  value = var.s3.vars.name
}

output "website_endpoint" {
  value = module.sipios_formation_s3.s3_bucket_website_endpoint
}
