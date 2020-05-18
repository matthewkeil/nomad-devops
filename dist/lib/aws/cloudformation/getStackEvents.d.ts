export interface StackEvent {
    Timestamp: Date;
    LogicalResourceId: string;
    ResourceType: string;
    ResourceStatus: string;
    StatusReason: string;
}
export declare const getStackEvents: (params: AWS.CloudFormation.DescribeStackEventsInput) => Promise<StackEvent[]>;
