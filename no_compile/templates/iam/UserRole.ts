import { IAM, Fn } from "cloudform";
import { config } from "config";

export const UserRole = new IAM.Role({
  RoleName: `${config.PROJECT_NAME}-user-role`,
  AssumeRolePolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Federated: "cognito-identity.amazonaws.com"
        },
        Action: "sts:AssumeRoleWithWebIdentity",
        Condition: {
          StringEquals: {
            "cognito-identity.amazonaws.com:aud": Fn.ImportValue("IdentityPoolId")
          },
          "ForAnyValue:StringLike": {
            "cognito-identity.amazonaws.com:amr": "authenticated"
          }
        }
      }
    ]
  }
});
