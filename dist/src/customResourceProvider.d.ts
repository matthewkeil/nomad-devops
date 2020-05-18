import { CloudFormationCustomResourceHandler, CloudFormationCustomResourceResponse, CloudFormationCustomResourceEvent, Context } from "aws-lambda";
export declare type ResourceHandler = (event: CloudFormationCustomResourceEvent, context: Context) => Promise<CloudFormationCustomResourceResponse>;
export declare const handler: CloudFormationCustomResourceHandler;
