import {
  Context,
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceUpdateEvent,
  CloudFormationCustomResourceDeleteEvent
} from "aws-lambda";
import { ResourceHandler } from "./customResourceProvider";

const createCertificateRequest = (
  event: CloudFormationCustomResourceCreateEvent,
  context: Context
) => {};
const updateCertificateRequest = (
  event: CloudFormationCustomResourceUpdateEvent,
  context: Context
) => {};
const deleteCertificateRequest = (
  event: CloudFormationCustomResourceDeleteEvent,
  context: Context
) => {};

export const certificateRequestProvider: ResourceHandler = async (event, context) => {
  switch (event.RequestType.toLowerCase()) {
    case "create":
      return createCertificateRequest(event as CloudFormationCustomResourceCreateEvent, context);
    case "update":
      return updateCertificateRequest(event as CloudFormationCustomResourceUpdateEvent, context);
    case "delete":
      return deleteCertificateRequest(event as CloudFormationCustomResourceDeleteEvent, context);
  }
};
