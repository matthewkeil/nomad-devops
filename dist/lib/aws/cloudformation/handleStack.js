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
exports.handleStack = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:lib:aws:cloudformation:handleStack" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const getStack_1 = require("./getStack");
const createStack_1 = require("./createStack");
const updateStack_1 = require("./updateStack");
const deleteStack_1 = require("./deleteStack");
const monitorStack_1 = require("./monitorStack");
const utils_1 = require("../../utils");
exports.handleStack = (params) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     *
     * Cloudformation does not allow some stack states to be updated and thus
     * the stack must be deleted and recreated. First checks to see if stack exists,
     * if not creates it. If stack exists check status to see if can be updated, if
     * not, delete and recreate. If no issues go ahead and upadte the stack.
     *
     */
    const status = yield getStack_1.getStack(params);
    const { StackStatus } = status || {};
    const interval = monitorStack_1.monitorStack(params);
    try {
        switch (StackStatus) {
            case undefined:
                utils_1.output({ log: `${params.StackName} doest not exist, creating it` });
                yield createStack_1.createStack(params);
                break;
            case "ROLLBACK_COMPLETE":
            case "ROLLBACK_FAILED":
            case "UPDATE_ROLLBACK_FAILED":
            case "CREATE_FAILED":
                utils_1.output({ log: `${params.StackName} is in a failed state. deleting first` });
                yield deleteStack_1.deleteStack(params);
                utils_1.output({ log: "delete complete. rebuilding stack" });
                yield createStack_1.createStack(params);
                break;
            default:
                yield updateStack_1.updateStack(params);
                break;
        }
    }
    catch (err) {
        debug(err);
    }
    finally {
        clearInterval(interval);
        return yield getStack_1.getStack(params);
    }
});
//# sourceMappingURL=handleStack.js.map