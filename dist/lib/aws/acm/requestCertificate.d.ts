import { ACM } from "aws-sdk";
export declare const requestCertificate: ({ DomainName, IdempotencyToken, Tags, DomainValidationOptions, Options, SubjectAlternativeNames }: Partial<ACM.RequestCertificateRequest>) => Promise<ACM.CertificateDetail>;
