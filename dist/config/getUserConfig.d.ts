import { Configuration } from "./Configuration";
export declare const getUserConfig: ({ cwd, searchRoots }: {
    cwd: string;
    searchRoots: string[];
}) => Partial<Configuration>;
