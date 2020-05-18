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
exports.apiGatewayAccountExists = void 0;
const config_1 = require("../../config");
exports.apiGatewayAccountExists = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cloudwatchRoleArn } = yield config_1.config.apiGateway.getAccount().promise();
        const RoleName = cloudwatchRoleArn.split("/")[1];
        yield config_1.config.iam.getRole({ RoleName }).promise();
        return true;
    }
    catch (err) {
        if (err.code === "NoSuchEntity")
            return false;
    }
});
//# sourceMappingURL=apiGateway.js.map