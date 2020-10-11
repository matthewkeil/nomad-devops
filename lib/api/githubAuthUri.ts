import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import { create } from "simple-oauth2";
import { generate } from "randomstring";

export const handler = (_: APIGatewayEvent, __: Context, callback: Callback) => {
  try {
    const oauth2 = create({
      client: {
        id: process.env.OAUTH_CLIENT_ID,
        secret: process.env.OAUTH_CLIENT_SECRET
      },
      auth: {
        tokenHost: "https://github.com",
        tokenPath: "/login/oauth/access_token",
        authorizePath: "/login/oauth/authorize"
      }
    });

    const originPattern = process.env.OAUTH_ORIGIN || "";
    if (originPattern === "") {
      throw new Error("Will not run without a safe ORIGIN pattern in production.");
    }

    // Authorization uri definition
    const Location = oauth2.authorizationCode.authorizeURL({
      // eslint-disable-next-line @typescript-eslint/camelcase
      redirect_uri: process.env.REDIRECT_URL,
      scope: "repo,user",
      state: generate(32)
    });

    callback(null, {
      statusCode: 302,
      headers: {
        Location
      }
    });
  } catch (err) {
    callback(err);
  }
};
