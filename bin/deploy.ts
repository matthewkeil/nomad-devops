#!/usr/bin/env node
Error.stackTraceLimit = Infinity;
import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG("devops:bin:deploy" + (!!filter.length ? `:${filter}` : ""));
const debug = Debug("");

import { deployCore } from "../src/deployCore";

// const _deploy = async () => {
//   deploy({
//     branch: "shimmyshimmy",
//     subDomain: "cocopop",
//     artifacts: ["docs", ".vuepress", "dist"],
//     framework: "vuepress"
//   });
// };

if (require.main === module) {
  // _deploy();
  deployCore({ rootDomain: "discuss.life", stackName: "discuss-life-core" }).then(console.log);
}
