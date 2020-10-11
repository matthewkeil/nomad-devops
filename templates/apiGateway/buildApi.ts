import DEBUG from "debug";
const debug = DEBUG("devops:templates:buildApi");
import { Fn, IntrinsicFunction, Refs } from "cloudform";
import { buildLogGroup } from "../logs/buildLogGroup";
import { ApiGatewayServiceRole } from "../iam/ApiGatewayServiceRole";
import { LambdaServiceRole } from "../iam/LambdaServiceRole";
import { buildLambdaFunction } from "../lambda/buildFunction";
import { buildLambdaPermission } from "../lambda/buildLambdaPermission";
import { RestApi } from "./RestApi";
import { apiResources } from "./apiResources";

const FIND = Array.prototype.find;

const policy = FIND.call(
  ApiGatewayServiceRole.Properties.Policies,
  policy => policy.PolicyName === "nomad-devops-api-gateway-service-policy"
);

const policyResources: IntrinsicFunction[] = FIND.call(
  policy.PolicyDocument.Statement,
  statement => statement.Action === "lambda:InvokeFunction"
).Resource;

const options = {
  consumes: ["application/json"],
  produces: ["application/json"],
  responses: {
    "200": {
      description: "200 OK",
      headers: {
        "Access-Control-Allow-Origin": {
          type: "string"
        },
        "Access-Control-Allow-Methods": {
          type: "string"
        },
        "Access-Control-Allow-Headers": {
          type: "string"
        }
      }
    }
  },
  "x-amazon-apigateway-integration": {
    responses: {
      default: {
        statusCode: "200",
        responseParameters: {
          "method.response.header.Access-Control-Allow-Methods": "'*'",
          "method.response.header.Access-Control-Allow-Headers": "'*'",
          "method.response.header.Access-Control-Allow-Origin": "'*'"
        },
        responseTemplates: {
          "application/json": "{}\n"
        }
      }
    },
    passthroughBehavior: "when_no_match",
    requestTemplates: {
      "application/json": '{\n  "statusCode" : 200\n}\n'
    },
    type: "mock"
  }
};

const paths: {
  [path: string]: {
    [method: string]: any;
  };
} = { ...RestApi.Properties.Body.paths };

const buildResourceSwagger = (resource: {
  path: string;
  method: string;
  arn: IntrinsicFunction;
  responseStatusCode: number;
}) => {
  debug(resource);
  const { path, method, arn, responseStatusCode } = resource;
  if (paths.hasOwnProperty(path) && paths[path].hasOwnProperty(method)) {
    throw new Error("duplicate resource path: " + { path, method });
  }
  if (!paths[path]) paths[path] = {};
  paths[path].options = options;
  paths[path][method.toLowerCase()] = {
    "x-amazon-apigateway-integration": {
      type: "aws",
      uri: Fn.Join("", [
        "arn:aws:apigateway:",
        Refs.Region,
        ":lambda:path/2015-03-31/functions/",
        arn,
        "/invocations"
      ]),
      httpMethod: "POST",
      credentials: Fn.GetAtt("ApiGatewayServiceRole", "Arn"),
      passthroughBehavior: "when_no_match",
      responses: {
        // 200: {
        //   statusCode: responseStatusCode,
        //   responseParameters: {
        //     "method.response.header.Access-Control-Allow-Origin": "'*'",
        //     "method.response.header.Access-Control-Allow-Methods": "'*'",
        //     "method.response.header.Access-Control-Allow-Headers": "'*'"
        //   },
        //   responseTemplates: {
        //     "application/json": "input.body"
        //   }
        // },
        "default": {
          statusCode: `${responseStatusCode}`,
          responseParameters: {
            "method.response.header.Access-Control-Allow-Origin": "'*'",
            "method.response.header.Access-Control-Allow-Methods": "'*'",
            "method.response.header.Access-Control-Allow-Headers": "'*'"
          },
          responseTemplates: {
            "application/json": `#set ($root=$input.path("$"))
$input.json("$")
#if($root.toString().contains("error"))
  #set($context.responseOverride.status = 500)
  {
      "type": $root.errorType,
      "message": $root.errorMessage,
      "stack": $root.trace
  }
#elseif (!$root.toString().contains("error"))
  $input.body
#end
`
          }
        }
      }
    },
    responses: {
      [`${responseStatusCode}`]: {
        description: "OK"
      },
      "500": {
        description: "4XX/5XX responses",
        headers: {
          "Access-Control-Allow-Origin": {
            type: "string"
          },
          "Access-Control-Allow-Methods": {
            type: "string"
          },
          "Access-Control-Allow-Headers": {
            type: "string"
          }
        },
        content: {
          "application/json": {
            schema: {
              "$ref": "#/component/schemas/Error"
            }
          }
        }
      }
    }
  };
};

export const buildApi = async () => {
  const resourcePromises = [];
  const Resources = {};

  for (const resource of apiResources) {
    debug(resource);
    const { name, path, method, responseStatusCode, getKey, s3Bucket } = resource;
    policyResources.push(Fn.GetAtt(name, "Arn"));
    buildResourceSwagger({
      path,
      method,
      responseStatusCode,
      arn: Fn.GetAtt(name, "Arn")
    });
    Resources[name + "Permission"] = buildLambdaPermission(Fn.Ref(name));
    Resources[name + "LogGroup"] = buildLogGroup(Fn.Ref(name));
    resourcePromises.push(
      getKey.then(Key => {
        Resources[name] = buildLambdaFunction({
          name,
          Key,
          Bucket: s3Bucket,
          roleName: "LambdaServiceRole" // this is a magic string. me no likey that...
        });
      })
    );
  }

  await Promise.all(resourcePromises);

  ApiGatewayServiceRole.Properties.Policies[0].PolicyDocument.Statement[0].Resource = policyResources;
  RestApi.Properties.Body.paths = paths;

  return { ...Resources, RestApi, ApiGatewayServiceRole, LambdaServiceRole };
};
