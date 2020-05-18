import { ACM } from "aws-sdk";
export declare const getCertificateForDomain: (domain: string) => Promise<ACM.DescribeCertificateResponse>;
