import { ACM } from "aws-sdk";
interface UpdateCertificateParams {
    CertificateArn: string;
    Options?: ACM.CertificateOptions;
    Tags?: ACM.TagList;
}
export declare const updateCertificate: ({ CertificateArn, Options, Tags }: UpdateCertificateParams) => Promise<ACM.CertificateDetail>;
export {};
