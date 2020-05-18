import { HostedZoneParams } from "./HostedZoneParams";
interface CreateHostedZoneParams {
    RequestId: string;
    ResourceProperties: Partial<HostedZoneParams>;
}
export declare const createHostedZone: ({ RequestId, ResourceProperties }: CreateHostedZoneParams) => Promise<HostedZoneParams>;
export {};
