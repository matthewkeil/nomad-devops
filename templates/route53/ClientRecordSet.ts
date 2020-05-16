import { Route53, Fn } from "cloudform";
import { config } from "../../config";

export const ClientRecordSet = new Route53.RecordSet({
  Name: Fn.Ref("HostName"),
  Type: "A",
  HostedZoneId: Fn.ImportValue(`${config.PROJECT_NAME}-hosted-zone`),
  AliasTarget: {
    DNSName: Fn.GetAtt("ClientDistribution", "DomainName"),
    HostedZoneId: "Z2FDTNDATAQYW2"
  }
}).dependsOn("ClientDistribution");
