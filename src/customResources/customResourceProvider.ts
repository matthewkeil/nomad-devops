import {
  CloudFormationCustomResourceHandler,
  CloudFormationCustomResourceResponse,
  CloudFormationCustomResourceEvent,
  Context
} from "aws-lambda";
export type ResourceHandler = (
  event: CloudFormationCustomResourceEvent,
  context: Context
) => Promise<CloudFormationCustomResourceResponse>;

import axios from "axios";
import { v4 } from "uuid";
import { recordSetProvider } from "./recordSetProvider";
import { hostedZoneProvider } from "./hostedZoneProvider";
import { certificateProvider } from "./certificateProvider";
import { certificateRequestProvider } from "./certificateRequestProvider";

const resourceProviders = {
  RecordSet: recordSetProvider,
  HostedZone: hostedZoneProvider,
  Certificate: certificateProvider,
  CertificateRequest: certificateRequestProvider
};
type ResourceType = keyof typeof resourceProviders;
const resourceTypes = new Set<ResourceType>(
  Object.keys(resourceProviders) as (keyof typeof resourceProviders)[]
);

const sendResponse = ({
  event,
  response
}: {
  event: CloudFormationCustomResourceEvent;
  response: CloudFormationCustomResourceResponse;
}) =>
  axios({
    url: event.ResponseURL,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Content-Encoding": "utf8"
    },
    data: JSON.stringify(response)
  });

export const handler: CloudFormationCustomResourceHandler = async (event, context) => {
  const RequestId = v4();
  const type = event.ResourceType.split("::").pop() as ResourceType;
  if (!resourceTypes.has(type)) {
    await sendResponse({
      event,
      response: {
        Status: "FAILED",
        Reason: "NomadDevops doesn't have that kind of custom resource",
        PhysicalResourceId: event.RequestType,
        StackId: event.StackId,
        RequestId,
        LogicalResourceId: event.LogicalResourceId
      }
    });
    return;
  }

  await sendResponse({ event, response: await resourceProviders[type](event, context) });
};
