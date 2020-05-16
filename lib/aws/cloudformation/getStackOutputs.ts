import Debug from "debug";
const debug = Debug("devops:lib:aws:cloudformation:getStackOutputs");
import { getStack } from "./getStack";

export const getStackOutputs = async ({ StackName }: { StackName: string }) => {
  const stack = await getStack({ StackName });
  debug(stack);
  if (stack) return stack.Outputs;
};
