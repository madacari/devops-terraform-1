variable "access_key" {
  type    = string
  default = "access_key"
}

variable "secret_key" {
  type    = string
  default = "secret_key"
}

variable "region" {
  type    = string
  default = "eu-west-1"
}

variable "sg" {
  description = "Security group variables"
  type = map(object({
    database = map(object({
      name = string
      tags = map(string)
    }))
    alb = map(object({
      name = string
      tags = map(string)
    }))
  }))
  default = {
    "vars" = {
      alb = {
        "vars" = {
          name = "sipios-formation-sg-database-{votre_nom}"
          tags = {
            name = "sipios-formation-sg-database-{votre_nom}"
          }
        }
      }
      database = {
        "vars" = {
          name = "sipios-formation-sg-alb-{votre_nom}"
          tags = {
            name = "sipios-formation-sg-alb-{votre_nom}"
          }
        }
      }
    }
  }
}

variable "vpc" {
  description = "VPC variables"
  type = map(object({
    name                     = string
    tags                     = map(string)
    cidr                     = string
    azs                      = list(string)
    public_subnets           = list(string)
    private_subnet_tags_name = string
    public_subnet_tags_name  = string
    tags_name                = string
  }))
  default = {
    "vpc_var" = {
      azs                      = ["eu-west-1a", "eu-west-1b"]
      cidr                     = "10.0.0.0/16"
      name                     = "vpc-formation-sipios-{votre_nom}"
      private_subnet_tags_name = "private-subnet-formation-devops-sipios-{votre_nom}"
      public_subnet_tags_name  = "public-subnet-formation-devops-sipios-{votre_nom}"
      public_subnets           = ["10.0.101.0/24", "10.0.102.0/24"]
      tags = {
        "Owner"       = "{votre_nom}"
        "Environment" = "Sandbox"
      }
      tags_name = "VPC-Formation-Devops-Sipios-{votre_nom}"
    }
  }
}

variable "rds" {
  description = "RDS variables"
  type = map(object({
    port         = string
    username     = string
    password     = string
    databaseName = string
  }))
  default = {
    "vars" = {
      databaseName = "sipios-formation-database-{votre_nom}"
      password     = "S1rongPassWordForDatabase!"
      port         = "5432"
      username     = "sipios-user"
    }
  }
}

variable "ecr" {
  type = map(object({
    registry   = string
    repository = string
  }))
  description = "ECR Variables utils"
  default = {
    "vars" = {
      registry   = "FIXME"
      repository = "sipios-formation-repository-{votre_nom}"
    }
  }
}

variable "ECR_REGISTRY" {
  type    = string
  default = "267603677376.dkr.ecr.eu-west-1.amazonaws.com" # FIXME
}