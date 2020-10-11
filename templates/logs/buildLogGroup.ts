import { Logs, Fn, IntrinsicFunction } from "cloudform";

export const buildLogGroup = (lambdaRef: IntrinsicFunction) =>
  new Logs.LogGroup({
    LogGroupName: Fn.Join("/", ["/aws/lambda", lambdaRef]),
    RetentionInDays: 7
  });
