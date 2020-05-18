import { ACM } from "aws-sdk";
export declare const deleteCertificate: ({ CertificateArn }: Partial<ACM.DeleteCertificateRequest>) => Promise<void>;
