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
import { config } from "../../config";
import { getCertificateForDomain, updateCertificate, requestCertificate } from "../../lib";
import { ResourceHandler } from "../customResourceProvider";

const handleCertificateRequestUpdate = async ({
  OldResourceProperties,
  ResourceProperties
}: CloudFormationCustomResourceUpdateEvent) => {
  if (ResourceProperties.DomainName !== ResourceProperties.DomainName) {
    throw new Error("cannot update the DomainName of a Certificate");
  }

  if (ResourceProperties.ValidationMethod !== ResourceProperties.ValidationMethod) {
    throw new Error("cannot update the ValidationMethod of a Certificate");
  }

  const oldAlts = new Set(OldResourceProperties.SubjectAlternativeNames || []);
  const newAlts = new Set(ResourceProperties.SubjectAlternativeNames || []);
  let badAlts = false;
  for (const old of oldAlts) if (!newAlts.has(old)) badAlts = true;
  for (const alt of newAlts) if (!oldAlts.has(alt)) badAlts = true;
  if (badAlts) {
    throw new Error("cannot update the SubjectAlternativeNames of a Certificate");
  }

  const oldOpts = new Set(
    (OldResourceProperties.DomainValidationOption || []) as ACM.DomainValidationOptionList
  );
  const newOpts = new Set(
    (ResourceProperties.DomainValidationOption || []) as ACM.DomainValidationOptionList
  );
  let badOpts = false;
  for (const opt of oldOpts) if (!newAlts.has(opt)) badOpts = true;
  for (const opt of newOpts) if (!oldAlts.has(opt)) badOpts = true;
  if (badOpts) {
    throw new Error("cannot update the ValidationMethod of a Certificate");
  }

  const { Certificate } = await getCertificateForDomain(ResourceProperties.DomainName);
  await updateCertificate({
    CertificateArn: Certificate.CertificateArn,
    Options: ResourceProperties.Options,
    Tags: ResourceProperties.Tags
  });
  return await config.acm
    .describeCertificate({ CertificateArn: Certificate.CertificateArn })
    .promise();
};

export const certificateRequestProvider: ResourceHandler = async event => {
  try {
    let { Certificate: certificate } = await getCertificateForDomain(
      event.ResourceProperties["DomainName"]
    );

    let results;
    switch (event.RequestType.toUpperCase()) {
      case "CREATE":
        if (!certificate)
          certificate = await requestCertificate({
            ...(event.ResourceProperties as Partial<ACM.RequestCertificateRequest>),
            IdempotencyToken: event.RequestId
          });
        break;
      case "UPDATE":
        const { Certificate } = await handleCertificateRequestUpdate(
          event as CloudFormationCustomResourceUpdateEvent
        );
        certificate = Certificate;
        break;
      case "DELETE":
        await config.acm
          .deleteCertificate({ CertificateArn: certificate.CertificateArn })
          .promise();
        break;
      default:
        return {
          Status: "FAILED",
          RequestId: event.RequestId,
          StackId: event.StackId,
          PhysicalResourceId: "NomadDevops::CertificateRequest",
          LogicalResourceId: event.LogicalResourceId,
          Reason: "invalid event.RequestType"
        };
    }
    debug(results);

    const response: CloudFormationCustomResourceResponse = {
      Status: "SUCCESS",
      RequestId: event.RequestId,
      StackId: event.StackId,
      PhysicalResourceId: "NomadDevops::CertificateRequest",
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
      PhysicalResourceId: "NomadDevops::CertificateRequest",
      LogicalResourceId: event.LogicalResourceId,
      Reason: JSON.stringify(err)
    };
  }
};
