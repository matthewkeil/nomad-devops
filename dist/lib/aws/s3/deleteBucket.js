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
exports.deleteBucket = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default("devops:lib:aws:s3:deleteBucket");
const config_1 = require("../../../config");
const emptyBucket_1 = require("./emptyBucket");
exports.deleteBucket = ({ Bucket }) => __awaiter(void 0, void 0, void 0, function* () {
    debug(`deleting bucket named ${Bucket}`);
    yield emptyBucket_1.emptyBucket({ Bucket });
    try {
        yield config_1.config.s3.deleteBucket({ Bucket }).promise();
    }
    catch (err) {
        // sometimes it takes a second attempt to get bucket deleted
        yield config_1.config.s3.deleteBucket({ Bucket }).promise();
    }
    debug(`finished deleting bucket ${Bucket}`);
});
//# sourceMappingURL=deleteBucket.js.map