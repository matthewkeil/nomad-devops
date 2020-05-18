"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeDomain = void 0;
exports.normalizeDomain = (domain) => domain
    .toLowerCase()
    .split(".")
    .filter(zone => !!zone)
    .join(".");
//# sourceMappingURL=normalizeDomain.js.map