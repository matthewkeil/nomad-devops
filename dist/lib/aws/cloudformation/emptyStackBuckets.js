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
exports.emptyStackBuckets = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default("devops:lib:aws:cloudformation:emptyStackBuckets");
const config_1 = require("../../../config");
const emptyBucket_1 = require("../s3/emptyBucket");
exports.emptyStackBuckets = ({ StackName }) => __awaiter(void 0, void 0, void 0, function* () {
    debug(`looking for s3 buckets to empty in stack ${StackName}`);
    const response = yield config_1.config.cf.listStackResources({ StackName }).promise();
    const bucketPhysicalResourceIds = response.StackResourceSummaries.filter((resource) => resource.ResourceType === "AWS::S3::Bucket").map((resource) => resource.PhysicalResourceId);
    debug(`stack has buckets named ${bucketPhysicalResourceIds.join(", ")}`);
    yield Promise.all(bucketPhysicalResourceIds.map(Bucket => {
        return emptyBucket_1.emptyBucket({ Bucket });
    }));
    debug("stack buckets empty");
});
//# sourceMappingURL=emptyStackBuckets.js.map