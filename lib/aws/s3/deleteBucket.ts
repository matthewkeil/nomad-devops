import Debug from "debug";
const debug = Debug("devops:lib:aws:s3:deleteBucket");
import { config } from "../../../config";
import { emptyBucket } from "./emptyBucket";

export const deleteBucket = async ({ Bucket }: { Bucket: string }) => {
  debug(`deleting bucket named ${Bucket}`);
  await emptyBucket({ Bucket });

  try {
    await config.s3.deleteBucket({ Bucket }).promise();
  } catch (err) {
    // sometimes it takes a second attempt to get bucket deleted
    await config.s3.deleteBucket({ Bucket }).promise();
  }

  debug(`finished deleting bucket ${Bucket}`);
};
