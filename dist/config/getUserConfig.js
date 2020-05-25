"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserConfig = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:config:getUserConfig" + (!!filter.length ? `:${filter}` : ""));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const aws_sdk_1 = require("aws-sdk");
const yaml_1 = __importDefault(require("yaml"));
const debug = Debug("devops:config:getUserConfig");
const strings_1 = require("../lib/strings");
exports.getUserConfig = ({ cwd, searchRoots }) => {
    const pathParse = path_1.default.parse(cwd);
    const { root } = pathParse;
    debug({ cwd, pathParse, searchRoots });
    if (cwd === path_1.default.resolve(__dirname, "..")) {
        // load dotenv when working in repo so system
        // can be used to deploy docs
        debug("loading .env");
        require("dotenv").config();
    }
    function* buildPlacesToSearch() {
        const buildRecursiveSearch = (location) => {
            const search = [];
            const _location = root === "/" ? location.slice(1).split("/") : location.replace(root, "").split("\\");
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
    const yamlHandler = (location) => {
        const file = fs_1.readFileSync(location).toString();
        return yaml_1.default.parse(file);
    };
    const baseHandler = (location) => {
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
    };
    const FILE_NAMES = new Set(Object.keys(handlers).map(ext => "devops." + ext));
    debug(`>>>\n>>> nomad-devops config filenames\n>>>\n${[...FILE_NAMES]
        .map(loc => ">>  " + loc + "\n")
        .join("")}`);
    const configFiles = [];
    const listContents = (dir) => {
        debug("listContnts() dir :", dir);
        const list = fs_1.readdirSync(dir);
        debug("listContnts() list :", dir);
        const pkg = list.find(filename => filename === "package.json");
        const configs = list
            .filter(filename => FILE_NAMES.has(filename))
            .map(filename => `${dir}/${filename}`);
        configFiles.push(...configs);
        const contents = { configs };
        if (pkg)
            contents.pkg = `${dir}/package.json`;
        return contents;
    };
    const directoriesSearched = [];
    const mergeContentsOfDir = (dir) => {
        directoriesSearched.push(dir);
        let config = {};
        debug("mergeContentsOfDir() dir :", dir);
        const { configs, pkg } = listContents(dir);
        debug("mergeContentsOfDir() contents :", { configs, pkg });
        for (const _config of configs) {
            const extension = _config.split(".").pop();
            config = Object.assign(Object.assign({}, config), handlers[extension](_config));
            if (pkg)
                config.pkg = pkg;
        }
        return config;
    };
    const buildConfig = () => {
        let config = {};
        debug("buildConfig() config: ", config);
        for (const current of buildPlacesToSearch()) {
            debug("buildConfig() current: ", current);
            const _config = mergeContentsOfDir(current);
            config = Object.assign(Object.assign({}, config), _config);
            debug("buildConfig() config: ", config);
        }
        return config;
    };
    let config = {};
    if (process.env.LAMBDA !== "true") {
        try {
            config = buildConfig();
        }
        catch (err) {
            console.log(">>>\n>>> Error encountered when trying to build nomad-devops config:\n", err);
        }
    }
    if (!config.PROJECT_NAME)
        config.PROJECT_NAME = strings_1.kebabCaseDomainName(config.ROOT_DOMAIN);
    config.AWS_SERVICE_CONFIG = Object.keys(config.AWS_SERVICE_CONFIG || {}).length
        ? config.AWS_SERVICE_CONFIG
        : {
            region: config.REGION,
            accessKeyId: config.AWS_ACCESS_KEY_ID,
            secretAccessKey: config.AWS_SECRET_ACCESS_KEY
        };
    config.cf = new aws_sdk_1.CloudFormation(config.AWS_SERVICE_CONFIG);
    config.route53 = new aws_sdk_1.Route53(config.AWS_SERVICE_CONFIG);
    config.s3 = new aws_sdk_1.S3(config.AWS_SERVICE_CONFIG);
    config.cloudFront = new aws_sdk_1.CloudFront(config.AWS_SERVICE_CONFIG);
    config.acm = new aws_sdk_1.ACM(config.AWS_SERVICE_CONFIG);
    config.apiGateway = new aws_sdk_1.APIGateway(config.AWS_SERVICE_CONFIG);
    config.iam = new aws_sdk_1.IAM(config.AWS_SERVICE_CONFIG);
    config.ssm = new aws_sdk_1.SSM(config.AWS_SERVICE_CONFIG);
    debug(`>>>\n>>> directories searched to find config files\n>>>\n${directoriesSearched
        .map(loc => ">>  " + loc + "\n")
        .join("")}`);
    const debugConfig = Object.assign({}, config);
    delete debugConfig.cf;
    delete debugConfig.route53;
    delete debugConfig.s3;
    Debug("devops,devops:config")(`>>>\n>>> config files found; merged top-down\n>>> example: {...configs[0], ...configs[1], ...configs[configs.length-1]}\n>>>\n${[
        "configs = [",
        ...configFiles.map(file => "  " + file),
        "]"
    ]
        .map(loc => ">>  " + loc + "\n")
        .join("")}>>>\n>>>\n`, debugConfig);
    return config;
};
//# sourceMappingURL=getUserConfig.js.map