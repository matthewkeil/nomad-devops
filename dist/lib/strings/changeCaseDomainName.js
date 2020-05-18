"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kebabCaseDomainName = exports.pascalCaseDomainName = exports.camelCaseDomainName = void 0;
exports.camelCaseDomainName = (domain) => domain
    .split(".")
    .map((segment, index) => {
    if (index !== 0) {
        return segment[0].toUpperCase() + segment.substr(1);
    }
    return segment;
})
    .join("");
exports.pascalCaseDomainName = (domain) => domain
    .split(".")
    .map(segment => segment[0].toUpperCase() + segment.substr(1))
    .join("");
exports.kebabCaseDomainName = (domain) => domain.split(".").join("-");
//# sourceMappingURL=changeCaseDomainName.js.map