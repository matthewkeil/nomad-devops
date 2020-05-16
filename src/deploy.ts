#!/usr/bin/env node
import DEBUG from "debug";
const Debug = (filter: string) => DEBUG("devops:src:deploy" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
import { CloudFront } from "aws-sdk";

import { getStackName, getStack, getProjectDetails, exec, output, buildDomainName } from "../lib";
import { deployCore } from "./deployCore";
import { config } from "../config";
import { deployClient } from "./deployClient";
import { validateCoreStack } from "../lib/aws/cloudformation/validateCoreStack";

interface DeployParams {
  branch?: string;
  subDomain?: string;
  artifacts?: string[];
  framework?: string;
}

export const deploy = async (params: DeployParams) => {
  debug("params: ", params);
  const { framework, artifacts, branch, subDomain } = params;

  /**
   * only check that core stack exists. will check the dns status
   * after deploy to make sure its standing correctly
   */
  const coreStackName = getStackName({ stack: "core" });
  debug("coreStackName: ", coreStackName);
  const corePromise = getStack({ StackName: coreStackName }).then(coreStatus => {
    return coreStatus
      ? Promise.resolve(coreStatus)
      : deployCore({ rootDomain: config.ROOT_DOMAIN, stackName: coreStackName });
  });

  /**
   * decipher project type and build project if needed. can
   * supply either valid location of artifacts directory or
   * script can try to build project by either using the
   * supplied config or fallback to sniffing project meta for
   * clues on what command to run and where to "default" look
   * for the build artifacts.
   */
  const details = getProjectDetails(framework);
  let buildPromise: Promise<string[]>;
  if (artifacts) {
    buildPromise = Promise.resolve(artifacts);
  } else {
    const command = `export NODE_ENV=production && ${
      details.commands.length === 1 ? details.commands[0] : details.commands.join(" && ")
    }`;
    debug(`rebuilding ${details.framework + " "}app using "${command}"`);
    buildPromise = exec(command).then(log => {
      debug(log);
      return details.distLocation;
    });
  }

  /**
   * wait for build project and core stack verification.
   *
   * use project info from above to decide which recipe to use
   * and deploy the appropriate stack type
   */
  const allowNaked = config.ALLOW_NAKED;
  const rootDomain = config.ROOT_DOMAIN;
  const _subDomain = subDomain || config.SUB_DOMAIN;
  const domain = buildDomainName({
    branch,
    subDomain: _subDomain,
    rootDomain,
    allowNaked
  });
  debug("deploy params: ", { domain, branch, subDomain, rootDomain, allowNaked });
  if (await validateCoreStack({ corePromise, rootDomain, domain })) {
    let distribution: CloudFront.Distribution;
    switch (framework) {
      case "vue":
      case "nuxt":
      case "vuepress":
      case "angular":
      case "react":
      case "next":
      case "ember":
      case "svelte":
      default:
        distribution = await deployClient({
          branch,
          domain,
          buildPromise
        });
    }
    output({ log: `>>>\n>>>\n your project is live at ${distribution.DomainName}\n>>>` });
  }
};
