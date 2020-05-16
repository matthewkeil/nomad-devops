import { IAM, Fn } from "cloudform";
import { config } from "config";

export const UnauthenticatedPolicy = new IAM.Policy({
  PolicyName: `${config.PROJECT_NAME}-unauthenticated-policy`,
  Roles: [Fn.Ref("UnauthenticatedRole")],
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: ["mobileanalytics:PutEvents", "cognito-sync:*"],
        Resource: "*"
      }
    ]
  }
});
