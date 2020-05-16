import { config } from "../../config";
import { kebabCaseDomainName } from "./changeCaseDomainName";

interface StackNameParameters {
  stack: string;
  branch?: string;
}

export const getStackName = ({ stack, branch }: StackNameParameters) =>
  stack === "core"
    ? `${kebabCaseDomainName(config.ROOT_DOMAIN)}-${stack}`
    : `${config.PROJECT_NAME}-${stack}-${branch}`;
