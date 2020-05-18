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
exports.getDistributionForBucket = void 0;
const config_1 = require("../../../config");
exports.getDistributionForBucket = ({ Bucket }) => __awaiter(void 0, void 0, void 0, function* () {
    const { DistributionList } = yield config_1.config.cloudFront.listDistributions().promise();
    if (!DistributionList.Items) {
        throw new Error("no distributions found");
    }
    const distribution = DistributionList.Items.find(dist => {
        if (dist.Origins.Quantity > 0) {
            const originIndex = dist.Origins.Items.find(origin => {
                return origin.DomainName === `${Bucket}.s3.amazonaws.com`;
            });
            if (originIndex) {
                return true;
            }
        }
        return false;
    });
    if (!distribution) {
        throw new Error(`couldn't find a distribution associated with bucket ${Bucket}`);
    }
    return distribution.Id;
});
//# sourceMappingURL=getDistributionForBucket.js.map