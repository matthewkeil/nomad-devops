import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG("devops:src:deployClient" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
import { resolve } from "path";
import {
  output,
  createCacheInvalidation,
  bucketExists,
  emptyBucket,
  handleStack,
  uploadDirectory,
  getStackName
} from "../lib";
import { clientTemplate } from "../templates/client";

interface DeployStaticSiteParams {
  branch: string;
  stack?: string;
  domain?: string;
  buildPromise?: Promise<string[]>;
}

export const deployClient = async ({
  branch,
  domain,
  stack = "client",
  buildPromise = Promise.resolve([""])
}: DeployStaticSiteParams) => {
  debug("Bucket name: " + domain);
  let stackPromise: Promise<any>;
  if (await bucketExists({ Bucket: domain })) {
    output({ log: `found existing artifacts bucket` });
    stackPromise = emptyBucket({ Bucket: domain });
  } else {
    const StackName = getStackName({ branch, stack });
    debug("StackName: " + StackName);
    const TemplateBody = clientTemplate({ branch, StackName });
    stackPromise = handleStack({
      StackName,
      TemplateBody
    });
  }

  const [artifacts] = await Promise.all([buildPromise, stackPromise]);
  await uploadDirectory({ Bucket: domain, localPath: resolve(process.cwd(), ...artifacts) });
  return await createCacheInvalidation({ Bucket: domain });
};
