"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTrue = void 0;
function isTrue(v) {
    if (typeof v == 'string') {
        if (v == 'true') {
            return true;
        }
    }
    if (typeof v == 'boolean') {
        if (v == true) {
            return true;
        }
    }
    return false;
}
exports.isTrue = isTrue;
//# sourceMappingURL=isTrue.js.map