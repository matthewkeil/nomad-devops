import { HostedZoneParams } from "./HostedZoneParams";
interface UpdateHostedZoneParams {
    Id: string;
    OldResourceProperties: HostedZoneParams;
    ResourceProperties: HostedZoneParams;
}
export declare const updateHostedZone: ({ Id, ResourceProperties, OldResourceProperties }: UpdateHostedZoneParams) => Promise<HostedZoneParams>;
export {};
