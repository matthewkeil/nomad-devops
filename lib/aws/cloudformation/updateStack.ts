import Debug from "debug";
const debug = Debug("devops:lib:aws:cloudformation:updateStack");
import { config } from "../../../config";

export const updateStack = async (params: AWS.CloudFormation.UpdateStackInput) => {
  const response: any = await config.cf.updateStack(params).promise();
  debug(response);
  const results = await config.cf
    .waitFor("stackUpdateComplete", {
      StackName: response.StackId
    })
    .promise();
  debug(results);
};
