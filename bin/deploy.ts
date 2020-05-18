#!/usr/bin/env node
Error.stackTraceLimit = Infinity;
import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG("devops:bin:deploy" + (!!filter.length ? `:${filter}` : ""));
const debug = Debug("");

import { deployCore, deployNomadDevops, deploy } from "../src";
import { config } from "../config";
import { kebabCaseDomainName } from "../lib";

const processArgV = () => {
  const nomadDevops = !!process.argv.find(arg => arg === "nomad-devops");
  const coreStack = !!process.argv.find(arg => arg === "core");
  debug({ nomadDevops, coreStack });
  const stack = nomadDevops ? "NOMAD_DEVOPS" : coreStack ? "CORE" : undefined;

  const rootDomain = config.ROOT_DOMAIN;
  const coreStackName = `${kebabCaseDomainName(rootDomain)}-core`;

  const args = {
    stack,
    rootDomain,
    coreStackName
  };
  debug({ args });
  return args;
};

const _deploy = async () => {
  const { stack, coreStackName, rootDomain } = processArgV();

  switch (stack) {
    case "NOMAD_DEVOPS":
      return deployNomadDevops();
    case "CORE":
      return deployCore({ rootDomain, stackName: coreStackName });
    default:
    // deploy({
    //   branch: "shimmyshimmy",
    //   subDomain: "cocopop",
    //   artifacts: ["docs", ".vuepress", "dist"],
    //   framework: "vuepress"
    // });
  }
};

if (require.main === module) {
  _deploy().then(console.log);
}
