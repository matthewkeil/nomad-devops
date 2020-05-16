import { config } from "../../config";

export const apiGatewayAccountExists = async () => {
  try {
    const { cloudwatchRoleArn } = await config.apiGateway.getAccount().promise();
    const RoleName = cloudwatchRoleArn.split("/")[1];
    await config.iam.getRole({ RoleName }).promise();
    return true;
  } catch (err) {
    if (err.code === "NoSuchEntity") return false;
  }
};
