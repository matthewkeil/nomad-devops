import { Fn } from "cloudform";

const CSS = ``;

export const UserPoolUICustomizationAttachment = {
  Type: "AWS::Cognito::UserPoolUICustomizationAttachment",
  Properties: {
    ClientId: Fn.Ref("UserPoolClient"),
    CSS,
    UserPoolId: Fn.Ref("UserPool")
  }
};
