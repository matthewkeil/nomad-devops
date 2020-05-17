import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG("devops:lib:aws:route53:updateHostedZone" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
import { Route53 } from "aws-sdk";
import { config } from "../../../config";
import { HostedZoneParams } from "./HostedZoneParams";
import { getFullHostedZoneInfo } from "./getFullHostedZoneInfo";

interface UpdateHostedZoneParams {
  Id: string;
  OldResourceProperties: HostedZoneParams;
  ResourceProperties: HostedZoneParams;
}

export const updateHostedZone = async ({
  Id,
  ResourceProperties,
  OldResourceProperties
}: UpdateHostedZoneParams): Promise<HostedZoneParams> => {
  if (OldResourceProperties.Name !== ResourceProperties.Name) {
    throw new Error("cannot update the Name of a HostedZone");
  }

  if (
    OldResourceProperties.HostedZoneConfig.Comment !== ResourceProperties.HostedZoneConfig.Comment
  ) {
    await config.route53.updateHostedZoneComment({
      Id,
      Comment: ResourceProperties.HostedZoneConfig.Comment as string
    });
  }

  if (OldResourceProperties.HostedZoneTags || ResourceProperties.HostedZoneTags) {
    const oldTags = new Map(
      (OldResourceProperties.HostedZoneTags as Route53.TagList).map(({ Key, Value }) => [
        Key,
        Value
      ]) || []
    );
    const newTags = new Map(
      (ResourceProperties.HostedZoneTags as Route53.TagList).map(({ Key, Value }) => [
        Key,
        Value
      ]) || []
    );
    const deletes: string[] = [];
    const adds: Route53.Tag[] = [];
    for (const [Key] of oldTags) if (!newTags.has(Key)) deletes.push(Key);
    for (const [Key, Value] of newTags) if (!oldTags.has(Key)) adds.push({ Key, Value });

    const params: Route53.ChangeTagsForResourceRequest = {
      ResourceType: "hostedzone",
      ResourceId: Id
    };
    if (adds.length) params.AddTags = adds;
    if (deletes.length) params.RemoveTagKeys = deletes;
    await config.route53.changeTagsForResource(params).promise();
  }

  if (
    OldResourceProperties.QueryLoggingConfig?.CloudWatchLogsLogGroupArn !==
    ResourceProperties.QueryLoggingConfig?.CloudWatchLogsLogGroupArn
  ) {
    await config.route53.deleteQueryLoggingConfig({ Id }).promise();
    await config.route53
      .createQueryLoggingConfig({
        HostedZoneId: Id,
        CloudWatchLogsLogGroupArn: ResourceProperties.QueryLoggingConfig
          .CloudWatchLogsLogGroupArn as string
      })
      .promise();
  }

  if (OldResourceProperties.VPCs || ResourceProperties.VPCs) {
    const oldVPCs = new Set((OldResourceProperties.VPCs as Route53.VPCs) || []);
    const newVPCs = new Set((ResourceProperties.VPCs as Route53.VPCs) || []);
    const changes = [] as Promise<
      Route53.AssociateVPCWithHostedZoneResponse | Route53.DisassociateVPCFromHostedZoneResponse
    >[];

    for (const vpc of oldVPCs) {
      if (!newVPCs.has(vpc)) {
        changes.push(
          config.route53.disassociateVPCFromHostedZone({ HostedZoneId: Id, VPC: vpc }).promise()
        );
      }
    }

    for (const vpc of newVPCs) {
      if (!oldVPCs.has(vpc)) {
        changes.push(
          config.route53.associateVPCWithHostedZone({ HostedZoneId: Id, VPC: vpc }).promise()
        );
      }
    }

    await Promise.all(changes);
  }

  return await getFullHostedZoneInfo({ Id });
};
