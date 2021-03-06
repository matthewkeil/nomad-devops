import { Fn } from "cloudform";
import { CustomResourceProviderPolicy } from "./iam/CustomResourceProviderPolicy";
import { CustomResourceProvider } from "./lambda/CustomResourceProvider";
import { CustomResourceProviderLogGroup } from "./logs/CustomResourceProviderLogGroup";
import { CustomResourceProviderRole } from "./iam/CustomResourceProviderRole";
import { apiGatewayAccountExists } from "../lib";
import { ApiGatewayAccount } from "./apiGateway/ApiGatewayAccount";
import { ApiGatewayPolicy } from "./apiGateway/ApiGatewayPolicy";
import { ApiGatewayRole } from "./apiGateway/ApiGatewayRole";

export const buildNomadDevopsTemplate = async ({
  Key,
  Bucket
}: {
  Key: string;
  Bucket: string;
}) => {
  const template = {
    AWSTemplateFormatVersion: "2010-09-09",
    Description: "NomadDevops The Stack.  It makes the 'the lights turn on,'... yo...",
    Resources: {
      CustomResourceProvider: CustomResourceProvider({ Bucket, Key }),
      CustomResourceProviderRole,
      CustomResourceProviderPolicy,
      CustomResourceProviderLogGroup
    },
    Outputs: {
      CustomResourceProvider: {
        Description: "your NomadDevops custom resource provider",
        Value: Fn.GetAtt("CustomResourceProvider", "Arn"),
        Export: {
          Name: "NomadDevopsCustomResourceProvider"
        }
      }
    }
  };

  if (!(await apiGatewayAccountExists())) {
    template.Resources["ApiGatewayRole"] = ApiGatewayRole;
    template.Resources["ApiGatewayPolicy"] = ApiGatewayPolicy;
    template.Resources["ApiGatewayAccount"] = ApiGatewayAccount;
  }

  return template;
};
