"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default("devops:lib:aws:s3:uploadFile");
const fs_1 = __importDefault(require("fs"));
const mime_types_1 = require("mime-types");
const config_1 = require("../../../config");
exports.uploadFile = ({ Bucket, Key, path }) => {
    const contentType = mime_types_1.lookup(Key);
    debug({ Key, contentType });
    return config_1.config.s3
        .upload({
        Bucket,
        Key,
        ACL: "public-read",
        ContentEncoding: "utf-8",
        ContentType: contentType ? contentType : "application/octet-stream",
        Body: fs_1.default.createReadStream(path, { autoClose: true })
    })
        .promise();
};
//# sourceMappingURL=uploadFile.js.map