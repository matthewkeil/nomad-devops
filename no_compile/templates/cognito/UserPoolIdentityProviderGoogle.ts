import { Fn } from "cloudform";
import { config } from "config";

export const UserPoolIdentityProviderGoogle = {
  Type: "AWS::Cognito::UserPoolIdentityProvider",
  Properties: {
    AttributeMapping: {
      email: "email"
    },
    ProviderDetails: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_id: "",
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_secret: "",
      // eslint-disable-next-line @typescript-eslint/camelcase
      authorize_scopes: "profile email openid"
    },
    ProviderName: `${config.PROJECT_NAME}-google-provider`,
    ProviderType: "Google",
    UserPoolId: Fn.Ref("UserPool")
  }
};
