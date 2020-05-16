import { config } from "../../../config";
import { output } from "../../utils";
import { getDistributionForBucket } from "./getDistributionForBucket";

export const createCacheInvalidation = async ({
  DistributionId,
  Bucket
}: {
  Bucket?: string;
  DistributionId?: string;
}) => {
  const invalidate = (id: string) =>
    config.cloudFront
      .createInvalidation({
        DistributionId: id,
        InvalidationBatch: {
          CallerReference: `${Date.now()}`,
          Paths: {
            Quantity: 1,
            Items: ["/*"]
          }
        }
      })
      .promise();

  const id = DistributionId ? DistributionId : await getDistributionForBucket({ Bucket });
  if (!id) {
    throw new Error(
      "DistributionID or Bucket associated with a Distribution required to createInvalidation"
    );
  }

  output({ log: `attempting to invalidate DistributionId: ${id}` });
  await invalidate(id);
  const { Distribution } = await config.cloudFront.getDistribution({ Id: id }).promise();
  return Distribution;
};
