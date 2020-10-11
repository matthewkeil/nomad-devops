import { Route53, Fn } from "cloudform";
import { config } from "../../config";
import { kebabCaseDomainName } from "../../lib";

export const NomadDevopsRecordSet = new Route53.RecordSet({
  Name: `nomad-devops.${config.ROOT_DOMAIN}`,
  Type: "A",
  HostedZoneId: Fn.ImportValue(`${kebabCaseDomainName(config.ROOT_DOMAIN)}-hosted-zone`),
  AliasTarget: {
    DNSName: Fn.GetAtt("DomainName", "DistributionDomainName"),
    HostedZoneId: Fn.GetAtt("DomainName", "DistributionHostedZoneId")
  }
}).dependsOn("DomainName");
