"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDomainName = void 0;
exports.buildDomainName = ({ branch, subDomain, rootDomain, allowNaked = false }) => {
    const url = [];
    if (branch !== "master") {
        url.push(branch);
    }
    if (subDomain && subDomain.length) {
        url.push(...subDomain.split(".").filter(zone => !!zone));
    }
    if (!url.length && !allowNaked) {
        url.push("www");
    }
    url.push(...rootDomain.split(".").filter(zone => !!zone));
    return url.join(".");
};
//# sourceMappingURL=getDomainName.js.map