import Debug from "debug";
const debug = Debug("devops:lib:aws:cloudformation:deleteStack");
import { config } from "../../../config";
import { emptyStackBuckets } from "./emptyStackBuckets";

interface DeleteStackParam {
  StackName: string;
  emptyBuckets?: boolean;
}

export const deleteStack = async ({ StackName, emptyBuckets }: DeleteStackParam) => {
  if (emptyBuckets) {
    debug("attempting to empty stack buckets");
    await emptyStackBuckets({ StackName });
  }
  const response = await config.cf.deleteStack({ StackName }).promise();
  debug(response);
  const results = await config.cf
    .waitFor("stackDeleteComplete", {
      StackName
    })
    .promise();
  debug(results);
};
