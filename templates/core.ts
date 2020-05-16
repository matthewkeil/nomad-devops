import { Fn } from "cloudform";
import { config } from "../config";
import { apiGatewayAccountExists } from "../lib/aws";

import { HostedZone } from "./route53/HostedZone";
import { GSuiteMXRecordSet } from "./route53/GSuiteMXRecordSet";
import { ApiGatewayAccount } from "./apiGateway/ApiGatewayAccount";
import { ApiGatewayPolicy } from "./apiGateway/ApiGatewayPolicy";
import { ApiGatewayRole } from "./apiGateway/ApiGatewayRole";
import { Certificate } from "./certificateManager/Certificate";
// import { UserPool } from "./cognito/UserPool";
// import { UserPoolClient } from "./cognito/UserPoolClient";
// import { UserPoolDomain } from "./cognito/UserPoolDomain";
// import { UserPoolUICustomizationAttachment } from "./cognito/UserPoolUICustomizationAttachment";
// import { UserPoolIdentityProviderGoogle } from "./cognito/UserPoolIdentityProviderGoogle";
// import { UserPoolIdentityProviderFacebook } from "./cognito/UserPoolIdentityProviderFacebook";
// import { IdentityPool } from "./cognito/IdentityPool";
// import { IdentityPoolRoleAttachment } from "./cognito/IdentityPoolRoleAttachment";
// import { AdminRole } from "./iam/AdminRole";
// import { AdminPolicy } from "./iam/AdminPolicy";
// import { ServiceRole } from "./iam/ServiceRole";
// import { ServicePolicy } from "./iam/ServicePolicy";
// import { UserRole } from "./iam/UserRole";
// import { UserPolicy } from "./iam/UserPolicy";
// import { UnauthenticatedRole } from "./iam/UnauthenticatedRole";
// import { UnauthenticatedPolicy } from "./iam/UnauthenticatedPolicy";

interface CoreTemplateParams {
  stackName: string;
  hostedZone?: string;
  certificate?: string;
  cognito?: boolean;
  gSuite?: boolean;
}

export const buildCoreTemplate = async ({
  stackName,
  hostedZone,
  certificate,
  cognito = false,
  gSuite = false
}: CoreTemplateParams) => {
  const template = {
    Description: stackName,
    Parameters: {
      RootDomain: {
        Description: "Root domain at which the system is hosted.",
        Type: "String",
        Default: config.ROOT_DOMAIN
      }
    },
    Resources: {},
    Outputs: {
      HostedZone: {
        Description: `HostedZoneId for ${config.ROOT_DOMAIN}`,
        Value: Fn.Ref("HostedZone"),
        Export: {
          Name: `${config.PROJECT_NAME}-hosted-zone`
        }
      },
      Certificate: {
        Description: `SSL/TLS Certificate covering ${config.ROOT_DOMAIN}`,
        Value: Fn.Ref("Certificate"),
        Export: {
          Name: `${config.PROJECT_NAME}-certificate`
        }
      }
    }
  };

  if (!(await apiGatewayAccountExists())) {
    template.Resources["ApiGatewayAccount"] = ApiGatewayAccount;
    template.Resources["ApiGatewayPolicy"] = ApiGatewayPolicy;
    template.Resources["ApiGatewayRole"] = ApiGatewayRole;
  }

  if (hostedZone) {
    template.Parameters["HostedZone"] = {
      Description: "Existing HostedZone for " + config.ROOT_DOMAIN,
      Type: "String",
      Default: hostedZone
    };
  } else {
    template.Resources["HostedZone"] = HostedZone;
  }

  if (gSuite) {
    template.Resources["GSuiteMXRecordSet"] = GSuiteMXRecordSet;
  }

  if (certificate) {
    template.Parameters["Certificate"] = {
      Description: "Existing certificate for " + config.ROOT_DOMAIN,
      Type: "String",
      Default: certificate
    };
  } else {
    template.Resources["Certificate"] = Certificate;
  }

  // if (cognito) {
  //   template.Resources["UserRole"] = UserRole;
  //   template.Resources["UserPolicy"] = UserPolicy;
  //   template.Resources["AdminRole"] = AdminRole;
  //   template.Resources["AdminPolicy"] = AdminPolicy;
  //   template.Resources["ServiceRole"] = ServiceRole;
  //   template.Resources["ServicePolicy"] = ServicePolicy;
  //   template.Resources["UnauthenticatedRole"] = UnauthenticatedRole;
  //   template.Resources["UnauthenticatedPolicy"] = UnauthenticatedPolicy;
  //   template.Resources["IdentityPool"] = IdentityPool;
  //   template.Resources["IdentityPoolRoleAttachment"] = IdentityPoolRoleAttachment;
  //   template.Resources["UserPool"] = UserPool;
  //   template.Resources["UserPoolClient"] = UserPoolClient;
  //   template.Resources["UserPoolDomain"] = UserPoolDomain;
  //   template.Resources["UserPoolIdentityProviderGoogle"] = UserPoolIdentityProviderGoogle;
  //   template.Resources["UserPoolIdentityProviderFacebook"] = UserPoolIdentityProviderFacebook;
  //   template.Resources["UserPoolUICustomizationAttachment"] = UserPoolUICustomizationAttachment;
  // }

  return template;
};
