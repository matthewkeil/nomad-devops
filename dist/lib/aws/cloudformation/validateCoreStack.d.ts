import { CloudFormation } from "aws-sdk";
interface ValidateCoreStackParams {
    corePromise: Promise<CloudFormation.Stack>;
    rootDomain: string;
    domain: string;
}
export declare const validateCoreStack: ({ domain, rootDomain, corePromise }: ValidateCoreStackParams) => Promise<boolean>;
export {};
