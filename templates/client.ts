import CF from "cloudform";
import { config } from "../config";

import { ClientBucket } from "./s3/ClientBucket";
import { ClientBucketPolicy } from "./s3/ClientBucketPolicy";
import { ClientOriginAccessIdentity } from "./cloudfront/ClientOriginAccessIdentity";
import { ClientDistribution } from "./cloudfront/ClientDistribution";
import { ClientRecordSet } from "./route53/ClientRecordSet";

interface TemplateParams {
  branch: string;
  StackName: string;
  allowNaked?: boolean;
}

export const clientTemplate = ({ branch, StackName }: TemplateParams) => {
  const template = {
    AWSTemplateFormatVersion: "2010-09-09",
    Description: StackName,
    Parameters: {
      HostName: {
        Description: "Host name for site, ${SubDomain}.${RootDomain}",
        Type: "String",
        Default: `${config.SUB_DOMAIN}.${config.ROOT_DOMAIN}`
      },
      RootObject: {
        Description: "index.html/root for the SPA or webpage",
        Type: "String",
        Default: config.ROOT_OBJECT || "index.html" // should NOT be preceded with a slash "/"
      }
    },
    Resources: {
      ClientOriginAccessIdentity,
      ClientDistribution,
      ClientRecordSet,
      ClientBucketPolicy,
      ClientBucket
    }
  };

  if (branch === "master" && !config.ALLOW_NAKED) {
    (template.Resources.ClientDistribution.Properties.DistributionConfig.Aliases as string[]).push(
      config.ROOT_DOMAIN
    );
    template.Resources["ClientWwwRecordSet"] = Object.assign({}, ClientRecordSet, {
      Properties: {
        ...ClientRecordSet.Properties,
        Name: config.ROOT_DOMAIN
      }
    });
  }

  return CF(template);
};

console.log(clientTemplate({ branch: "matt", StackName: "client-app-env" }));
