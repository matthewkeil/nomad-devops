interface StackNameParameters {
    stack: string;
    branch?: string;
}
export declare const getStackName: ({ stack, branch }: StackNameParameters) => string;
export {};
