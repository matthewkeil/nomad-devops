import { Route53 } from "cloudform";
import { config } from "../../config";

export const HostedZone = new Route53.HostedZone({
  Name: config.ROOT_DOMAIN,
  HostedZoneConfig: {
    Comment: `HostedZone for ${config.ROOT_DOMAIN}`
  }
});
