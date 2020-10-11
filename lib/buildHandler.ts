import { Debug } from "./debug";
const debug = Debug(__dirname, __filename);
import { generate as Generate } from "shortid";
const generate = () => Generate().replace(/[-_]/g, `${Math.floor(Math.random() * 10)}`);
import { createReadStream } from "fs";
import { PassThrough } from "stream";
import { resolve, sep } from "path";
import Archiver from "archiver";
import webpack from "webpack";
import webpackConfig from "../webpack.config";
import { config } from "../config";

const BUILD_DIR = resolve(__dirname, "..", "build");

export const buildHandler = async ({
  Bucket,
  Prefix = `${config.PROJECT_NAME}/api`,
  path
}: {
  Bucket: string;
  Prefix: string;
  path: string;
}) => {
  debug({ Bucket, path });
  const name = path
    .split("/")
    .pop()
    .split(".")
    .shift();

  return new Promise((resolve, reject) => {
    webpack({
      ...webpackConfig,
      entry: {
        [name]: path
      },
      output: {
        ...webpackConfig.output,
        path: BUILD_DIR
      }
    }).run((err, stats) => {
      if (err) return reject(err);
      resolve(stats);
    });
  }).then(async () => {
    /**
     *
     * build zip archive for each handler and upload archive named
     * {UUID}.zip to s3. inside archive will be a bundle named
     * index that should export a handler named 'handler'
     *
     */
    let uploadPromise: Promise<void>;
    function streamToS3({ Key }: { Key: string }) {
      const pass = new PassThrough();
      uploadPromise = config.s3
        .upload({ Bucket, Key, Body: pass, ACL: "public-read" })
        .promise()
        .then(() => {
          return void debug(`finished uploading ${Key}`);
        });
      return pass;
    }

    const archive = Archiver("zip", { zlib: { level: 9 } });
    archive.on("error", err => {
      console.error(err);
    });

    const Key = Prefix + "/" + generate();
    archive.pipe(streamToS3({ Key }));

    const bundleName = BUILD_DIR + sep + name + ".js";
    archive.append(createReadStream(resolve(bundleName)), {
      name: "index.js"
    });

    await Promise.all([archive.finalize(), uploadPromise]);

    debug(`>>>
          >>> finished webpacking/zipping: ${name}
          >>> from path: ${path}
          >>> to Bucket: ${Bucket}
          >>> as Key: ${Key}
          >>>`);

    return {
      path,
      name,
      bundleName,
      Bucket,
      Key,
      Handler: "index.handler"
    };
  });
};
