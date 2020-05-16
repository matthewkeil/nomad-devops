import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG("devops:config:getDefaultConfig" + (!!filter.length ? `:${filter}` : ""));
const debug = Debug("");
import { Configuration } from "./Configuration";
import { methods } from "../lib/interfaces";

export const getDefaultConfig = (): Partial<Configuration> => {
  // TODO Sort out default config
  const config = {
    REGION: "us-east-1",
    ALLOWED_METHODS: methods,
    ALLOW_NAKED: false
  };
  debug(config);
  return config;
};
