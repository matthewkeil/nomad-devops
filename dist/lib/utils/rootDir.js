"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromRoot = void 0;
const path_1 = __importDefault(require("path"));
let ROOT_DIR;
const getRootDir = () => {
    const pathSegments = module.filename.split("/node_modules");
    const isPackage = pathSegments.length > 1 && pathSegments[1].startsWith("/nomad-devops");
    return isPackage
        ? pathSegments[0]
        : module.filename.split("/nomad-devops")[0].concat("/nomad-devops");
};
exports.fromRoot = (pathOrSegments, ...rest) => {
    if (!ROOT_DIR) {
        ROOT_DIR = getRootDir();
    }
    const segments = Array.isArray(pathOrSegments)
        ? pathOrSegments
        : pathOrSegments.startsWith("/")
            ? pathOrSegments.substring(1).split("/")
            : pathOrSegments.split("/");
    return path_1.default.resolve(ROOT_DIR, ...(rest ? [...segments, ...rest] : segments));
};
//# sourceMappingURL=rootDir.js.map