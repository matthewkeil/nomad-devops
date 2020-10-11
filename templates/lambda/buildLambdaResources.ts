import { LambdaResource } from "./LambdaResource";
import {
  CustomResourceProviderRole,
  DeadLetterQueFunctionRole,
  DeadLetterQueLambdaPermission,
  DeadLetterQueTopic,
  DeadLetterQueTopicPolicy,
  DeadLetterQueLogGroup
} from "nomad-custom-resources";
import { buildLambdaFunction } from "./buildFunction";
import { buildLogGroup } from "../logs/buildLogGroup";
import { Fn } from "cloudform";

const lambdaResources = [
  new LambdaResource({
    name: "CustomResourceProvider",
    s3Prefix: "resources/custom",
    bundleFile: require.resolve("nomad-custom-resources/dist/src/handler"),
    dlq: Fn.Ref("DeadLetterQueTopic")
  }),
  new LambdaResource({
    name: "DeadLetterQueFunction",
    s3Prefix: "resources/custom",
    bundleFile: require.resolve("nomad-custom-resources/dist/src/deadLetterQue")
  })
];

export const buildLambdaResources = async () => {
  const resourcePromises = [];
  const Resources = {};

  for (const { name, getKey, s3Bucket, dlq } of lambdaResources) {
    Resources[name + "LogGroup"] = buildLogGroup(Fn.Ref(name));
    resourcePromises.push(
      getKey.then(Key => {
        Resources[name] = buildLambdaFunction({
          name,
          Bucket: s3Bucket,
          Key,
          roleName: name + "Role",
          dlq
        });
      })
    );
  }

  await Promise.all(resourcePromises);

  return {
    ...Resources,
    CustomResourceProviderRole,
    DeadLetterQueFunctionRole,
    DeadLetterQueLambdaPermission,
    DeadLetterQueLogGroup,
    DeadLetterQueTopic,
    DeadLetterQueTopicPolicy
  };
};
