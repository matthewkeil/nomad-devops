import { config } from "../../../config";

export const createBucketWithFolders = async ({
  Bucket,
  folders
}: {
  Bucket: string;
  folders?: string[];
}) => {
  await config.s3
    .createBucket({
      Bucket
    })
    .promise();

  if (Array.isArray(folders)) {
    for (const folder of folders) {
      await config.s3
        .putObject({
          Bucket,
          Key: `${folder}/`
        })
        .promise();
    }
  }

  return Bucket;
};
