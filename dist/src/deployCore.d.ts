interface CoreStackParam {
    rootDomain: string;
    stackName: string;
}
export declare const deployCore: ({ rootDomain, stackName }: CoreStackParam) => Promise<import("aws-sdk/clients/cloudformation").Stack>;
export {};
