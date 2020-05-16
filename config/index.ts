import { homedir } from "os";
import { Configuration } from "./Configuration";
import { getDefaultConfig } from "./getDefaultConfig";
import { getUserConfig } from "./getUserConfig";
import { validateConfig } from "./validateConfig";
export { Configuration } from "./Configuration";

const cwd = process.cwd();
const SEARCH_ROOTS = [homedir(), cwd];
// check cwd for package.json and node_modules folder
// if one doesn't exist check the folder holding node_modules/nomad-devops

const config = {
  ...getDefaultConfig(),
  ...getUserConfig({ cwd, searchRoots: SEARCH_ROOTS })
} as Configuration;

if (config.pkg) {
  config.pkg = require(config.pkg);
}

export { config };

const errors = validateConfig(config);

if (errors.length) {
  for (const message of errors) console.log(`>>> config error: ${message}`);
  process.exit(1);
}
