interface CertRecordSetParams {
    HostedZoneId: string;
    recordSetName: string;
    recordSetValue: string;
}
export declare const createCertRecordSet: ({ HostedZoneId, recordSetName, recordSetValue }: CertRecordSetParams) => Promise<import("aws-sdk/lib/request").PromiseResult<import("aws-sdk/clients/route53").ChangeResourceRecordSetsResponse, import("aws-sdk").AWSError>>;
export {};
