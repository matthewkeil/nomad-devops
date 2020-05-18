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
exports.createCacheInvalidation = void 0;
const config_1 = require("../../../config");
const utils_1 = require("../../utils");
const getDistributionForBucket_1 = require("./getDistributionForBucket");
exports.createCacheInvalidation = ({ DistributionId, Bucket }) => __awaiter(void 0, void 0, void 0, function* () {
    const invalidate = (id) => config_1.config.cloudFront
        .createInvalidation({
        DistributionId: id,
        InvalidationBatch: {
            CallerReference: `${Date.now()}`,
            Paths: {
                Quantity: 1,
                Items: ["/*"]
            }
        }
    })
        .promise();
    const id = DistributionId ? DistributionId : yield getDistributionForBucket_1.getDistributionForBucket({ Bucket });
    if (!id) {
        throw new Error("DistributionID or Bucket associated with a Distribution required to createInvalidation");
    }
    utils_1.output({ log: `attempting to invalidate DistributionId: ${id}` });
    yield invalidate(id);
    const { Distribution } = yield config_1.config.cloudFront.getDistribution({ Id: id }).promise();
    return Distribution;
});
//# sourceMappingURL=createCacheInvalidation.js.map