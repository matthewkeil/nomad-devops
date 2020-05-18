"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.methods = void 0;
var ALLOWED_METHODS;
(function (ALLOWED_METHODS) {
    ALLOWED_METHODS[ALLOWED_METHODS["GET"] = 0] = "GET";
    ALLOWED_METHODS[ALLOWED_METHODS["POST"] = 1] = "POST";
    ALLOWED_METHODS[ALLOWED_METHODS["PUT"] = 2] = "PUT";
    ALLOWED_METHODS[ALLOWED_METHODS["PATCH"] = 3] = "PATCH";
    ALLOWED_METHODS[ALLOWED_METHODS["DELETE"] = 4] = "DELETE";
})(ALLOWED_METHODS || (ALLOWED_METHODS = {}));
const methods = new Set();
exports.methods = methods;
for (const method of Object.keys(ALLOWED_METHODS))
    if (isNaN(+method))
        methods.add(method);
//# sourceMappingURL=Method.js.map