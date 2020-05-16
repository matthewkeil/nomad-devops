import Debug from "debug";
const debug = Debug("devops:lib:aws:cloudformation:createStack");
import { config } from "../../../config";

export const createStack = async (params: AWS.CloudFormation.CreateStackInput) => {
  const response = await config.cf.createStack(params).promise();
  debug(response);
  const results = await config.cf
    .waitFor("stackCreateComplete", {
      StackName: response.StackId
    })
    .promise();
  debug(results);
};
