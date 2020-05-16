import { IAM } from "cloudform";
import { config } from "config";

export const AdminPolicy = new IAM.Policy({
  PolicyName: `${config.PROJECT_NAME}-administrator-policy`,
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
