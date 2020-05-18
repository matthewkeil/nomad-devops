import { Lambda, Fn } from "cloudform";

export const CustomResourceProvider = new Lambda.Function({
  Description: "Nomad Devops CloudFormation Custom::Respource Provider",
  FunctionName: "nomad-devops-custom-resource-provider",
  Role: Fn.GetAtt("CustomResourceProviderRole", "Arn"),
  Runtime: "nodejs10.x",
  Code: {
    S3Bucket: Fn.Ref("NomadDevopsBucket"),
    S3Key: Fn.Ref("NomadDevopsHandlerKey")
  },
  Handler: "index.handler",
  MemorySize: 128
}).dependsOn("CustomResourceProviderPolicy");
