import { config } from "../../config";
import { normalizeDomain } from "../strings";

const extractSubdomains = (domain, base) => {
  const result = normalizeDomain(domain).replace(normalizeDomain(base), "");
  return result.endsWith(".") ? result.slice(0, -1) : result;
};

export const getCertForDomain = async (domain: string) => {
  const { CertificateSummaryList } = await config.acm.listCertificates().promise();
  const certSummary = CertificateSummaryList.find(({ DomainName }) =>
    normalizeDomain(domain).endsWith(normalizeDomain(DomainName))
  );
  if (certSummary) {
    const { CertificateArn } = certSummary;
    const { Certificate } = await config.acm.describeCertificate({ CertificateArn }).promise();
    const subDomain = extractSubdomains(domain, Certificate.DomainName);

    if (subDomain !== "") {
      if (Certificate.SubjectAlternativeNames && Certificate.SubjectAlternativeNames.length) {
        const match = Certificate.SubjectAlternativeNames.find(altName => {
          const altSubDomain = extractSubdomains(altName, Certificate.DomainName);
          if (altSubDomain === "*") return true;
          if (altSubDomain === subDomain) return true;
        });
        if (match) return Certificate;
      }
      return;
    }

    return Certificate;
  }
};
