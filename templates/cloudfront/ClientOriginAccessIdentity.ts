import { CloudFront, Fn } from "cloudform";

export const ClientOriginAccessIdentity = new CloudFront.CloudFrontOriginAccessIdentity({
  CloudFrontOriginAccessIdentityConfig: {
    Comment: Fn.Join("", [`origin access identity for `, Fn.Ref("HostName")])
  }
});
