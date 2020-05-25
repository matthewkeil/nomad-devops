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
exports.buildNomadDevopsTemplate = void 0;
const cloudform_1 = require("cloudform");
const CustomResourceProviderPolicy_1 = require("./iam/CustomResourceProviderPolicy");
const CustomResourceProvider_1 = require("./lambda/CustomResourceProvider");
const CustomResourceProviderLogGroup_1 = require("./logs/CustomResourceProviderLogGroup");
const CustomResourceProviderRole_1 = require("./iam/CustomResourceProviderRole");
const lib_1 = require("../lib");
const ApiGatewayAccount_1 = require("./apiGateway/ApiGatewayAccount");
const ApiGatewayPolicy_1 = require("./apiGateway/ApiGatewayPolicy");
const ApiGatewayRole_1 = require("./apiGateway/ApiGatewayRole");
exports.buildNomadDevopsTemplate = ({ customResourceKey, customResourceBucket }) => __awaiter(void 0, void 0, void 0, function* () {
    const template = {
        AWSTemplateFormatVersion: "2010-09-09",
        Description: "NomadDevops The Stack.  It makes the 'the lights turn on,'... yo...",
        Parameters: {
            CustomResourceBucket: {
                Type: "String",
                Default: customResourceBucket
            },
            CustomResourceKey: {
                Type: "String",
                Default: customResourceKey
            }
        },
        Resources: {
            CustomResourceProvider: CustomResourceProvider_1.CustomResourceProvider,
            CustomResourceProviderRole: CustomResourceProviderRole_1.CustomResourceProviderRole,
            CustomResourceProviderPolicy: CustomResourceProviderPolicy_1.CustomResourceProviderPolicy,
            CustomResourceProviderLogGroup: CustomResourceProviderLogGroup_1.CustomResourceProviderLogGroup
        },
        Outputs: {
            CustomResourceProvider: {
                Description: "your NomadDevops custom resource provider",
                Value: cloudform_1.Fn.GetAtt("CustomResourceProvider", "Arn"),
                Export: {
                    Name: "NomadDevopsCustomResourceProvider"
                }
            }
        }
    };
    if (!(yield lib_1.apiGatewayAccountExists())) {
        template.Resources["ApiGatewayRole"] = ApiGatewayRole_1.ApiGatewayRole;
        template.Resources["ApiGatewayPolicy"] = ApiGatewayPolicy_1.ApiGatewayPolicy;
        template.Resources["ApiGatewayAccount"] = ApiGatewayAccount_1.ApiGatewayAccount;
    }
    return template;
});
//# sourceMappingURL=nomad-devops.js.map