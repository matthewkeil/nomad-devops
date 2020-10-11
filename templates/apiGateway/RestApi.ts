import { ApiGateway, Fn, Refs } from "cloudform";
import { config } from "../../config";

const options = {
  responses: {
    "200": {
      description: "200 OK",
      headers: {
        "Access-Control-Allow-Origin": {
          schema: {
            type: "string"
          }
        },
        "Access-Control-Allow-Methods": {
          schema: {
            type: "string"
          }
        },
        "Access-Control-Allow-Headers": {
          schema: {
            type: "string"
          }
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

export const RestApi = new ApiGateway.RestApi({
  Name: "nomad-devops-api",
  Description: "Api that allows nomad-devops to work",
  EndpointConfiguration: {
    Types: ["EDGE"]
  },
  Body: {
    openapi: "3.0.0",
    info: {
      version: Date.now()
    },
    servers: [
      {
        url: `https://api.${config.ROOT_DOMAIN}/{basePath}`,
        variables: {
          basePath: {
            default: Fn.Join("", ["/", Fn.Ref("ApiStage")])
          }
        }
      }
    ],
    paths: {},
    securityDefinitions: {
      sigv4: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
        "x-amazon-apigateway-authtype": "awsSigv4"
      },
      // eslint-disable-next-line @typescript-eslint/camelcase
      api_key: {
        type: "apiKey",
        name: "x-api-key",
        in: "header"
      },
      CognitoAuthorizer: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
        "x-amazon-apigateway-authtype": "cognito_user_pools",
        "x-amazon-apigateway-authorizer": {
          providerARNs: ["arn:aws:cognito-idp:..........."],
          type: "cognito_user_pools"
        }
      }
    },
    components: {
      schemas: {
        Error: {
          type: "object",
          properties: {
            type: {
              type: "string"
            },
            message: {
              type: "string"
            },
            trace: {
              type: "array",
              items: {
                type: "string"
              }
            }
          },
          required: ["type", "message", "stack"]
        }
      }
    },
    "x-amazon-apigateway-gateway-responses": {
      DEFAULT_4XX: {
        responseTemplates: {
          "application/json":
            '{ "message": $context.error.messageString, "type": $context.error.responseType }'
        },
        responseParameters: {
          "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
          "gatewayresponse.header.Access-Control-Allow-Methods": "'*'",
          "gatewayresponse.header.Access-Control-Allow-Headers": "'*'"
        }
      },
      DEFAULT_5XX: {
        responseTemplates: {
          "application/json":
            '{ "message": $context.error.messageString, "type": $context.error.responseType }'
        },
        responseParameters: {
          "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
          "gatewayresponse.header.Access-Control-Allow-Methods": "'*'",
          "gatewayresponse.header.Access-Control-Allow-Headers": "'*'"
        }
      }
    }
  }
});



    // paths: {
    //   "/auth": {
    //     options,
    //     get: {
    //       responses: {
    //         "302": {
    //           description: "OK",
    //           headers: {
    //             Location: {
    //               schema: {
    //                 type: "string"
    //               }
    //             }
    //           }
    //         },
    //         default: {
    //           "$ref": "#/component/response/Error"
    //         }
    //       },
    //       "x-amazon-apigateway-integration": {
    //         type: "aws_proxy",
    //         uri: Fn.Join("", [
    //           "arn:aws:apigateway:",
    //           Refs.Region,
    //           ":lambda:path/2015-03-31/functions/",
    //           Fn.GetAtt("NetlifyCmsAuthUri", "Arn"),
    //           "/invocations"
    //         ]),
    //         httpMethod: "POST",
    //         credentials: Fn.GetAtt("ApiGatewayServiceRole", "Arn"),
    //         passthroughBehavior: "when_no_match"
    //       }
    //     }
    //   },
    //   "/callback": {
    //     options,
    //     get: {
    //       responses: {
    //         "200": {
    //           description: "OK",
    //           content: {
    //             "text/html": {
    //               schema: {
    //                 type: "string",
    //                 example: "<script>(function() { /* code for token to work */ })()</script>"
    //               }
    //             }
    //           }
    //         },
    //         default: {
    //           "$ref": "#/component/response/Error"
    //         }
    //       },
    //       "x-amazon-apigateway-integration": {
    //         uri: Fn.Join("", [
    //           "arn:aws:apigateway:",
    //           Refs.Region,
    //           ":lambda:path/2015-03-31/functions/",
    //           Fn.GetAtt("NetlifyCmsAuthCallback", "Arn"),
    //           "/invocations"
    //         ]),
    //         passthroughBehavior: "when_no_match",
    //         httpMethod: "POST",
    //         credentials: Fn.GetAtt("ApiGatewayServiceRole", "Arn"),
    //         type: "aws_proxy"
    //       }
    //     }
    //   },
    //   "/success": {
    //     options,
    //     get: {
    //       responses: {
    //         "200": {
    //           description: "OK",
    //           content: {
    //             "text/plain": {
    //               schema: {
    //                 type: "string",
    //                 example: ""
    //               }
    //             }
    //           }
    //         },
    //         default: {
    //           "$ref": "#/component/response/Error"
    //         }
    //       },
    //       "x-amazon-apigateway-integration": {
    //         uri: Fn.Join("", [
    //           "arn:aws:apigateway:",
    //           Refs.Region,
    //           ":lambda:path/2015-03-31/functions/",
    //           Fn.GetAtt("NetlifyCmsAuthSuccess", "Arn"),
    //           "/invocations"
    //         ]),
    //         passthroughBehavior: "when_no_match",
    //         credentials: Fn.GetAtt("ApiGatewayServiceRole", "Arn"),
    //         httpMethod: "POST",
    //         type: "aws_proxy"
    //       }
    //     }
    //   }
    // },