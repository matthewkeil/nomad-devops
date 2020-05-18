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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDirectory = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:lib:aws:uploadDirectory" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const walkDirectory_1 = require("./walkDirectory");
const utils_1 = require("../../utils");
exports.uploadDirectory = ({ localPath, uploadPath, Bucket }) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * ensure that teh keyBase starts with a '/'. this is necessary
     * for the recursive walkDirectory function and the leading '/'
     * will be removed from the final objcet Prefix so a blank diretory
     * is not created.
     */
    const keyBase = uploadPath === "/" || !uploadPath
        ? "/"
        : uploadPath.startsWith("/")
            ? uploadPath
            : "/".concat(uploadPath);
    debug({ localPath, keyBase });
    const uploadPromises = [];
    yield walkDirectory_1.walkDirectory({ Bucket, path: localPath, keyBase, uploadPromises });
    utils_1.output({ log: `finished uploading dist / to ${Bucket}` });
});
//# sourceMappingURL=uploadDirectory.js.map