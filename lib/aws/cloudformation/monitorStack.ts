import Debug from "debug";
const debug = Debug("devops:lib:aws:cloudformation:monitorStack");
import { config } from "../../../config";
import { buildConsoleTable, output } from "../../utils";
import { getStackEvents, StackEvent } from "./getStackEvents";
import { createCertRecordSet } from "../route53";

const processListForTable = ({ StackName, list }: { StackName: string; list: StackEvent[] }) => {
  return list
    .filter(event => !(event.StatusReason || "").includes("Resource creation Initiated"))
    .map(event => {
      const ResourceType = event.ResourceType.split("::");
      return {
        StackName,
        ResourceName: event.LogicalResourceId,
        Timestamp: event.Timestamp.toLocaleTimeString(),
        Service: [...ResourceType].slice(-2)[0],
        Resource: [...ResourceType].pop(),
        Status: event.ResourceStatus.substring(0, 14)
      };
    });
};

export const monitorStack = ({ StackName }: { StackName: string }) => {
  return setInterval(async () => {
    const list = await getStackEvents({ StackName });
    const table = buildConsoleTable(processListForTable({ StackName, list }));
    output({
      table
    });

    const certCreationEvent = list.find(event => {
      if (
        event.ResourceType === "AWS::CertificateManager::Certificate" &&
        (event.StatusReason || "").includes("Content of DNS Record")
      ) {
        return true;
      }
    });

    if (certCreationEvent) {
      const dnsRecord = certCreationEvent.StatusReason.split(": ");
      const recordSetName = dnsRecord[2].split(",")[0];
      const recordSetValue = dnsRecord[4].substr(0, dnsRecord[4].length - 1);
      debug(
        `>>>\n>>>found request for SSL validation at CNAME of\n>>> ${recordSetName}\n>>> with a value of\n>>> ${recordSetValue}\n>>>`
      );

      const { StackResourceSummaries } = await config.cf
        .listStackResources({
          StackName
        })
        .promise();

      const { PhysicalResourceId: HostedZoneId } = StackResourceSummaries.find(
        resource => resource.ResourceType === "AWS::Route53::HostedZone"
      );

      await createCertRecordSet({
        HostedZoneId,
        recordSetName,
        recordSetValue
      });
    }
  }, 2000);
};
