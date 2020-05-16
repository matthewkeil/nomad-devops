import {
    Context,
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceUpdateEvent,
    CloudFormationCustomResourceDeleteEvent
  } from "aws-lambda";
  import { ResourceHandler } from "./customResourceProvider";
  
  const createRecordSet = (event: CloudFormationCustomResourceCreateEvent, context: Context) => {};
  const updateRecordSet = (event: CloudFormationCustomResourceUpdateEvent, context: Context) => {};
  const deleteRecordSet = (event: CloudFormationCustomResourceDeleteEvent, context: Context) => {};
  
  export const recordSetProvider: ResourceHandler = async (event, context) => {
    switch (event.RequestType.toLowerCase()) {
      case "create":
        return createRecordSet(event as CloudFormationCustomResourceCreateEvent, context);
      case "update":
        return updateRecordSet(event as CloudFormationCustomResourceUpdateEvent, context);
      case "delete":
        return deleteRecordSet(event as CloudFormationCustomResourceDeleteEvent, context);
    }
  };
  