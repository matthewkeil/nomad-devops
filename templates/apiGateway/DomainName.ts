import { ApiGateway, Fn } from "cloudform";
import { config } from "../../config";

export const DomainName = new ApiGateway.DomainName({
  DomainName: `nomad-devops.${config.ROOT_DOMAIN}`,
  CertificateArn: Fn.ImportValue("nomad-house-certificate")
});
