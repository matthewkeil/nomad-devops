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
exports.createCertRecordSet = void 0;
const config_1 = require("../../../config");
exports.createCertRecordSet = ({ HostedZoneId, recordSetName, recordSetValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const { ResourceRecordSets } = yield config_1.config.route53
        .listResourceRecordSets({
        HostedZoneId,
        StartRecordName: recordSetName,
        StartRecordType: "CNAME"
    })
        .promise();
    // TODO: what is this actually checking for?? need to look deeper for meaningful telemetry
    if (!!ResourceRecordSets.length) {
        return;
    }
    return config_1.config.route53
        .changeResourceRecordSets({
        HostedZoneId,
        ChangeBatch: {
            Changes: [
                {
                    Action: "UPSERT",
                    ResourceRecordSet: {
                        Name: recordSetName,
                        ResourceRecords: [
                            {
                                Value: recordSetValue
                            }
                        ],
                        TTL: 60,
                        Type: "CNAME"
                    }
                }
            ],
            Comment: "RecordSet for SSL Certificate Validation"
        }
    })
        .promise();
});
//# sourceMappingURL=createCertRecordSet.js.map