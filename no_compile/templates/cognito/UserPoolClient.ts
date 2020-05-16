import { Fn } from "cloudform";
import { config } from "config";

export const UserPoolClient = {
  Type: "AWS::Cognito::UserPoolClient",
  Properties: {
    ClientName: `${config.PROJECT_NAME}-user-pool-client`,
    UserPoolId: Fn.Ref("UserPool"),
    ExplicitAuthFlows: [
      "ALLOW_ADMIN_USER_PASSWORD_AUTH",
      "ALLOW_USER_SRP_AUTH",
      "ALLOW_REFRESH_TOKEN_AUTH"
    ],
    SupportedIdentityProviders: ["COGNITO", "Facebook", "Google"]
  }
};
