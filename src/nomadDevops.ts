import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG("devops:src:nomadDevops" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");

interface DeployNomadDevopsParams {}

export const deployNomadDevops = async ({}: DeployNomadDevopsParams) => {};
