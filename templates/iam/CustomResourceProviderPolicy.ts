import { IAM, Fn } from "cloudform";

export const CustomResourceProviderPolicy = new IAM.Policy({
  PolicyName: "nomad-devops-custom-resource-provider-policy",
  Roles: [Fn.Ref("CustomResourceProviderRole")],
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "logs:*",
        Resource: Fn.GetAtt("CustomResourceProviderLogGroup", "Arn")
      },
      {
        Effect: "Allow",
        Action: [
          "acm:ListCertificates",
          "acm:DeleteCertificate",
          "acm:RequestCertificate",
          "acm:DescribeCertificate",
          "acm:AddTagsToCertificate",
          "acm:ListTagsForCertificate",
          "acm:UpdateCertificateOptions",
          "acm:RemoveTagsFromCertificate"
        ],
        Resource: "arn:aws:acm:*:*:*"
      },
      {
        Effect: "Allow",
        Action: [
          "route53:CreateHostedZone",
          "route53:DeleteHostedZone",
          "route53:GetHostedZone",
          "route53:ListHostedZones",
          "route53:UpdateHostedZoneComment",
          "route53:ListHostedZonesByName",
          "route53:CreateReusableDelegationSet",
          "route53:GetReusableDelegationSet",
          "route53:ListReusableDelegationSets",
          "route53:DeleteReusableDelegationSets",
          "route53:ChangeResourceRecordSets",
          "route53:ListResourceRecordSets",
          "route53:ChangeTagsForResource",
          "route53:ListTagsForResource",
          "route53domains:DeleteTagsForDomain",
          "route53domains:ListTagsForDomain",
          "route53domains:UpdateTagsForDomain",
          "route53:AssociateVPCWithHostedZone",
          "route53:DisassociateVPCFromHostedZone",
          "route53:AssociateVPCWithHostedZone",
          "route53:AssociateVPCWithHostedZone",
          "route53:AssociateVPCWithHostedZone"
        ],
        Resource: "arn:aws:route53:::*"
      }
    ]
  }
}).dependsOn(["CustomResourceProviderRole", "CustomResourceProviderLogGroup"]);
