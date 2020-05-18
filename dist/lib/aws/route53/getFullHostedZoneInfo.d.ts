import { Route53 } from "aws-sdk";
export declare const getFullHostedZoneInfo: ({ Id }: {
    Id: string;
}) => Promise<{
    Name: string;
    HostedZoneConfig: Route53.HostedZoneConfig;
    HostedZoneTags: Route53.TagList;
    QueryLoggingConfig: Route53.QueryLoggingConfig;
    VPCs: Route53.VPCs;
}>;
