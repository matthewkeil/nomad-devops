import { Method } from "../lib/interfaces";
export interface Configuration {
    PROJECT_NAME: string;
    ROOT_DOMAIN: string;
    SUB_DOMAIN?: string;
    ALLOW_NAKED?: boolean;
    ROOT_OBJECT?: string;
    OWNER: string;
    REPO: string;
    PROD?: boolean;
    REGION: string;
    GITHUB_ACCESS_TOKEN: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_SERVICE_CONFIG: {
        region: string;
        accessKeyId: string;
        secretAccessKey: string;
    };
    ALLOWED_METHODS?: Set<Method>;
    CORS?: boolean;
    s3: AWS.S3;
    cf: AWS.CloudFormation;
    cloudFront: AWS.CloudFront;
    route53: AWS.Route53;
    acm: AWS.ACM;
    apiGateway: AWS.APIGateway;
    iam: AWS.IAM;
    ssm: AWS.SSM;
    pkg: any;
}
