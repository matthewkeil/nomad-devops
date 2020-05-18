import { IAM } from "cloudform";

export const CustomResourceProviderRole = new IAM.Role({
  RoleName: "nomad-devops-custom-resource-provider-role",
  AssumeRolePolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "sts:AssumeRole",
        Principal: {
          Service: "lambda.amazonaws.com"
        }
      }
    ]
  }
});
