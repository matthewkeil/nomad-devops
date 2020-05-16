import Debug from "debug";
const debug = Debug("devops:lib:utils:getDomainRecords");
import { promises, SoaRecord, MxRecord } from "dns";
import { normalizeDomain } from "../strings";
const { resolveNs, resolveSoa, resolveMx, resolveCname } = promises;

export interface DomainRecords {
  domain: string;
  ns: Set<string>;
  soa: SoaRecord;
  mx: Map<MxRecord["exchange"], MxRecord["priority"]>;
  cname?: Map<string, string>;
}
export const getDomainRecords = async ({
  domain,
  getCname,
  getMx = false
}: {
  domain: string;
  getMx?: boolean;
  getCname?: string;
}): Promise<DomainRecords> => {
  const _rootDomain = domain + ".";
  const records = { domain: normalizeDomain(_rootDomain) } as DomainRecords;

  try {
    for (const ns of await resolveNs(_rootDomain)) {
      if (!records.ns) records.ns = new Set();
      records.ns.add(normalizeDomain(ns));
    }
    const soa = await resolveSoa(_rootDomain);
    records.soa = {
      ...soa,
      nsname: normalizeDomain(soa.nsname),
      hostmaster: normalizeDomain(soa.hostmaster)
    };
  } catch (err) {
    debug(err);
    return;
  }

  if (getMx) {
    records.mx = new Map();
    try {
      for (const mx of await resolveMx(_rootDomain)) records.mx.set(mx.exchange, mx.priority);
    } catch (err) {
      debug(err);
      records.mx = undefined;
    }
  }

  if (getCname) {
    records.cname = new Map();
    try {
      const subDomain = getCname.endsWith(".") ? getCname : getCname.concat(".");
      records.cname.set(
        subDomain.slice(0, -1),
        normalizeDomain((await resolveCname(subDomain + _rootDomain))[0])
      );
    } catch (err) {
      debug(err);
      records.cname = undefined;
    }
  }

  return records;
};
