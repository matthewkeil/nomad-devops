import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG("devops:lib:aws:route53:getFullHostedZoneInfo" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
import { Route53 } from "aws-sdk";
import { config } from "../../../config";

export const getFullHostedZoneInfo = async ({ Id }: { Id: string }) => {
  const { HostedZone, VPCs } = await config.route53.getHostedZone({ Id }).promise();
  const Name = HostedZone.Name;
  const HostedZoneConfig = HostedZone.Config;

  let HostedZoneTags: Route53.TagList;
  try {
    const { ResourceTagSet } = await config.route53
      .listTagsForResource({ ResourceId: Id, ResourceType: "hostedzone" })
      .promise();
    HostedZoneTags = ResourceTagSet?.Tags;
  } catch {}

  let QueryLoggingConfig: Route53.QueryLoggingConfig;
  try {
    const queryConfig = await config.route53.getQueryLoggingConfig({ Id }).promise();
    QueryLoggingConfig = queryConfig.QueryLoggingConfig;
  } catch {}

  return {
    Name,
    HostedZoneConfig,
    HostedZoneTags,
    QueryLoggingConfig,
    VPCs
  };
};
