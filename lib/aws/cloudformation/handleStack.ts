import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG("devops:lib:aws:cloudformation:handleStack" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
import { CloudFormation } from "aws-sdk";
import { getStack } from "./getStack";
import { createStack } from "./createStack";
import { updateStack } from "./updateStack";
import { deleteStack } from "./deleteStack";
import { monitorStack } from "./monitorStack";
import { output } from "../../utils";

export const handleStack = async (
  params: CloudFormation.CreateStackInput | CloudFormation.UpdateStackInput
) => {
  /**
   *
   * Cloudformation does not allow some stack states to be updated and thus
   * the stack must be deleted and recreated. First checks to see if stack exists,
   * if not creates it. If stack exists check status to see if can be updated, if
   * not, delete and recreate. If no issues go ahead and upadte the stack.
   *
   */
  const status = await getStack(params);
  const { StackStatus } = status || {};
  const interval = monitorStack(params);
  try {
    switch (StackStatus) {
      case undefined:
        output({ log: `${params.StackName} doest not exist, creating it` });
        await createStack(params);
        break;
      case "ROLLBACK_COMPLETE":
      case "ROLLBACK_FAILED":
      case "UPDATE_ROLLBACK_FAILED":
      case "CREATE_FAILED":
        output({ log: `${params.StackName} is in a failed state. deleting first` });
        await deleteStack(params);
        output({ log: "delete complete. rebuilding stack" });
        await createStack(params);
        break;
      default:
        await updateStack(params);
        break;
    }
  } catch (err) {
    debug(err);
  } finally {
    clearInterval(interval);
    return await getStack(params);
  }
};
