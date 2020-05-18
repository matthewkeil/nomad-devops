interface DeployStaticSiteParams {
    branch: string;
    stack?: string;
    domain?: string;
    buildPromise?: Promise<string[]>;
}
export declare const deployClient: ({ branch, domain, stack, buildPromise }: DeployStaticSiteParams) => Promise<import("aws-sdk/clients/cloudfront").Distribution>;
export {};
