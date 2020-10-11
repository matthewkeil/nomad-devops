import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import { create } from "simple-oauth2";

const oauthProvider = "github";

export const handler = async (event: APIGatewayEvent, _: Context, callback: Callback) => {
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
    if (!originPattern.length) {
      throw new Error("Will not run without a safe ORIGIN pattern in production.");
    }

    const code = event.queryStringParameters?.code;

    const options = {
      code
    };

    // if (oauthProvider === "gitlab") {
    //   options.client_id = process.env.OAUTH_CLIENT_ID;
    //   options.client_secret = process.env.OAUTH_CLIENT_SECRET;
    //   options.grant_type = "authorization_code";
    //   options.redirect_uri = process.env.REDIRECT_URL;
    // }

    let message;
    let content;
    try {
      const result = await oauth2.authorizationCode.getToken(options as any);
      const token = oauth2.accessToken.create(result);
      message = "success";
      content = {
        token: token.token.access_token,
        provider: oauthProvider
      };
    } catch (err) {
      console.error("Access Token Error", err.message);
      message = "error";
      content = JSON.stringify(err);
    }

    callback(null, {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html"
      },
      body: `<script>
(function() {
  function recieveMessage(e) {
    console.log("recieveMessage %o", e)
    if (!e.origin.match(${JSON.stringify(originPattern)})) {
      console.log('Invalid origin: %s', e.origin);
      return;
    }
    // send message to main window with da app
    window.opener.postMessage(
      'authorization:${oauthProvider}:${message}:${JSON.stringify(content)}',
      e.origin
    )
  }
  window.addEventListener("message", recieveMessage, false)
  // Start handshare with parent
  console.log("Sending message: %o", "${oauthProvider}")
  window.opener.postMessage("authorizing:${oauthProvider}", "*")
})()
</script>`
    });
  } catch (err) {
    callback(err);
  }
};
