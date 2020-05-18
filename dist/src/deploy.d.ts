#!/usr/bin/env node
interface DeployParams {
    branch?: string;
    subDomain?: string;
    artifacts?: string[];
    framework?: string;
}
export declare const deploy: (params: DeployParams) => Promise<void>;
export {};
