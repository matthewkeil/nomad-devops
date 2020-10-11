import { IAM } from "cloudform";

export const LambdaServiceRole = new IAM.Role({
  RoleName: "nomad-devops-lambda-execution-role",
  AssumeRolePolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "sts:AssumeRole",
        Principal: {
          Service: "lambda.amazonaws.com"
        }
      }
    ]
  },
  Policies: [
    {
      PolicyName: "nomad-devops-lambda-execution-policy",
      PolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Action: ["logs:CreateLogStream", "logs:PutLogEvents"],
            Resource: "arn:aws:logs:*:*:*"
          }
        ]
      }
    }
  ]
});
