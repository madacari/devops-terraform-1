# Define local variables for s3
locals {
  mime_types = {
    htm  = "text/html"
    html = "text/html"
    css  = "text/css"
    ttf  = "font/ttf"
    js   = "application/javascript"
    map  = "application/javascript"
    json = "application/json"
    txt  = "text/plain"
    ico  = "image/vnd.microsoft.icon"
    png  = "image/png"
  }
}

# Create the s3 bucket with policies
module "sipios_formation_s3" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = var.s3.vars.name
  acl    = "public-read"

  force_destroy = true

  versioning = {
    enabled = false
  }

  website = {
    index_document = "index.html"
    error_document = "index.html"
  }

  # Policies
  attach_policy = true
  policy        = data.aws_iam_policy_document.sipios_formation_s3_policies.json

}

# Output to access website deployed
output "website_domain" {
  value = module.sipios_formation_s3.s3_bucket_website_domain
}

output "website_endpoint" {
  value = module.sipios_formation_s3.s3_bucket_website_endpoint
}