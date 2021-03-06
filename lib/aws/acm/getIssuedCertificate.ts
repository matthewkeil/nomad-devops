import { ACM } from "aws-sdk";
import { config } from "../../../config";

const organizeOptions = (Certificate: ACM.CertificateDetail) =>
  Certificate.DomainValidationOptions.filter(
    opt => opt.DomainName === Certificate.DomainName && opt.ValidationMethod === "DNS"
  ).reduce(
    (all, opt) => {
      switch (opt.ValidationStatus) {
        case "PENDING_VALIDATION":
          all.pending = all.pending ? all.pending.concat(opt) : [opt];
          break;
        case "SUCCESS":
          all.success = all.success ? all.success.concat(opt) : [opt];
          break;
        case "FAILED":
          all.failed = all.failed ? all.failed.concat(opt) : [opt];
          break;
      }
      return all;
    },
    {} as {
      failed?: ACM.DomainValidation[];
      success?: ACM.DomainValidation[];
      pending?: ACM.DomainValidation[];
    }
  );

async function* pollStatus(arn: string) {
  while (true) {
    const { Certificate } = await config.acm.describeCertificate({ CertificateArn: arn }).promise();
    const options = organizeOptions(Certificate);
    // const pending = !!options.pending?.length;
    // const failed = !!options.failed?.length;
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
