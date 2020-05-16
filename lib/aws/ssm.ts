import { SSM } from "aws-sdk";
import { config } from "../../config";

export const storeSecretString = async ({ Name }: { Name?: string }) => {
  let parameter: SSM.GetParameterResult;

  try {
    parameter = await config.ssm.getParameter({ Name, WithDecryption: true }).promise();
  } catch (err) {
    if (err.code !== "ParameterNotFound") {
      throw err;
    }
  }

  const oldValue = parameter.Parameter.Value;
  const newValue = process.env[Name];

  if (oldValue && newValue !== oldValue) {
    console.log(oldValue, newValue);
    console.log("local secret is different from online secret. updating");
  }

  // const results = await ssm.putParameter({
  //     Name,
  //     Value,
  //     Type: 'SecureString'
  // }).promise();
};
