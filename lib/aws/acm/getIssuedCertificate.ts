import { ACM } from "aws-sdk";
import { config } from "../../../config";

const organizeOptions = ({
  Certificate,
  DomainValidationOptions
}: {
  Certificate: ACM.CertificateDetail;
  DomainValidationOptions: ACM.DomainValidationList;
}) =>
  DomainValidationOptions.filter(opt => {
    return opt.DomainName === Certificate.DomainName && opt.ValidationMethod === "DNS";
  }).reduce(
    (all, opt) => {
      switch (opt.ValidationStatus) {
        case "PENDING_VALIDATION":
          all.pending.push(opt);
          break;
        case "SUCCESS":
          all.success.push(opt);
          break;
        case "FAILED":
          all.failed.push(opt);
          break;
      }
      return all;
    },
    {
      failed: [] as ACM.DomainValidation[],
      success: [] as ACM.DomainValidation[],
      pending: [] as ACM.DomainValidation[]
    }
  );

async function* pollStatus(arn: string) {
  while (true) {
    const { Certificate } = await config.acm.describeCertificate({ CertificateArn: arn }).promise();
    yield Certificate.Status;
  }
}

export const getIssuedCertificate = async ({
  CertificateArn
}: {
  CertificateArn: string;
}): Promise<string> =>
  new Promise(async resolve => {
    const poller = pollStatus(CertificateArn);
    const interval = setInterval(async () => {
      const { value: status = "" } = await poller.next();
      switch (status) {
        case "PENDING_VALIDATION":
          break;
        default:
          clearInterval(interval);
          void poller.return();
          resolve(status);
      }
    }, 1000);
  });
