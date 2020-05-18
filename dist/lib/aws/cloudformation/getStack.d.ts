import { CloudFormation } from "aws-sdk";
export declare const getStack: ({ StackName }: {
    StackName: string;
}) => Promise<undefined | CloudFormation.Stack>;
