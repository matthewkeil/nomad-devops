import { IAM } from "cloudform";

export const ApiGatewayServiceRole = new IAM.Role({
  RoleName: "nomad-devops-api-gateway-service-role",
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
      PolicyName: "nomad-devops-api-gateway-service-policy",
      PolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Action: "lambda:InvokeFunction",
            Resource: []
          },
          {
            Effect: "Allow",
            Action: ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"],
            Resource: "arn:aws:logs:*:*:*"
          }
        ]
      }
    }
  ]
});
