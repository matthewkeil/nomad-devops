import { Configuration } from "./Configuration";

export const validateConfig = (config: Configuration): string[] => {
  const errors: string[] = [];

  // now validate the config to make sure its good... for another day
  if (!config.GITHUB_ACCESS_TOKEN) {
    errors.push("no config.GITHUB_ACCESS_TOKEN found");
  }

  if (!config.AWS_SERVICE_CONFIG.accessKeyId) {
    errors.push("no config.AWS_ACCESS_KEY_ID found");
  }

  if (!config.AWS_SERVICE_CONFIG.secretAccessKey) {
    errors.push("no config.AWS_SECRET_ACCESS_KEY found");
  }

  if (!config.ROOT_DOMAIN) {
    errors.push("no config.ROOT_DOMAIN found");
  }

  return errors;
};
