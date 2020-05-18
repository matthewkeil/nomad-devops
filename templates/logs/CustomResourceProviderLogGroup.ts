import { Logs, Fn } from "cloudform";

export const CustomResourceProviderLogGroup = new Logs.LogGroup({
  LogGroupName: Fn.Join("/", ["/aws/lambda", Fn.Ref("CustomResourceProvider")]),
  RetentionInDays: 7
});
