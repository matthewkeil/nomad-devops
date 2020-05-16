import { IAM } from "cloudform";
import { config } from "config";

export const ServicePolicy = new IAM.Policy({
  PolicyName: `${config.PROJECT_NAME}-service-policy`,
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: ["sms:*", "sns:*"],
        Resource: "*"
      }
    ]
  }
});
