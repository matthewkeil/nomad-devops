import {} from "cloudform";
import { ApiGatewayAccount } from "./apiGateway/ApiGatewayAccount";
import { ApiGatewayPolicy } from "./apiGateway/ApiGatewayPolicy";
import { ApiGatewayRole } from "./apiGateway/ApiGatewayRole";

interface NomadDevopsTemplateParams {
  deletgationSet: string;
}

export const buildNomadDevopsTemplate = (params: NomadDevopsTemplateParams) => {
  const template = {
    Description: "nomad-devops-core",
    Parameters: {},
    Resources: {
      ApiGatewayAccount,
      ApiGatewayPolicy,
      ApiGatewayRole
    },
    Outputs: {
      DelegationSet: {
        Description: `Reusable delegation set for nomad-house stacks`,
        Value: "",
        Export: {
          Name: `DelegationSet`
        }
      }
    }
  };

  // need this only one allowed per account
  //
  // if (!(await apiGatewayAccountExists())) {
  //   template.Resources["ApiGatewayAccount"] = ApiGatewayAccount;
  //   template.Resources["ApiGatewayPolicy"] = ApiGatewayPolicy;
  //   template.Resources["ApiGatewayRole"] = ApiGatewayRole;
  // }

  return template;
};
