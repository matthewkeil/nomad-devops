import Debug from "debug";
const debug = Debug("devops:lib:aws:cloudformation:emptyStackBuckets");
import { config } from "../../../config";
import { emptyBucket } from "../s3/emptyBucket";

export const emptyStackBuckets = async ({ StackName }: AWS.CloudFormation.DeleteStackInput) => {
  debug(`looking for s3 buckets to empty in stack ${StackName}`);
  const response: any = await config.cf.listStackResources({ StackName }).promise();
  const bucketPhysicalResourceIds: string[] = response.StackResourceSummaries.filter(
    (resource: any) => resource.ResourceType === "AWS::S3::Bucket"
  ).map((resource: any) => resource.PhysicalResourceId);
  debug(`stack has buckets named ${bucketPhysicalResourceIds.join(", ")}`);

  await Promise.all(
    bucketPhysicalResourceIds.map(Bucket => {
      return emptyBucket({ Bucket });
    })
  );
  debug("stack buckets empty");
};
