import Debug from "debug";
const debug = Debug("devops:lib:aws:s3:uploadFile");
import fs from "fs";
import { lookup } from "mime-types";
import { config } from "../../../config";

interface UploadFileProps {
  Bucket: string;
  Key: string;
  path: string;
}

export const uploadFile = ({ Bucket, Key, path }: UploadFileProps) => {
  const contentType = lookup(Key);
  debug({ Key, contentType });
  return config.s3
    .upload({
      Bucket,
      Key,
      ACL: "public-read",
      ContentEncoding: "utf-8",
      ContentType: contentType ? contentType : "application/octet-stream",
      Body: fs.createReadStream(path, { autoClose: true })
    })
    .promise();
};
