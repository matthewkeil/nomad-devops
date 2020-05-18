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
exports.walkDirectory = void 0;
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const fs_1 = require("fs");
const uploadFile_1 = require("./uploadFile");
const utils_1 = require("../../utils");
const STAT = util_1.default.promisify(fs_1.stat);
const READDIR = util_1.default.promisify(fs_1.readdir);
exports.walkDirectory = ({ path, keyBase, Bucket, uploadPromises }) => __awaiter(void 0, void 0, void 0, function* () {
    utils_1.output({ log: "attempting to upload " + path });
    const files = yield READDIR(path);
    for (const filename of files) {
        const current = path_1.default.join(path, filename);
        const stat = yield STAT(current);
        if (stat.isDirectory()) {
            yield exports.walkDirectory({
                Bucket,
                path: current,
                keyBase: `${keyBase}${filename}/`,
                uploadPromises
            });
            continue;
        }
        uploadPromises.push(uploadFile_1.uploadFile({
            Bucket,
            Key: `${keyBase}${filename}`.slice(1),
            path: current
        }));
    }
    utils_1.output({ log: "finished uploading " + keyBase });
});
//# sourceMappingURL=walkDirectory.js.map