export declare const getStackOutputs: ({ StackName }: {
    StackName: string;
}) => Promise<import("aws-sdk/clients/cloudformation").Outputs>;
