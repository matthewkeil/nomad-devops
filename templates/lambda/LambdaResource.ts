import { createReadStream } from "fs";
import { PassThrough } from "stream";
import Archiver from "archiver";
import { IntrinsicFunction } from "cloudform";
import { Debug } from "../../lib/debug";
const debug = Debug(__dirname, __filename);
import { generate as Generate } from "shortid";
const generate = () => Generate().replace(/[-_]/g, `${Math.floor(Math.random() * 10)}`);

import { config } from "../../config";

const Bucket = "nomad-devops-0";

export interface LambdaResourceParams {
  name: string;
  s3Prefix: string; // desired prefix
  bundleFile?: string; // local file path of handler bundle
  dlq?: IntrinsicFunction;
}

const EXTRACT_CALLEE = /\((.*):[0-9]*:[0-9]*\)$/;

export class LambdaResource implements LambdaResourceParams {
  file: string;
  name: string;
  s3Prefix: string;
  s3Bucket = Bucket;
  bundleFile?: string;
  getKey: Promise<string>;
  dlq?: IntrinsicFunction;

  constructor(params: LambdaResourceParams) {
    try {
      throw new Error("arg");
    } catch (err) {
      const calleeLine = err.stack.split("\n ")[2];
      const [, callee] = EXTRACT_CALLEE.exec(calleeLine);
      this.file = callee;
    }
    this.name = params.name;
    this.s3Prefix = params.s3Prefix;
    this.bundleFile = params.bundleFile;
    this.dlq = params.dlq;
    this.getKey = this.zipToS3();
  }

  private async zipToS3() {
    /**
     *
     * build zip archive for each handler and upload archive named
     * {UUID}.zip to s3. inside archive will be a bundle named
     * index that should export a handler named 'handler'
     *
     */
    let uploadPromise: Promise<void>;
    const streamToS3 = ({ Key }: { Key: string }) => {
      const pass = new PassThrough();
      uploadPromise = config.s3
        .upload({ Bucket, Key, Body: pass })
        .promise()
        .then(() => {
          return void debug(`finished uploading ${Key}`);
        });
      return pass;
    };

    const archive = Archiver("zip", { zlib: { level: 9 } });
    archive.on("error", err => {
      console.error(err);
    });

    const Key = [this.s3Prefix, this.name, generate()].join("/");
    archive.pipe(streamToS3({ Key }));

    archive.append(createReadStream(this.bundleFile), {
      name: "index.js"
    });

    await Promise.all([archive.finalize(), uploadPromise]);

    debug(`>>>
          >>> finished webpacking/zipping: ${this.name}
          >>> from path: ${this.file}
          >>> to Bucket: ${Bucket}
          >>> as Key: ${Key}
          >>>`);

    return Key;
  }
}
