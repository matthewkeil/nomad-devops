import Debug from "debug";
const debug = Debug("devops:lib:aws:cloudformation:getStackStatus");
import { CloudFormation } from "aws-sdk";
import { config } from "../../../config";

export const getStack = async ({
  StackName
}: {
  StackName: string;
}): Promise<undefined | CloudFormation.Stack> => {
  try {
    const response = await config.cf.describeStacks({ StackName }).promise();
    debug(response);
    if (response.Stacks) {
      return response.Stacks[0];
    }
  } catch (err) {
    debug("getStack anticipated failure if missing: ", err);
    return undefined;
  }
  throw new Error("unknown error occurred trying to get stack status");
};
