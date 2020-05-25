"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCoreTemplate = void 0;
const cloudform_1 = require("cloudform");
const config_1 = require("../config");
const HostedZone_1 = require("./route53/HostedZone");
exports.buildCoreTemplate = ({ stackName, hostedZone, certificate, cognito = false, gSuite = false }) => __awaiter(void 0, void 0, void 0, function* () {
    const template = {
        Description: stackName,
        Parameters: {
            RootDomain: {
                Description: "Root domain at which the system is hosted.",
                Type: "String",
                Default: config_1.config.ROOT_DOMAIN
            }
        },
        Resources: {},
        Outputs: {
            HostedZone: {
                Description: `HostedZoneId for ${config_1.config.ROOT_DOMAIN}`,
                Value: cloudform_1.Fn.Ref("HostedZone"),
                Export: {
                    Name: `${config_1.config.PROJECT_NAME}-hosted-zone`
                }
            }
            // Certificate: {
            //   Description: `SSL/TLS Certificate covering ${config.ROOT_DOMAIN}`,
            //   Value: Fn.Ref("Certificate"),
            //   Export: {
            //     Name: `${config.PROJECT_NAME}-certificate`
            //   }
            // }
        }
    };
    if (hostedZone) {
        template.Parameters["HostedZone"] = {
            Description: "Existing HostedZone for " + config_1.config.ROOT_DOMAIN,
            Type: "String",
            Default: hostedZone
        };
    }
    else {
        template.Resources["HostedZone"] = HostedZone_1.HostedZone;
    }
    // if (gSuite) {
    //   template.Resources["GSuiteMXRecordSet"] = GSuiteMXRecordSet;
    // }
    // if (certificate) {
    //   template.Parameters["Certificate"] = {
    //     Description: "Existing certificate for " + config.ROOT_DOMAIN,
    //     Type: "String",
    //     Default: certificate
    //   };
    // } else {
    //   template.Resources["Certificate"] = Certificate;
    // }
    // if (cognito) {
    //   template.Resources["UserRole"] = UserRole;
    //   template.Resources["UserPolicy"] = UserPolicy;
    //   template.Resources["AdminRole"] = AdminRole;
    //   template.Resources["AdminPolicy"] = AdminPolicy;
    //   template.Resources["ServiceRole"] = ServiceRole;
    //   template.Resources["ServicePolicy"] = ServicePolicy;
    //   template.Resources["UnauthenticatedRole"] = UnauthenticatedRole;
    //   template.Resources["UnauthenticatedPolicy"] = UnauthenticatedPolicy;
    //   template.Resources["IdentityPool"] = IdentityPool;
    //   template.Resources["IdentityPoolRoleAttachment"] = IdentityPoolRoleAttachment;
    //   template.Resources["UserPool"] = UserPool;
    //   template.Resources["UserPoolClient"] = UserPoolClient;
    //   template.Resources["UserPoolDomain"] = UserPoolDomain;
    //   template.Resources["UserPoolIdentityProviderGoogle"] = UserPoolIdentityProviderGoogle;
    //   template.Resources["UserPoolIdentityProviderFacebook"] = UserPoolIdentityProviderFacebook;
    //   template.Resources["UserPoolUICustomizationAttachment"] = UserPoolUICustomizationAttachment;
    // }
    return template;
});
//# sourceMappingURL=core.js.map