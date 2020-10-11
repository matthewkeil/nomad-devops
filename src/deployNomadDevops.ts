import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG("devops:src:deployNomadDevops" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
import CF from "cloudform";
import { buildNomadDevops } from "../templates";
import { handleStack, updateStack } from "../lib";
import { config } from "../config";

export const deployNomadDevops = async () => {
  const Bucket = "nomad-devops-0";
  // const Prefix = "resources/custom";
  // const { Contents = [] } = await config.s3.listObjects({ Bucket, Prefix }).promise();

  // const Key = Contents[0]?.Key;

  // debug({ Bucket, Prefix, Key, Contents });

  // if (!Key) throw new Error("could not locate custom resources");
  const template = await buildNomadDevops({
    Bucket
  });


  return await updateStack({
    StackName: "nomad-devops",
    Capabilities: ["CAPABILITY_NAMED_IAM"],
    TemplateBody: CF(template)
  });
};
