import { DomainRecords } from "../../utils";
export declare type ZoneInfo = Partial<DomainRecords> & {
    HostedZoneId?: string;
};
export declare const getZoneInfoForDomain: (rootDomain: string) => Promise<ZoneInfo>;
