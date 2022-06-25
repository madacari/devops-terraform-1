################################################################################
# VPC Module : Un VPC un réseau virtuel sur lequel on va pouvoir opérer
################################################################################

# Locals = variable only for this file
locals {
  tags = var.vpc.vpc_var.tags
}

module "sipios_formation_vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = var.vpc.vpc_var.name
  cidr = var.vpc.vpc_var.cidr

  azs            = var.vpc.vpc_var.azs            # AZ : Availability Zone donc les zones où on va pouvoir mettre des ressources (ici europe-1 : Irlande)
  public_subnets = var.vpc.vpc_var.public_subnets # Sous réseau (Normalement privé et public)

  enable_nat_gateway = false
  single_nat_gateway = true

  enable_dns_hostnames = true
  enable_dns_support   = true


  private_subnet_tags = {
    Name = "${var.vpc.vpc_var.private_subnet_tags_name}"
  }

  public_subnet_tags = {
    Name = "${var.vpc.vpc_var.public_subnet_tags_name}"
    Tier = "Public"
  }

  vpc_tags = {
    Name = "${var.vpc.vpc_var.tags_name}"
  }

  tags = local.tags
}

output "vpc_id" {
  value = module.sipios_formation_vpc.vpc_id
}

output "subnets_ids" {
  value = module.sipios_formation_vpc.public_subnets
}