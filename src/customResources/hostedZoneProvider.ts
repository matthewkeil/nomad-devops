import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG("devops:src:customResources:hostedZoneProvider" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
import { Route53 } from "aws-sdk";
import {
  Context,
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceUpdateEvent,
  CloudFormationCustomResourceDeleteEvent,
  CloudFormationCustomResourceResponse
} from "aws-lambda";
import { ResourceHandler } from "./customResourceProvider";
import { getDelegationSet, getHostedZoneForDomain } from "../../lib";
import { config } from "../../config";

const createHostedZone = async (
  event: CloudFormationCustomResourceCreateEvent
): Promise<CloudFormationCustomResourceResponse> => {
  let hostedZone: Route53.HostedZone;
  const deletgationSet = await getDelegationSet();
  try {
    const params = {
      CallerReference: event.RequestId,
      Name: event.ResourceProperties["Name"],
      DelegationSetId: deletgationSet.Id,
      HostedZoneConfig: {
        PrivateZone: false
      }
    } as Route53.CreateHostedZoneRequest;

    const { HostedZoneConfig, HostedZoneTags, QueryLoggingConfig, VPCs } = event.ResourceProperties;
    if (HostedZoneConfig?.Comment) params.HostedZoneConfig.Comment = HostedZoneConfig.Comment;
    if (VPCs) params.VPC = VPCs[0];

    const { HostedZone } = await config.route53.createHostedZone(params).promise();

    if ((VPCs as Route53.VPC[])?.length > 1) {
      for (const vpc of VPCs.slice(1)) {
        await config.route53
          .createVPCAssociationAuthorization({ HostedZoneId: HostedZone.Id, VPC: vpc })
          .promise();
      }
    }

    if ((HostedZoneTags as Route53.Tag[])?.length) {
      await config.route53
        .changeTagsForResource({
          ResourceId: hostedZone.Id,
          ResourceType: "hostedzone",
          AddTags: HostedZoneTags
        })
        .promise();
    }

    if ((QueryLoggingConfig as Route53.QueryLoggingConfig)?.CloudWatchLogsLogGroupArn) {
      await config.route53
        .createQueryLoggingConfig({
          HostedZoneId: HostedZone.Id,
          CloudWatchLogsLogGroupArn: QueryLoggingConfig.CloudWatchLogsLogGroupArn
        })
        .promise();
    }

    hostedZone = HostedZone;
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

  return {
    Status: "SUCCESS",
    RequestId: event.RequestId,
    StackId: event.StackId,
    PhysicalResourceId: "NomadDevops::HostedZone",
    LogicalResourceId: event.LogicalResourceId,
    Data: {
      NameServers: deletgationSet.NameServers,
      Id: hostedZone.Id.split("/").pop()
    }
  };
};

// const updateHostedZone = async (
//   event: CloudFormationCustomResourceUpdateEvent,
//   context: Context
// ): Promise<CloudFormationCustomResourceResponse> => {};

const deleteHostedZone = async (
  event: CloudFormationCustomResourceDeleteEvent
): Promise<CloudFormationCustomResourceResponse> => {
  const { ResourceProperties } = event;
  const name = ResourceProperties["Name"] || "";
  try {
    const hostedZone = await getHostedZoneForDomain(name);
    const HostedZoneId = hostedZone.Id.split("/").pop();
    if (!hostedZone) throw new Error("no HostedZone exists with domain name " + name);

    let Marker: undefined | string;
    do {
      const { VPCs, NextToken } = await config.route53
        .listVPCAssociationAuthorizations({ HostedZoneId, NextToken: Marker })
        .promise();
      for (const vpc of VPCs) {
        debug("deleting vpc association: ", vpc);
        await config.route53
          .deleteVPCAssociationAuthorization({ HostedZoneId, VPC: vpc })
          .promise();
      }
      debug("NextToken: ", NextToken);
      Marker = NextToken;
    } while (!!Marker);

    let tags: Route53.TagList;
    try {
      const { ResourceTagSet } = await config.route53
        .listTagsForResource({ ResourceType: "hostedzone", ResourceId: HostedZoneId })
        .promise();
      tags = ResourceTagSet?.Tags || [];
    } catch {}
    if (tags.length) {
      debug("deleting tags: ", tags);
      await config.route53
        .changeTagsForResource({
          ResourceType: "hostedzone",
          ResourceId: HostedZoneId,
          RemoveTagKeys: tags.map(({ Key }) => Key)
        })
        .promise();
    }

    let queryLoggingConfig: Route53.QueryLoggingConfig;
    try {
      const { QueryLoggingConfig } = await config.route53
        .getQueryLoggingConfig({ Id: HostedZoneId })
        .promise();
      queryLoggingConfig = QueryLoggingConfig;
    } catch {}
    if (queryLoggingConfig?.CloudWatchLogsLogGroupArn) {
      debug("deleting queryLoggingConfig: ", queryLoggingConfig);
      await config.route53
        .deleteQueryLoggingConfig({
          Id: HostedZoneId
        })
        .promise();
    }

    Marker = undefined;
    const records = [] as Route53.ResourceRecordSets;
    do {
      const { ResourceRecordSets = [], NextRecordIdentifier } = await config.route53
        .listResourceRecordSets({
          HostedZoneId,
          StartRecordIdentifier: Marker
        })
        .promise();
      records.push(...ResourceRecordSets);
      Marker = NextRecordIdentifier;
    } while (!!Marker);

    const changes = records
      .map(ResourceRecordSet => {
        if (ResourceRecordSet.Type === "SOA" || ResourceRecordSet.Type === "NS") return;
        return {
          Action: "DELETE",
          ResourceRecordSet
        };
      })
      .filter(record => !!record);

    if (changes.length) {
      await config.route53
        .changeResourceRecordSets({
          HostedZoneId,
          ChangeBatch: {
            Changes: changes
          }
        })
        .promise();
    }

    await config.route53.deleteHostedZone({ Id: HostedZoneId }).promise();

    return {
      Status: "SUCCESS",
      RequestId: event.RequestId,
      StackId: event.StackId,
      PhysicalResourceId: "NomadDevops::HostedZone",
      LogicalResourceId: event.LogicalResourceId
    };
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

export const hostedZoneProvider: ResourceHandler = (event, context) => {
  switch (event.RequestType.toLowerCase()) {
    case "create":
      return createHostedZone(event as CloudFormationCustomResourceCreateEvent);
    // case "update":
    //   return updateHostedZone(event as CloudFormationCustomResourceUpdateEvent, context);
    case "delete":
      return deleteHostedZone(event as CloudFormationCustomResourceDeleteEvent);
    // default:
  }
};
