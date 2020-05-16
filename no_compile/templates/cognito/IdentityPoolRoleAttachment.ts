import { Cognito, Fn } from "cloudform";

export const IdentityPoolRoleAttachment = new Cognito.IdentityPoolRoleAttachment({
  IdentityPoolId: Fn.Ref("IdentityPoolId"),
  Roles: {
    authenticated: Fn.GetAtt("AuthenticatedRole", "Arn"),
    unauthenticated: Fn.GetAtt("UnauthenticatedRole", "Arn")
  },
  RoleMappings: {
    UserPool: {
      IdentityProvider: Fn.Ref("UserPool"),
      AmbiguousResolution: "Deny",
      Type: "Rules",
      RulesConfiguration: {
        Rules: [
          {
            Claim: "custom:userGroup",
            MatchType: "Equals",
            Value: "admin",
            RoleARN: Fn.GetAtt("AdminRole", "Arn")
          }
        ]
      }
    }
  }
});
