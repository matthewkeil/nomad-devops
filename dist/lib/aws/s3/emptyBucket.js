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
exports.emptyBucket = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default("devops:lib:aws:s3:deleteBucket");
const config_1 = require("../../../config");
const utils_1 = require("../../utils");
exports.emptyBucket = ({ Bucket }) => __awaiter(void 0, void 0, void 0, function* () {
    utils_1.output({ log: `attempting to empty ${Bucket}` });
    const contents = [];
    let marker;
    do {
        const { Contents, Marker } = yield config_1.config.s3
            .listObjects({
            Bucket,
            Marker: marker
        })
            .promise();
        contents.push(Contents);
        marker = Marker;
    } while (!marker);
    if (contents && !!contents.length) {
        yield Promise.all(contents.map(({ Key }) => config_1.config.s3
            .deleteObject({
            Bucket,
            Key
        })
            .promise()));
        debug(`Bucket ${Bucket} is empty`);
    }
});
//# sourceMappingURL=emptyBucket.js.map