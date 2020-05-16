import { v4 } from "uuid";
import {
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceUpdateEvent,
  CloudFormationCustomResourceDeleteEvent,
  CloudFormationCustomResourceHandler,
  CloudFormationCustomResourceResponse,
  Context,
  CloudFormationCustomResourceEvent
} from "aws-lambda";
import { config } from "../../../../config";

const nomadHouseResourceTypes = new Set(["Certificate", "HostedZone", "RecordSet"]);

const createCustomResource = ({}: {
  type: string;
  event: CloudFormationCustomResourceCreateEvent;
  context: Context;
}) => {};
const updateCustomResource = ({}: {
  type: string;
  event: CloudFormationCustomResourceUpdateEvent;
  context: Context;
}) => {};
const deleteCustomResource = ({}: {
  type: string;
  event: CloudFormationCustomResourceDeleteEvent;
  context: Context;
}) => {};

const sendResponse = async ({}: {
  event: CloudFormationCustomResourceEvent;
  context: Context;
  response: CloudFormationCustomResourceResponse;
}) => {};

export const handler: CloudFormationCustomResourceHandler = async (event, context) => {
  const RequestId = v4();
  const type = event.ResourceType.split("::").pop();
  if (!nomadHouseResourceTypes.has(type)) {
    sendResponse({
      event,
      context,
      response: {
        Status: "FAILED",
        Reason: "NomadDevops doesn't have that kind of custom resource",
        PhysicalResourceId: event.RequestType,
        StackId: event.StackId,
        RequestId,
        LogicalResourceId: event.LogicalResourceId
      }
    });
  }

  switch (event.RequestType.toLowerCase()) {
    case "create":
      createCustomResource({
        type,
        event: event as CloudFormationCustomResourceCreateEvent,
        context
      });
    case "update":
      updateCustomResource({
        type,
        event: event as CloudFormationCustomResourceUpdateEvent,
        context
      });
    case "delete":
      deleteCustomResource({
        type,
        event: event as CloudFormationCustomResourceDeleteEvent,
        context
      });
  }
};
