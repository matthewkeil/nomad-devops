import { Cognito, Fn, Refs } from "cloudform";
import { config } from "config";

export const IdentityPool = new Cognito.IdentityPool({
  IdentityPoolName: `${config.PROJECT_NAME}-identity-pool`,
  AllowUnauthenticatedIdentities: true,
  CognitoEvents: {},
  CognitoIdentityProviders: [
    {
      ClientId: Fn.Ref("UserPoolClient"),
      ServerSideTokenCheck: false,
      ProviderName: Fn.Join("", [
        "cognito-idp.",
        Refs.Region,
        ".amazonaws.com/",
        Fn.Ref("UserPool")
      ])
    }
  ],
  CognitoStreams: {},
  DeveloperProviderName: config.ROOT_DOMAIN,
  OpenIdConnectProviderARNs: []
});
