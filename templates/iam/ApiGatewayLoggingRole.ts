import { IAM } from "cloudform";

export const ApiGatewayLoggingRole = new IAM.Role({
  RoleName: `nomad-house-api-gateway-logging-role`,
  AssumeRolePolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "sts:AssumeRole",
        Principal: {
          Service: "apigateway.amazonaws.com"
        }
      }
    ]
  },
  Policies: [
    {
      PolicyName: `nomad-house-api-gateway-logging-policy`,
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
    }
  ]
});
