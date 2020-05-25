import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG("devops:src:deployNomadDevops" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
import CF from "cloudform";
import { buildNomadDevopsTemplate } from "../templates";
import { handleStack } from "../lib";
import { config } from "../config";

export const deployNomadDevops = async () => {
  const Bucket = "nomad-devops";
  const Prefix = "resources/custom";
  const { Contents = [] } = await config.s3.listObjects({ Bucket, Prefix }).promise();
  const Key = Contents[0]?.Key;
  debug({ Bucket, Prefix, Key, Contents });
  if (!Key) throw new Error("could not locate custom resources");
  return await handleStack({
    StackName: "nomad-devops",
    Capabilities: ["CAPABILITY_NAMED_IAM"],
    TemplateBody: CF(
      await buildNomadDevopsTemplate({
        Bucket,
        Key
      })
    )
  });
};