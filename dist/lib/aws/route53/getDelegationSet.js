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
exports.getDelegationSet = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:lib:aws:route53:getDelegationSet" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const config_1 = require("../../../config");
const getHostedZoneForDomain_1 = require("./getHostedZoneForDomain");
const CALLER_REFERENCE = "nomad-devops-delegation-set";
exports.getDelegationSet = () => __awaiter(void 0, void 0, void 0, function* () {
    const existing = [];
    let Marker;
    do {
        const { DelegationSets, NextMarker } = yield config_1.config.route53
            .listReusableDelegationSets({ Marker })
            .promise();
        debug("NextMarker: ", NextMarker);
        existing.push(...((DelegationSets === null || DelegationSets === void 0 ? void 0 : DelegationSets.length) ? DelegationSets : []));
        Marker = NextMarker;
    } while (!!Marker);
    debug("existing DelegationSets: ", existing);
    const delegationSet = existing.find(set => set.CallerReference === CALLER_REFERENCE);
    debug("DelegationSet: ", delegationSet);
    if (delegationSet)
        return delegationSet;
    const request = {
        CallerReference: CALLER_REFERENCE
    };
    const hostedZoneId = yield getHostedZoneForDomain_1.getHostedZoneForDomain(config_1.config.ROOT_DOMAIN);
    if (hostedZoneId === null || hostedZoneId === void 0 ? void 0 : hostedZoneId.Id)
        request.HostedZoneId = hostedZoneId.Id.split("/").pop();
    debug("CreateDelegationSetRequest: ", request);
    const { DelegationSet } = yield config_1.config.route53.createReusableDelegationSet(request).promise();
    return DelegationSet;
});
//# sourceMappingURL=getDelegationSet.js.map