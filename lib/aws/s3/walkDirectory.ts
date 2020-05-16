import { S3 } from "aws-sdk";
import PATH from "path";
import util from "util";
import { stat, readdir } from "fs";
import { uploadFile } from "./uploadFile";
import { output } from "../../utils";

const STAT = util.promisify(stat);
const READDIR = util.promisify(readdir);

interface WalkDirectoryProps {
  path: string;
  keyBase: string;
  Bucket: string;
  uploadPromises: Promise<S3.ManagedUpload.SendData>[];
}

export const walkDirectory = async ({
  path,
  keyBase,
  Bucket,
  uploadPromises
}: WalkDirectoryProps): Promise<void> => {
  output({ log: "attempting to upload " + path });
  const files = await READDIR(path);
  for (const filename of files) {
    const current = PATH.join(path, filename);
    const stat = await STAT(current);
    if (stat.isDirectory()) {
      await walkDirectory({
        Bucket,
        path: current,
        keyBase: `${keyBase}${filename}/`,
        uploadPromises
      });
      continue;
    }
    uploadPromises.push(
      uploadFile({
        Bucket,
        Key: `${keyBase}${filename}`.slice(1),
        path: current
      })
    );
  }
  output({ log: "finished uploading " + keyBase });
};
