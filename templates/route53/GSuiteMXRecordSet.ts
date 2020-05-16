import { Route53, Fn } from "cloudform";
import { config } from "../../config";

export const GSuiteMXRecordSet = new Route53.RecordSet({
  Name: config.ROOT_DOMAIN.endsWith(".") ? config.ROOT_DOMAIN : `${config.ROOT_DOMAIN}.`,
  HostedZoneId: Fn.Ref("HostedZone"),
  Type: "MX",
  TTL: "300",
  ResourceRecords: [
    "1 aspmx.l.google.com.",
    "5 alt1.aspmx.l.google.com.",
    "5 alt2.aspmx.l.google.com.",
    "10 aspmx2.googlemail.com.",
    "10 aspmx3.googlemail.com."
  ]
}).dependsOn("HostedZone");
