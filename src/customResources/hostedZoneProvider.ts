import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG("devops:src:customResources:hostedZoneProvider" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
import { CloudFormationCustomResourceResponse } from "aws-lambda";
import { ResourceHandler } from "../customResourceProvider";
import {
  createHostedZone,
  updateHostedZone,
  deleteHostedZone,
  HostedZoneParams,
  getHostedZoneForDomain,
  getZoneInfoForDomain,
  ZoneInfo
} from "../../lib";

export const hostedZoneProvider: ResourceHandler = async event => {
  try {
    const Name = event.ResourceProperties.Name;
    if (!Name) throw new Error("must provide a Name for HostedZone");
    const hostedZone = await getHostedZoneForDomain(Name);
    const HostedZoneId = hostedZone?.Id.split("/").pop();

    let results: HostedZoneParams | void;
    let zoneInfo: ZoneInfo;
    switch (event.RequestType.toLowerCase()) {
      case "create":
        results = await createHostedZone({
          RequestId: event.RequestId,
          ResourceProperties: (event as any).ResourceProperties as HostedZoneParams
        });
        zoneInfo = await getZoneInfoForDomain(Name);
        break;
      case "update":
        results = await updateHostedZone({
          Id: HostedZoneId,
          OldResourceProperties: (event as any).OldResourceProperties as HostedZoneParams,
          ResourceProperties: (event as any).ResourceProperties as HostedZoneParams
        });
        zoneInfo = await getZoneInfoForDomain(Name);
        break;
      case "delete":
        results = await deleteHostedZone({
          Id: HostedZoneId
        });
        break;
      default:
        return Promise.resolve({
          Status: "FAILED",
          RequestId: event.RequestId,
          StackId: event.StackId,
          PhysicalResourceId: "NomadDevops::HostedZone",
          LogicalResourceId: event.LogicalResourceId,
          Reason: "invalid event.RequestType"
        });
    }
    debug(results);

    const response: CloudFormationCustomResourceResponse = {
      Status: "SUCCESS",
      RequestId: event.RequestId,
      StackId: event.StackId,
      PhysicalResourceId: "NomadDevops::HostedZone",
      LogicalResourceId: event.LogicalResourceId
    };
    if (zoneInfo) {
      response.Data = {
        NameServers: zoneInfo.ns,
        Id: HostedZoneId
      };
    }
    return response;
  } catch (err) {
    return {
      Status: "FAILED",
      RequestId: event.RequestId,
      StackId: event.StackId,
      PhysicalResourceId: "NomadDevops::HostedZone",
      LogicalResourceId: event.LogicalResourceId,
      Reason: JSON.stringify(err)
    };
  }
};
