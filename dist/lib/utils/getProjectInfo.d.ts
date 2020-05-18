interface FrameworkInfo {
    distLocation: string[];
    commands: string[];
}
declare type BuildInfo = FrameworkInfo & {
    framework?: string;
};
export declare const getProjectDetails: (framework?: string) => BuildInfo;
export {};
