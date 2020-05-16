import { Fn } from "cloudform";
import { config } from "config";

export const UserPoolDomain = {
  Type: "AWS::Cognito::UserPoolDomain",
  Properties: {
    CustomDomainConfig: {
      CertificateArn: Fn.Ref("Certificate")
    },
    Domain: `auth.${config.ROOT_DOMAIN}`,
    UserPoolId: Fn.Ref("UserPool")
  }
};
