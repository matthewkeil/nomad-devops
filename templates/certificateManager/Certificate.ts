import { CertificateManager } from "cloudform";
import { config } from "../../config";

export const Certificate = new CertificateManager.Certificate({
  DomainName: config.ROOT_DOMAIN,
  SubjectAlternativeNames: [`*.${config.ROOT_DOMAIN}`],
  ValidationMethod: "DNS"
});
