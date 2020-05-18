"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStackName = void 0;
const config_1 = require("../../config");
const changeCaseDomainName_1 = require("./changeCaseDomainName");
exports.getStackName = ({ stack, branch }) => stack === "core"
    ? `${changeCaseDomainName_1.kebabCaseDomainName(config_1.config.ROOT_DOMAIN)}-${stack}`
    : `${config_1.config.PROJECT_NAME}-${stack}-${branch}`;
//# sourceMappingURL=getStackName.js.map