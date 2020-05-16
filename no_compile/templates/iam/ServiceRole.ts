import { IAM } from "cloudform";
import { config } from "config";

export const ServiceRole = new IAM.Role({
  RoleName: `${config.PROJECT_NAME}-service-role`,
  AssumeRolePolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "sts:AssumeRole",
        Principal: { Service: "*.amazonaws.com" }
      }
    ]
  }
});
