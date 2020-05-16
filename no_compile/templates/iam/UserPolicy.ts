import { IAM } from "cloudform";
import { config } from "config";

export const UserPolicy = new IAM.Policy({
  PolicyName: `${config.PROJECT_NAME}-user-policy`,
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "*",
        Resource: "*"
      }
    ]
  }
});
