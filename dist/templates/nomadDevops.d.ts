export declare const buildNomadDevopsTemplate: () => Promise<{
    AWSTemplateFormatVersion: string;
    Description: string;
    Parameters: {
        NomadDevopsBucket: {
            Type: string;
            Default: string;
        };
        NomadDevopsHandlerKey: {
            Type: string;
            Default: string;
        };
    };
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
