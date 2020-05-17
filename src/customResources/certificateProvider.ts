import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG(
    "devops:src:customResources:certificateRequestProvider" + (filter.length ? `:${filter}` : "")
  );
const debug = Debug("");
import { CloudFormationCustomResourceResponse } from "aws-lambda";
import { ResourceHandler } from "./customResourceProvider";
import {} from "../../lib";

export const certificateProvider: ResourceHandler = async event => {
  try {
    let results;
    let certInfo;
    switch (event.RequestType.toLowerCase()) {
      case "create":
        break;
      case "update":
        break;
      case "delete":
        break;
      default:
        return Promise.resolve({
          Status: "FAILED",
          RequestId: event.RequestId,
          StackId: event.StackId,
          PhysicalResourceId: "NomadDevops::Certificate",
          LogicalResourceId: event.LogicalResourceId,
          Reason: "invalid event.RequestType"
        });
    }
    debug(results);

    const response: CloudFormationCustomResourceResponse = {
      Status: "SUCCESS",
      RequestId: event.RequestId,
      StackId: event.StackId,
      PhysicalResourceId: "NomadDevops::Certificate",
      LogicalResourceId: event.LogicalResourceId
    };
    if (certInfo) {
      response.Data = {};
    }
    return response;
  } catch (err) {
    return {
      Status: "FAILED",
      RequestId: event.RequestId,
      StackId: event.StackId,
      PhysicalResourceId: "NomadDevops::Certificate",
      LogicalResourceId: event.LogicalResourceId,
      Reason: JSON.stringify(err)
    };
  }
};
