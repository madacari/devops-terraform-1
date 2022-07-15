terraform {
  backend "s3" {
    bucket = "sipios-terraform-states"
    key    = "manuelc/terraform.tfstate"
    region = "eu-west-1"
  }
}
