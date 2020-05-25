export declare const buildNomadDevopsTemplate: ({ Key, Bucket }: {
    Key: string;
    Bucket: string;
}) => Promise<{
    AWSTemplateFormatVersion: string;
    Description: string;
    Resources: {
        CustomResourceProvider: import("cloudform-types/types/lambda/function").default;
        CustomResourceProviderRole: import("cloudform-types/types/iam/role").default;
        CustomResourceProviderPolicy: import("cloudform-types/types/iam/policy").default;
        CustomResourceProviderLogGroup: import("cloudform-types/types/logs/logGroup").default;
    };
    Outputs: {
        CustomResourceProvider: {
            Description: string;
            Value: import("cloudform").IntrinsicFunction;
            Export: {
                Name: string;
            };
        };
    };
}>;
