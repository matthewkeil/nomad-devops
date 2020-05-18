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
exports.deleteStack = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default("devops:lib:aws:cloudformation:deleteStack");
const config_1 = require("../../../config");
const emptyStackBuckets_1 = require("./emptyStackBuckets");
exports.deleteStack = ({ StackName, emptyBuckets }) => __awaiter(void 0, void 0, void 0, function* () {
    if (emptyBuckets) {
        debug("attempting to empty stack buckets");
        yield emptyStackBuckets_1.emptyStackBuckets({ StackName });
    }
    const response = yield config_1.config.cf.deleteStack({ StackName }).promise();
    debug(response);
    const results = yield config_1.config.cf
        .waitFor("stackDeleteComplete", {
        StackName
    })
        .promise();
    debug(results);
});
//# sourceMappingURL=deleteStack.js.map