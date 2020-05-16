import Debug from "debug";
const debug = Debug("devops:lib:aws:cloudformation:getStackEvents");
import { config } from "../../../config";

export interface StackEvent {
  Timestamp: Date;
  LogicalResourceId: string;
  ResourceType: string;
  ResourceStatus: string;
  StatusReason: string;
}

export const getStackEvents = async (
  params: AWS.CloudFormation.DescribeStackEventsInput
): Promise<StackEvent[]> => {
  const response = await config.cf.describeStackEvents(params).promise();
  debug(response);

  let updateOrCreateNotReached = true;
  const results = response.StackEvents.map(event => ({
    Timestamp: event.Timestamp,
    LogicalResourceId: event.LogicalResourceId,
    ResourceType: event.ResourceType,
    ResourceStatus: event.ResourceStatus,
    StatusReason: event.ResourceStatusReason
  })).filter(({ ResourceType, ResourceStatus }) => {
    if (!updateOrCreateNotReached) return false;

    if (
      ResourceType === "AWS::CloudFormation::Stack" &&
      (ResourceStatus === "UPDATE_IN_PROGRESS" || ResourceStatus === "CREATE_IN_PROGRESS")
    ) {
      updateOrCreateNotReached = false;
    }
    return true;
  });

  return results.reverse();
};
