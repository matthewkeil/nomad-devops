import Debug from "debug";
const debug = Debug("devops:lib:aws:s3:deleteBucket");
import { config } from "../../../config";
import { output } from "../../utils";

export const emptyBucket = async ({ Bucket }: { Bucket: string }) => {
  output({ log: `attempting to empty ${Bucket}` });
  const contents = [];
  let marker;
  do {
    const { Contents, Marker } = await config.s3
      .listObjects({
        Bucket,
        Marker: marker
      })
      .promise();
    contents.push(Contents);
    marker = Marker;
  } while (!marker);

  if (contents && !!contents.length) {
    await Promise.all(
      contents.map(({ Key }) =>
        config.s3
          .deleteObject({
            Bucket,
            Key
          })
          .promise()
      )
    );

    debug(`Bucket ${Bucket} is empty`);
  }
};
