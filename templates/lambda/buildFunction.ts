import { Lambda, Fn, IntrinsicFunction } from "cloudform";
import { toKebabCase } from "../../lib";

export const buildLambdaFunction = ({
  name,
  Key,
  Bucket,
  roleName,
  dlq,
  Handler = "index.handler"
}: {
  name: string;
  Bucket: string;
  Key: string;
  roleName: string;
  Handler?: string;
  dlq?: IntrinsicFunction;
}) => {
  const template = new Lambda.Function({
    FunctionName: `nomad-devops-${toKebabCase(name)}`,
    Runtime: "nodejs12.x",
    Code: {
      S3Bucket: Bucket,
      S3Key: Key
    },
    Role: Fn.GetAtt(roleName, "Arn"),
    Handler,
    MemorySize: 128,
    Environment: {
      Variables: {
        DEBUG: process.env.DEBUG
      }
    }
  }).dependsOn(roleName);

  if (dlq) {
    template.Properties.DeadLetterConfig = {
      TargetArn: dlq
    };
  }

  return template;
};
