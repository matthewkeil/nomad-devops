import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG("devops:config:getUserConfig" + (!!filter.length ? `:${filter}` : ""));
import path from "path";
import { readFileSync, readdirSync } from "fs";
import { ACM, APIGateway, CloudFront, CloudFormation, IAM, SSM, S3, Route53 } from "aws-sdk";
import YAML from "yaml";
import Debug from "debug";
const debug = Debug("devops:config:getUserConfig");
import { Configuration } from "./Configuration";
import { kebabCaseDomainName } from "../lib/strings";

export const getUserConfig = ({ cwd, searchRoots }: { cwd: string; searchRoots: string[] }) => {
  const pathParse = path.parse(cwd);
  const { root } = pathParse;
  debug({ cwd, pathParse, searchRoots });
  if (cwd === path.resolve(__dirname, "..")) {
    // load dotenv when working in repo so system
    // can be used to deploy docs
    debug("loading .env");
    require("dotenv").config();
  }

  function* buildPlacesToSearch() {
    const buildRecursiveSearch = (location: string) => {
      const search: string[] = [];
      const _location =
        root === "/" ? location.slice(1).split("/") : location.replace(root, "").split("\\");
      debug({ location, _location });

      do {
        search.push(root.concat(_location.join("/")));
        _location.pop();
      } while (_location.length);

      const reversed = search.reverse();
      debug("search.reverse() :", reversed);
      return reversed;
    };

    // de-duplicate paths in order of insertion
    const _places = [...new Set(searchRoots.map(root => buildRecursiveSearch(root)).flat(1))];
    while (!!_places.length) {
      yield _places.shift();
    }
  }
  const yamlHandler = (location: string): Configuration => {
    const file = readFileSync(location).toString();
    return YAML.parse(file);
  };
  const baseHandler = (location: string): Configuration => {
    //eslint-disable-next-line @typescript-eslint/no-var-requires
    const file = require(location);
    return file.config ? file.config : file.default ? file.default : file;
  };
  const handlers = {
    "js": baseHandler,
    "ts": baseHandler,
    "json": baseHandler,
    "yml": yamlHandler,
    "yaml": yamlHandler
  } as const;
  const FILE_NAMES = new Set(Object.keys(handlers).map(ext => "devops." + ext));
  debug(
    `>>>\n>>> nomad-devops config filenames\n>>>\n${[...FILE_NAMES]
      .map(loc => ">>  " + loc + "\n")
      .join("")}`
  );

  interface Contents {
    pkg?: string;
    configs: string[];
  }
  const configFiles: string[] = [];
  const listContents = (dir: string) => {
    debug("listContnts() dir :", dir);
    const list = readdirSync(dir);
    debug("listContnts() list :", dir);
    const pkg = list.find(filename => filename === "package.json");

    const configs = list
      .filter(filename => FILE_NAMES.has(filename))
      .map(filename => `${dir}/${filename}`);
    configFiles.push(...configs);

    const contents: Contents = { configs };
    if (pkg) contents.pkg = `${dir}/package.json`;

    return contents;
  };

  const directoriesSearched: string[] = [];
  const mergeContentsOfDir = (dir: string): Partial<Configuration> => {
    directoriesSearched.push(dir);
    let config: Partial<Configuration> = {};

    debug("mergeContentsOfDir() dir :", dir);
    const { configs, pkg } = listContents(dir);
    debug("mergeContentsOfDir() contents :", { configs, pkg });

    for (const _config of configs) {
      const extension = _config.split(".").pop() as keyof typeof handlers;
      config = {
        ...config,
        /**
         * assume that if we are to this point in the code the user has already run
         * something to parse and load their own environment, or whatever is done
         * to protect and programmatically load private info onto the process.env
         * so that when the configs are require()'d in the file handlers they will
         * have the correct values and not load as 'undefined'
         */
        ...(handlers[extension](_config) as Partial<Configuration>)
      };
      if (pkg) config.pkg = pkg;
    }
    return config;
  };

  const buildConfig = (): Partial<Configuration> => {
    let config: Partial<Configuration> = {};
    debug("buildConfig() config: ", config);
    for (const current of buildPlacesToSearch()) {
      debug("buildConfig() current: ", current);
      const _config = mergeContentsOfDir(current);
      config = { ...config, ..._config };
      debug("buildConfig() config: ", config);
    }
    return config;
  };

  const config = buildConfig();
  if (!config.PROJECT_NAME) config.PROJECT_NAME = kebabCaseDomainName(config.ROOT_DOMAIN);

  config.AWS_SERVICE_CONFIG = Object.keys(config.AWS_SERVICE_CONFIG || {}).length
    ? config.AWS_SERVICE_CONFIG
    : {
        region: config.REGION,
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY
      };
  config.cf = new CloudFormation(config.AWS_SERVICE_CONFIG);
  config.route53 = new Route53(config.AWS_SERVICE_CONFIG);
  config.s3 = new S3(config.AWS_SERVICE_CONFIG);
  config.cloudFront = new CloudFront(config.AWS_SERVICE_CONFIG);
  config.acm = new ACM(config.AWS_SERVICE_CONFIG);
  config.apiGateway = new APIGateway(config.AWS_SERVICE_CONFIG);
  config.iam = new IAM(config.AWS_SERVICE_CONFIG);
  config.ssm = new SSM(config.AWS_SERVICE_CONFIG);

  debug(
    `>>>\n>>> directories searched to find config files\n>>>\n${directoriesSearched
      .map(loc => ">>  " + loc + "\n")
      .join("")}`
  );
  const debugConfig = { ...config };
  delete debugConfig.cf;
  delete debugConfig.route53;
  delete debugConfig.s3;
  Debug("devops,devops:config")(
    `>>>\n>>> config files found; merged top-down\n>>> example: {...configs[0], ...configs[1], ...configs[configs.length-1]}\n>>>\n${[
      "configs = [",
      ...configFiles.map(file => "  " + file),
      "]"
    ]
      .map(loc => ">>  " + loc + "\n")
      .join("")}>>>\n>>>\n`,
    debugConfig
  );

  return config;
};
