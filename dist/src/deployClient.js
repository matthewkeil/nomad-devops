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
exports.deployClient = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:src:deployClient" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const path_1 = require("path");
const lib_1 = require("../lib");
const client_1 = require("../templates/client");
exports.deployClient = ({ branch, domain, stack = "client", buildPromise = Promise.resolve([""]) }) => __awaiter(void 0, void 0, void 0, function* () {
    debug("Bucket name: " + domain);
    let stackPromise;
    if (yield lib_1.bucketExists({ Bucket: domain })) {
        lib_1.output({ log: `found existing artifacts bucket` });
        stackPromise = lib_1.emptyBucket({ Bucket: domain });
    }
    else {
        const StackName = lib_1.getStackName({ branch, stack });
        debug("StackName: " + StackName);
        const TemplateBody = client_1.clientTemplate({ branch, StackName });
        stackPromise = lib_1.handleStack({
            StackName,
            TemplateBody
        });
    }
    const [artifacts] = yield Promise.all([buildPromise, stackPromise]);
    yield lib_1.uploadDirectory({ Bucket: domain, localPath: path_1.resolve(process.cwd(), ...artifacts) });
    return yield lib_1.createCacheInvalidation({ Bucket: domain });
});
//# sourceMappingURL=deployClient.js.map