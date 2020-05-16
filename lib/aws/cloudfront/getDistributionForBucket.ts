import { config } from "../../../config";

export const getDistributionForBucket = async ({ Bucket }: { Bucket: string }) => {
  const { DistributionList } = await config.cloudFront.listDistributions().promise();
  if (!DistributionList.Items) {
    throw new Error("no distributions found");
  }

  const distribution = DistributionList.Items.find(dist => {
    if (dist.Origins.Quantity > 0) {
      const originIndex = dist.Origins.Items.find(origin => {
        return origin.DomainName === `${Bucket}.s3.amazonaws.com`;
      });

      if (originIndex) {
        return true;
      }
    }
    return false;
  });
  if (!distribution) {
    throw new Error(`couldn't find a distribution associated with bucket ${Bucket}`);
  }

  return distribution.Id;
};
