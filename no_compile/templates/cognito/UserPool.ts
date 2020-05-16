import { Fn } from "cloudform";
import { config } from "config";

export const UserPool = {
  Type: "AWS::Cognito::UserPool",
  Properties: {
    UserPoolName: `${config.PROJECT_NAME}-user-pool`,
    AccountRecoverySetting: {
      RecoveryMechanisms: [
        { Name: "verified_email", Priority: 1 },
        { Name: "verified_phone_number", Priority: 2 }
      ]
    },
    AdminCreateUserConfig: {
      AllowAdminCreateUserOnly: false,
      InviteMessageTemplate: {
        EmailMessage: "Welcome to Nomad House",
        EmailSubject: "Welcome to Nomad House",
        SMSMessage: "Welcome to Nomad House"
      },
      UnusedAccountValidityDays: 30,
      AutoVerifiedAttributes: ["email", "phone_number"],
      DeviceConfiguration: {
        ChallengeRequiredOnNewDevice: false,
        DeviceOnlyRememberedOnUserPrompt: false
      },
      EmailConfiguration: {
        EmailSendingAccount: "COGNITO_DEFAULT",
        From: `info@${config.ROOT_DOMAIN}`,
        ReplyToEmailAddress: `info@${config.ROOT_DOMAIN}`,
        SourceArn: Fn.GetAtt("ServiceRole", "Arn")
      },
      EmailVerificationMessage: "",
      EmailVerificationSubject: "",
      MfaConfiguration: "OFF",
      Schema: [
        {
          AttributeDataType: "String",
          Mutable: true,
          Name: "userGroup",
          Required: true
        }
      ],
      SmsAuthenticationMessage: "",
      SmsConfiguration: {
        SnsCallerArn: Fn.GetAtt("ServiceRole", "Arn")
      },
      SmsVerificationMessage: "",
      UsernameAttributes: "email",
      UsernameConfiguration: {
        CaseSensitive: false
      }
    }
  }
};
