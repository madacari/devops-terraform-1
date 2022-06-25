################################################################################
# Le module SG (security group) : va définir les règles réseaux dans notre VPC
################################################################################

module "sipios-formation-sg-database" {
  source = "terraform-aws-modules/security-group/aws"

  name        = var.sg.vars.database.vars.name
  description = "Security group for our database"
  vpc_id      = module.sipios_formation_vpc.vpc_id

  # ingress
  ingress_with_cidr_blocks = [
    {
      from_port   = 5432
      to_port     = 5432
      protocol    = "tcp"
      description = "PostgreSQL access from within VPC"
      cidr_blocks = module.sipios_formation_vpc.vpc_cidr_block
    },
  ]

  tags = {
    Name = var.sg.vars.database.vars.tags.name
  }
}

# ALB pour Auto load balancing
module "sipios-formation-sg-alb" {
  source = "terraform-aws-modules/security-group/aws"

  name        = var.sg.vars.alb.vars.name
  description = "Security group to redirect to runnning container"
  vpc_id      = module.sipios_formation_vpc.vpc_id

  # ingress
  ingress_with_cidr_blocks = [
    {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      description = "Access from outside to container"
      cidr_blocks = "0.0.0.0/0"
    },
  ]

  egress_with_cidr_blocks = [
    {
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      description = "Reply to outside world"
      cidr_blocks = "0.0.0.0/0"
    }
  ]

  tags = {
    Name = var.sg.vars.alb.vars.tags.name
  }
}