/// <reference types="node" />
import { SoaRecord, MxRecord } from "dns";
export interface DomainRecords {
    domain: string;
    ns: Set<string>;
    soa: SoaRecord;
    mx?: Map<MxRecord["exchange"], MxRecord["priority"]>;
    cname?: Map<string, string>;
}
export declare const getDomainRecords: ({ domain, getCname, getMx }: {
    domain: string;
    getMx?: boolean;
    getCname?: string;
}) => Promise<DomainRecords>;
