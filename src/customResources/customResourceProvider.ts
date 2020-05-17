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
  ResponseURL,
  response
}: {
  ResponseURL: string;
  response: CloudFormationCustomResourceResponse;
}) =>
  axios({
    url: ResponseURL,
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
  const { ResponseURL, StackId, LogicalResourceId } = event;
  if (!resourceTypes.has(type)) {
    await sendResponse({
      ResponseURL,
      response: {
        Status: "FAILED",
        Reason: "NomadDevops doesn't have that kind of custom resource",
        PhysicalResourceId: LogicalResourceId,
        StackId,
        RequestId,
        LogicalResourceId
      }
    });
    return;
  }

  await sendResponse({ ResponseURL, response: await resourceProviders[type](event, context) });
};
