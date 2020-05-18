interface CoreTemplateParams {
    stackName: string;
    hostedZone?: string;
    certificate?: string;
    cognito?: boolean;
    gSuite?: boolean;
}
export declare const buildCoreTemplate: ({ stackName, hostedZone, certificate, cognito, gSuite }: CoreTemplateParams) => Promise<{
    Description: string;
    Parameters: {
        RootDomain: {
            Description: string;
            Type: string;
            Default: string;
        };
    };
    Resources: {};
    Outputs: {
        HostedZone: {
            Description: string;
            Value: import("cloudform").IntrinsicFunction;
            Export: {
                Name: string;
            };
        };
        Certificate: {
            Description: string;
            Value: import("cloudform").IntrinsicFunction;
            Export: {
                Name: string;
            };
        };
    };
}>;
export {};
