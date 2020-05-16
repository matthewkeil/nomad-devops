import { config } from "../../../config";

interface CertRecordSetParams {
  HostedZoneId: string;
  recordSetName: string;
  recordSetValue: string;
}

export const createCertRecordSet = async ({
  HostedZoneId,
  recordSetName,
  recordSetValue
}: CertRecordSetParams) => {
  const { ResourceRecordSets } = await config.route53
    .listResourceRecordSets({
      HostedZoneId,
      StartRecordName: recordSetName,
      StartRecordType: "CNAME"
    })
    .promise();

  // TODO: what is this actually checking for?? need to look deeper for meaningful telemetry
  if (!!ResourceRecordSets.length) {
    return;
  }

  return config.route53
    .changeResourceRecordSets({
      HostedZoneId,
      ChangeBatch: {
        Changes: [
          {
            Action: "UPSERT",
            ResourceRecordSet: {
              Name: recordSetName,
              ResourceRecords: [
                {
                  Value: recordSetValue
                }
              ],
              TTL: 60,
              Type: "CNAME"
            }
          }
        ],
        Comment: "RecordSet for SSL Certificate Validation"
      }
    })
    .promise();
};
