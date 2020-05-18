import { CloudFormation } from "aws-sdk";
export declare const handleStack: (params: CloudFormation.CreateStackInput | CloudFormation.UpdateStackInput) => Promise<CloudFormation.Stack>;
