require("dotenv").config();
module.exports = {
  REGION: "us-east-1",
  ROOT_DOMAIN: "microlot.cafe",
  // PROJECT_NAME: "nomad-devops",
  ROOT_OBJECT: "en/index.html",
  SUB_DOMAIN: "devops",
  ALLOW_NAKED: true,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
  GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN
};
