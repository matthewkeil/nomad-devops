import {
  Context,
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceUpdateEvent,
  CloudFormationCustomResourceDeleteEvent
} from "aws-lambda";
import { ResourceHandler } from "./customResourceProvider";

const createCertificate = (event: CloudFormationCustomResourceCreateEvent, context: Context) => {};
const updateCertificate = (event: CloudFormationCustomResourceUpdateEvent, context: Context) => {};
const deleteCertificate = (event: CloudFormationCustomResourceDeleteEvent, context: Context) => {};

export const certificateProvider: ResourceHandler = async (event, context) => {
  switch (event.RequestType.toLowerCase()) {
    case "create":
      return createCertificate(event as CloudFormationCustomResourceCreateEvent, context);
    case "update":
      return updateCertificate(event as CloudFormationCustomResourceUpdateEvent, context);
    case "delete":
      return deleteCertificate(event as CloudFormationCustomResourceDeleteEvent, context);
  }
};
