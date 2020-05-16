import { config } from "../../../config";
import { DomainRecords } from "../../utils";
import { normalizeDomain } from "../../strings";
import { getHostedZoneForDomain } from "./getHostedZoneForDomain";

export type ZoneInfo = Partial<DomainRecords> & { HostedZoneId?: string };

export const getZoneInfoForDomain = async (rootDomain: string): Promise<ZoneInfo> => {
  const hostedZone = await getHostedZoneForDomain(rootDomain);
  if (!hostedZone) return;

  const records: ZoneInfo = {
    HostedZoneId: hostedZone.Id.split("/").pop()
  } as any;
  const types = ["NS", "SOA", "CNAME", "MX"] as const;
  const { ResourceRecordSets } = await config.route53
    .listResourceRecordSets({
      HostedZoneId: hostedZone.Id
    })
    .promise();
  const findRecord = (_type: typeof types[number]) =>
    ResourceRecordSets.filter(({ Type }) => Type === _type);

  for (const type of types) {
    const record = findRecord(type);
    if (!record.length) continue;
    switch (type) {
      case "NS":
        records.domain = normalizeDomain(record[0].Name);
        records.ns = new Set();
        for (const ns of record[0].ResourceRecords.map(ns => ns.Value))
          records.ns.add(normalizeDomain(ns));
        break;
      case "MX":
        records.mx = new Map();
        record[0].ResourceRecords.map(mx =>
          mx.Value.split(" ")
        ).map(([priority, exchange]: [string, string]) =>
          records.mx.set(normalizeDomain(exchange), +priority)
        );
        break;
      case "SOA":
        const [
          nsname,
          hostmaster,
          serial,
          refresh,
          retry,
          expire,
          minttl
        ] = record[0].ResourceRecords[0].Value.split(" ");
        records.soa = {
          nsname: normalizeDomain(nsname),
          hostmaster: normalizeDomain(hostmaster),
          serial: +serial,
          refresh: +refresh,
          retry: +retry,
          expire: +expire,
          minttl: +minttl
        };
        break;
      case "CNAME":
        if (!records.cname) records.cname = new Map();
        records.cname.set(record[0].Name.split(".").shift(), record[0].ResourceRecords[0].Value);
        break;
    }
  }
  return records;
};
