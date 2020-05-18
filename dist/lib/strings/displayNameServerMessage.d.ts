import { DomainRecords } from "../utils";
import { ZoneInfo } from "../aws";
export declare const displayNameServerMessage: (domain: string, nslookup: DomainRecords["ns"], zoneInfo: ZoneInfo["ns"]) => string;
