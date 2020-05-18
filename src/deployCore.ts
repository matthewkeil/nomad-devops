import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG("devops:src:deployCore" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
import cloudform from "cloudform";
import { buildCoreTemplate } from "../templates";
import {
  getCertificateForDomain,
  getZoneInfoForDomain,
  handleStack,
  getDomainRecords,
  output,
  getStack
} from "../lib";
import { deployNomadDevops } from "./deployNomadDevops";

interface CoreStackParam {
  rootDomain: string;
  stackName: string;
}
export const deployCore = async ({ rootDomain, stackName }: CoreStackParam) => {
  const nomadDevopsStack = await getStack({ StackName: "nomad-devops" });
  if (!nomadDevopsStack) await deployNomadDevops();
  debug("nomadDevopsStack : ", nomadDevopsStack);

  const [nslookup, zoneInfo, certificate] = await Promise.all([
    getDomainRecords({
      domain: rootDomain,
      getMx: true
    }),
    getZoneInfoForDomain(rootDomain),
    getCertificateForDomain(rootDomain)
  ]);
  debug(nslookup, zoneInfo, certificate);

  if (!certificate) {
    output({ log: "deploying ssl/tls certificate. process will take 15-20 minutes" });
  }

  const template = await buildCoreTemplate({
    stackName,
    hostedZone: (zoneInfo || {}).HostedZoneId,
    certificate: certificate?.Certificate ? certificate.Certificate.CertificateArn : undefined,
    cognito: false
  });

  return handleStack({
    StackName: stackName,
    TemplateBody: cloudform(template),
    Capabilities: ["CAPABILITY_NAMED_IAM"]
  });
};
