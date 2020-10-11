import { OutgoingHttpHeaders, IncomingHttpHeaders } from "http";
import { LambdaResource, LambdaResourceParams } from "../lambda/LambdaResource";
import { Debug } from "../../lib/debug";
const debug = Debug(__dirname, __filename);

interface KeyValueMap {
  [key: string]: string;
}

interface ApiRequest<
  B extends string | {} = undefined,
  P extends KeyValueMap = {},
  H extends IncomingHttpHeaders = IncomingHttpHeaders,
  Q extends KeyValueMap = {}
> {
  body?: B;
  params?: P;
  headers?: H;
  query?: Q;
}

interface ApiResponse {
  statusCode: number;
  headers?: OutgoingHttpHeaders;
}

type ApiHandler = (request: ApiRequest) => ApiResponse;

export interface ApiResourceParams extends LambdaResourceParams {
  path: string; // url /path of the resource
  method: string; // http method for the resource
  responseStatusCode: number; // statusCode for valid response from resource
}

export class ApiResource extends LambdaResource implements ApiResourceParams {
  file: string;
  name: string;
  path: string;
  method: string;
  responseStatusCode: number;
  s3Prefix: string;
  s3Bucket: string;
  getKey: Promise<string>;
  bundleFile?: string;

  constructor(params: ApiResourceParams) {
    super(params);
    this.path = params.path;
    this.method = params.method;
    this.responseStatusCode = params.responseStatusCode;
  }
}
