import DEBUG from "debug";
const Debug = (filter: string) =>
  DEBUG(
    "devops:src:customResources:certificateRequestProvider" + (filter.length ? `:${filter}` : "")
  );
const debug = Debug("");
import {
  CloudFormationCustomResourceResponse,
  CloudFormationCustomResourceUpdateEvent
} from "aws-lambda";
import { ResourceHandler } from "../customResourceProvider";
import { getIssuedCertificate, getCertificateForDomain } from "../../lib";

export const certificateProvider: ResourceHandler = async event => {
  try {
    const { Certificate: certificate } = await getCertificateForDomain(
      event.ResourceProperties.DomainName
    );
    switch (event.RequestType.toLowerCase()) {
      case "create":
        if (!certificate) {
          throw new Error("please create a CertificateRequest to use your Certificate");
        }
        break;
      case "update":
        const {
          OldResourceProperties,
          ResourceProperties
        } = event as CloudFormationCustomResourceUpdateEvent;
        if (OldResourceProperties.DomainName !== ResourceProperties.DomainName) {
          if (!certificate) {
            throw new Error(
              "To protect a different domain, please create a CertificateRequest for the new DomainName and then update your Certificate"
            );
          }
        } else {
          if (!certificate) {
            throw new Error("please create a CertificateRequest to use your Certificate");
          }
        }
        break;
      case "delete":
        break;
      default:
        return Promise.resolve({
          Status: "FAILED",
          RequestId: event.RequestId,
          StackId: event.StackId,
          PhysicalResourceId: "NomadDevops::Certificate",
          LogicalResourceId: event.LogicalResourceId,
          Reason: "invalid event.RequestType"
        });
    }
    debug(certificate);

    const { Status } = certificate || {};
    switch (Status) {
      case "PENDING_VALIDATION":
        const status = await getIssuedCertificate({
          CertificateArn: certificate.CertificateArn
        });
        if (status !== "ISSUED") throw new Error("Certificate validation failed");
        break;
      case "ISSUED":
        break;
      case "FAILED":
      case "EXPIRED":
      case "REVOKED":
      case "INACTIVE":
      case "VALIDATION_TIMED_OUT":
      default:
        const message = `the status for the Certificate covering ${certificate.DomainName} is ${Status}`;
        throw new Error(message);
    }

    const response: CloudFormationCustomResourceResponse = {
      Status: "SUCCESS",
      RequestId: event.RequestId,
      StackId: event.StackId,
      PhysicalResourceId: "NomadDevops::Certificate",
      LogicalResourceId: event.LogicalResourceId
    };
    if (certificate) {
      response.Data = {
        Arn: certificate.CertificateArn
      };
    }
    return response;
  } catch (err) {
    return {
      Status: "FAILED",
      RequestId: event.RequestId,
      StackId: event.StackId,
      PhysicalResourceId: "NomadDevops::Certificate",
      LogicalResourceId: event.LogicalResourceId,
      Reason: JSON.stringify(err)
    };
  }
};
