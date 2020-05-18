export declare const createCacheInvalidation: ({ DistributionId, Bucket }: {
    Bucket?: string;
    DistributionId?: string;
}) => Promise<import("aws-sdk/clients/cloudfront").Distribution>;
