"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployNomadDevops = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:src:deployNomadDevops" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const cloudform_1 = __importDefault(require("cloudform"));
const templates_1 = require("../templates");
const lib_1 = require("../lib");
const config_1 = require("../config");
exports.deployNomadDevops = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const Bucket = "nomad-devops";
    const Prefix = "resources/custom";
    const { Contents = [] } = yield config_1.config.s3.listObjects({ Bucket, Prefix }).promise();
    const Key = (_a = Contents[0]) === null || _a === void 0 ? void 0 : _a.Key;
    debug({ Bucket, Prefix, Key, Contents });
    if (!Key)
        throw new Error("could not locate custom resources");
    return yield lib_1.handleStack({
        StackName: "nomad-devops",
        Capabilities: ["CAPABILITY_NAMED_IAM"],
        TemplateBody: cloudform_1.default(yield templates_1.buildNomadDevopsTemplate({
            Bucket,
            Key
        }))
    });
});
//# sourceMappingURL=deployNomadDevops.js.map