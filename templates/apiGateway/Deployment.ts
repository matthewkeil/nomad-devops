import { ApiGateway, Fn } from "cloudform";
import { config } from "../../config";

export const Deployment = new ApiGateway.Deployment({
  RestApiId: Fn.Ref("RestApi"),
  Description: `Deployment for the ${config.BRANCH} branch`
});
