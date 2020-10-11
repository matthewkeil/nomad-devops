import { ApiGateway, Fn } from "cloudform";
import { config } from "../../config";

export const Stage = new ApiGateway.Stage({
  Description: `Stage for the ${config.BRANCH} branch`,
  RestApiId: Fn.Ref("RestApi"),
  DeploymentId: Fn.Ref("Deployment"),
  StageName: config.BRANCH !== "master" ? config.BRANCH : "v1",
  MethodSettings: [
    {
      DataTraceEnabled: true,
      HttpMethod: "*",
      LoggingLevel: "INFO",
      ResourcePath: "/*"
    }
  ]
});
