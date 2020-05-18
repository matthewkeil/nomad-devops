interface TemplateParams {
    branch: string;
    StackName: string;
    allowNaked?: boolean;
}
export declare const clientTemplate: ({ branch, StackName }: TemplateParams) => string;
export {};
