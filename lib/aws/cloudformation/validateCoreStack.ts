import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG("devops:lib:aws:cloudformation:validateCoreStack" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
import { CloudFormation } from "aws-sdk";
import { getZoneInfoForDomain } from "../route53";
import { getDomainRecords, output } from "../../utils";
import { displayNameServerMessage } from "../../strings";

interface ValidateCoreStackParams {
  corePromise: Promise<CloudFormation.Stack>;
  rootDomain: string;
  domain: string;
}
export const validateCoreStack = async ({
  domain,
  rootDomain,
  corePromise
}: ValidateCoreStackParams) => {
  const coreStack = await corePromise;
  debug("coreStack: ", coreStack);
  /**: Promise<CloudFormation.Stack>
   * check that nslookup return name servers that are assigned
   * by Route53 HostedZone to verify setup is correct
   */
  const zonePromise = getZoneInfoForDomain(rootDomain);
  const recordPromise = getDomainRecords({ domain });
  const [zoneInfo, records] = await Promise.all([zonePromise, recordPromise]);
  let badNs = false;
  for (const ns of records.ns) if (!zoneInfo.ns.has(ns)) badNs = true;
  if (badNs) {
    output({ log: displayNameServerMessage(domain, zoneInfo.ns, records.ns) });
  }
  return !badNs;
};
