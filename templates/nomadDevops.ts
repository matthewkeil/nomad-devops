import { apiGatewayAccountExists } from "../lib";
import { Stage } from "./apiGateway/Stage";
import { buildApi } from "./apiGateway/buildApi";
import { DomainName } from "./apiGateway/DomainName";
import { Deployment } from "./apiGateway/Deployment";
import { ApiGatewayAccount } from "./apiGateway/ApiGatewayAccount";
import { NomadDevopsRecordSet } from "./route53/NomadDevopsRecordSet";
import { ApiGatewayLoggingRole } from "./iam/ApiGatewayLoggingRole";
import { buildLambdaResources } from "./lambda/buildLambdaResources";

// const baseDomain = [config.ROOT_DOMAIN];
// if (config.BRANCH !== "master") baseDomain.unshift(config.BRANCH);

export const buildNomadDevops = async ({}: { Bucket: string }) => {
  const template = {
    AWSTemplateFormatVersion: "2010-09-09",
    Description: "NomadDevops The Stack.  It makes 'the lights turn on'...",
    Parameters: {
      ApiStage: {
        Description: "Api stage/branch",
        Type: "String",
        Default: "v1"
      },
      UUID: {
        Type: "String",
        Default: ""
      }
    },
    Resources: {
      NomadDevopsRecordSet,
      Deployment,
      DomainName,
      Stage
    }
  };

  if (!(await apiGatewayAccountExists())) {
    template.Resources["ApiGatewayAccount"] = ApiGatewayAccount;
    template.Resources["ApiGatewayLoggingRole"] = ApiGatewayLoggingRole;
  }

  template.Resources = {
    ...template.Resources,
    ...(await buildApi())
    // ...(await buildLambdaResources())
  };

  return template;
};
