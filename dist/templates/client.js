"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientTemplate = void 0;
const cloudform_1 = __importDefault(require("cloudform"));
const config_1 = require("../config");
const ClientBucket_1 = require("./s3/ClientBucket");
const ClientBucketPolicy_1 = require("./s3/ClientBucketPolicy");
const ClientOriginAccessIdentity_1 = require("./cloudfront/ClientOriginAccessIdentity");
const ClientDistribution_1 = require("./cloudfront/ClientDistribution");
const ClientRecordSet_1 = require("./route53/ClientRecordSet");
exports.clientTemplate = ({ branch, StackName }) => {
    const template = {
        AWSTemplateFormatVersion: "2010-09-09",
        Description: StackName,
        Parameters: {
            HostName: {
                Description: "Host name for site, ${SubDomain}.${RootDomain}",
                Type: "String",
                Default: `${config_1.config.SUB_DOMAIN}.${config_1.config.ROOT_DOMAIN}`
            },
            RootObject: {
                Description: "index.html/root for the SPA or webpage",
                Type: "String",
                Default: config_1.config.ROOT_OBJECT || "index.html" // should NOT be preceded with a slash "/"
            }
        },
        Resources: {
            ClientOriginAccessIdentity: ClientOriginAccessIdentity_1.ClientOriginAccessIdentity,
            ClientDistribution: ClientDistribution_1.ClientDistribution,
            ClientRecordSet: ClientRecordSet_1.ClientRecordSet,
            ClientBucketPolicy: ClientBucketPolicy_1.ClientBucketPolicy,
            ClientBucket: ClientBucket_1.ClientBucket
        }
    };
    if (branch === "master" && !config_1.config.ALLOW_NAKED) {
        template.Resources.ClientDistribution.Properties.DistributionConfig.Aliases.push(config_1.config.ROOT_DOMAIN);
        template.Resources["ClientWwwRecordSet"] = Object.assign({}, ClientRecordSet_1.ClientRecordSet, {
            Properties: Object.assign(Object.assign({}, ClientRecordSet_1.ClientRecordSet.Properties), { Name: config_1.config.ROOT_DOMAIN })
        });
    }
    return cloudform_1.default(template);
};
//# sourceMappingURL=client.js.map