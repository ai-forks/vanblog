"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyDocObj = void 0;
const copyDocObj = (oldObj) => {
    const newObj = {};
    for (const [key, val] of Object.entries(oldObj._doc)) {
        newObj[key] = val;
    }
    return newObj;
};
exports.copyDocObj = copyDocObj;
//# sourceMappingURL=objCopy.js.map