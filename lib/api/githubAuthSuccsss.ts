import { APIGatewayEvent, Context, Callback } from "aws-lambda";

export const handler = (_: APIGatewayEvent, __: Context, callback: Callback) => {
  callback(null, { statusCode: 200, headers: { "Content-Type": "text/plain" }, body: "" });
};
