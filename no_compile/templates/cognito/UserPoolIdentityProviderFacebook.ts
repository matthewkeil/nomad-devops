import { Fn } from "cloudform";
import { config } from "config";

export const UserPoolIdentityProviderFacebook = {
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
      authorize_scopes: "public_profile,email"
    },
    ProviderName: `${config.PROJECT_NAME}-facebook-provider`,
    ProviderType: "Facebook",
    UserPoolId: Fn.Ref("UserPool")
  }
};
