import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG("devops:lib:aws:uploadDirectory" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");

import { S3 } from "aws-sdk";
import { walkDirectory } from "./walkDirectory";
import { output } from "../../utils";
import { walkDirectory} from 'nomad-devops';

interface UploadDirectoryParams {
  localPath: string; // path to upoad, relative to repo root
  uploadPath?: string; // directory to upload into, defaults to root
  Bucket: string;
}

export const uploadDirectory = async ({ localPath, uploadPath, Bucket }: UploadDirectoryParams) => {
  /**
   * ensure that teh keyBase starts with a '/'. this is necessary
   * for the recursive walkDirectory function and the leading '/'
   * will be removed from the final objcet Prefix so a blank diretory
   * is not created.
   */
  const keyBase =
    uploadPath === "/" || !uploadPath
      ? "/"
      : uploadPath.startsWith("/")
      ? uploadPath
      : "/".concat(uploadPath);

  debug({ localPath, keyBase });
  const uploadPromises = [] as Promise<S3.ManagedUpload.SendData>[];
  await walkDirectory({ Bucket, path: localPath, keyBase, uploadPromises });
  output({ log: `finished uploading dist / to ${Bucket}` });
};
