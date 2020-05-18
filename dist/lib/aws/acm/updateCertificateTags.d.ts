import { ACM } from "aws-sdk";
export declare const updateCertificateTags: ({ CertificateArn, Tags }: {
    CertificateArn: string;
    Tags: ACM.TagList;
}) => Promise<[{}, {}]>;
