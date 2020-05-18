"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.output = void 0;
const log_update_1 = __importDefault(require("log-update"));
const CURRENT = {
    table: undefined,
    logs: []
};
exports.output = ({ table, log }) => {
    if (!table) {
        return void (Array.isArray(log) ? log.map(console.log) : console.log(log));
    }
    if (log)
        CURRENT.logs.push(...log);
    CURRENT.table = table;
    log_update_1.default(CURRENT.logs.join("\n").concat(table));
};
//# sourceMappingURL=output.js.map