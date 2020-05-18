import CF from "cloudform";
import { buildNomadDevopsTemplate } from "../templates";
import { handleStack } from "../lib";

export const deployNomadDevops = async () => {
  return await handleStack({
    StackName: "nomad-devops",
    Capabilities: ["CAPABILITY_NAMED_IAM"],
    TemplateBody: CF(await buildNomadDevopsTemplate())
  });
};
