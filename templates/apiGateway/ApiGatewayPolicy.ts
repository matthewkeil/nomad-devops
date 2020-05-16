import { IAM, Fn } from "cloudform";

export const ApiGatewayPolicy = new IAM.Policy({
  Roles: [Fn.Ref("ApiGatewayRole")],
  PolicyName: `nomad-house-api-gateway-policy`,
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "logs:*",
        Resource: "*"
      }
    ]
  }
}).dependsOn("ApiGatewayRole");
