import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG(
    "devops:src:customResources:certificateRequestProvider" + (filter.length ? `:${filter}` : "")
  );
const debug = Debug("");
import { ACM } from "aws-sdk";
import {
  CloudFormationCustomResourceResponse,
  CloudFormationCustomResourceUpdateEvent
} from "aws-lambda";
import { ResourceHandler } from "./customResourceProvider";
import { getCertForDomain, createCertRecordSet, getHostedZoneForDomain } from "../../lib";
import { config } from "../../config";

export const requestCertificate = ({}: ACM.RequestCertificateRequest) => {};

export const certificateRequestProvider: ResourceHandler = async event => {
  try {
    let results;
    const rootDomain = event.ResourceProperties["DomainName"];
    let { Certificate: certificate } = await getCertForDomain(rootDomain);
    switch (event.RequestType.toLowerCase()) {
      case "create":
        if (!certificate) {
          const params: ACM.RequestCertificateRequest = {
            DomainName: rootDomain,
            SubjectAlternativeNames: [`*.${rootDomain}`],
            IdempotencyToken: event.RequestId,
            ValidationMethod: "DNS",
            Options: {
              CertificateTransparencyLoggingPreference: "ENABLED"
            }
          };
          if (event.ResourceProperties["Tags"]) params.Tags = event.ResourceProperties["Tags"];
          if (event.ResourceProperties["DomainValidationOptions"])
            params.DomainValidationOptions = event.ResourceProperties["DomainValidationOptions"];

          const { CertificateArn } = await config.acm.requestCertificate(params).promise();
          const { Certificate } = await config.acm
            .describeCertificate({ CertificateArn })
            .promise();
          certificate = Certificate;

          const dnsValidationOptions = Certificate.DomainValidationOptions.filter(option => {
            if (option.ValidationMethod.toLowerCase() === "dns") return true;
          });
          const hostedZone = await getHostedZoneForDomain(rootDomain);

          for (const option of dnsValidationOptions) {
            await createCertRecordSet({
              HostedZoneId: hostedZone.Id.split("/").pop(),
              recordSetName: option.ResourceRecord.Name,
              recordSetValue: option.ResourceRecord.Value
            });
          }
        }
        break;
      case "update":
        const {
          OldResourceProperties,
          ResourceProperties
        } = event as CloudFormationCustomResourceUpdateEvent;
        
        break;
      case "delete":
        await config.acm
          .deleteCertificate({ CertificateArn: certificate.CertificateArn })
          .promise();
        break;
      default:
        return Promise.resolve({
          Status: "FAILED",
          RequestId: event.RequestId,
          StackId: event.StackId,
          PhysicalResourceId: "NomadDevops::CertificateRequest",
          LogicalResourceId: event.LogicalResourceId,
          Reason: "invalid event.RequestType"
        });
    }
    debug(results);

    const response: CloudFormationCustomResourceResponse = {
      Status: "SUCCESS",
      RequestId: event.RequestId,
      StackId: event.StackId,
      PhysicalResourceId: "NomadDevops::CertificateRequest",
      LogicalResourceId: event.LogicalResourceId
    };
    if (certInfo) {
      response.Data = {};
    }
    return response;
  } catch (err) {
    return {
      Status: "FAILED",
      RequestId: event.RequestId,
      StackId: event.StackId,
      PhysicalResourceId: "NomadDevops::CertificateRequest",
      LogicalResourceId: event.LogicalResourceId,
      Reason: JSON.stringify(err)
    };
  }
};
