import { Lambda, Fn, IntrinsicFunction, Refs } from "cloudform";

export const buildLambdaPermission = (functionRef: IntrinsicFunction) =>
  new Lambda.Permission({
    Principal: "apigateway.amazonaws.com",
    Action: "lambda:Invoke",
    FunctionName: functionRef,
    SourceArn: Fn.Join("", ["arn:aws:execute-api:", Refs.Region, ":", Refs.AccountId, ":*/*"])
  }).dependsOn("RestApi");
