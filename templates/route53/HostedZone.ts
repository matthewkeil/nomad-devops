import { Fn } from "cloudform";
import { config } from "../../config";

export const HostedZone = {
  Type: "Custom::HostedZone",
  Properties: {
    ServiceToken: Fn.ImportValue("NomadDevopsCustomResourceProvider"),
    Name: config.ROOT_DOMAIN,
    HostedZoneConfig: {
      Comment: `HostedZone for ${config.ROOT_DOMAIN}`
    }
  }
};
