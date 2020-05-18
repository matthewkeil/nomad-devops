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
exports.updateCertificateTags = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:lib:aws:acm:updateCertificateTags" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const config_1 = require("../../../config");
exports.updateCertificateTags = ({ CertificateArn, Tags }) => __awaiter(void 0, void 0, void 0, function* () {
    const { Tags: old = [] } = yield config_1.config.acm.listTagsForCertificate({ CertificateArn }).promise();
    const oldTags = new Map(old.map(({ Key, Value }) => [Key, Value]));
    debug("oldTags: ", oldTags);
    const newTags = new Map(Tags.map(({ Key, Value }) => [Key, Value]));
    debug("newTags: ", newTags);
    const adds = [];
    const deletes = [];
    for (const [Key, newValue] of newTags) {
        if (!oldTags.has(Key)) {
            adds.push({ Key, Value: newValue });
            continue;
        }
        const oldValue = oldTags.get(Key);
        if (newValue !== oldValue) {
            adds.push({ Key, Value: newValue });
            deletes.push({ Key, Value: oldValue });
        }
    }
    for (const [Key, oldValue] of oldTags) {
        if (!newTags.has(Key)) {
            deletes.push({ Key, Value: oldValue });
            continue;
        }
    }
    debug("adds: ", adds);
    debug("deletes: ", deletes);
    const delPromise = deletes.length
        ? config_1.config.acm.removeTagsFromCertificate({ CertificateArn, Tags: deletes }).promise()
        : Promise.resolve({});
    const addPromise = adds.length
        ? config_1.config.acm.addTagsToCertificate({ CertificateArn, Tags: adds }).promise()
        : Promise.resolve({});
    return yield Promise.all([addPromise, delPromise]);
});
//# sourceMappingURL=updateCertificateTags.js.map