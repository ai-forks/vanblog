"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTrue = void 0;
const checkTrue = (s) => {
    if (!s)
        return false;
    if (s == 'true')
        return true;
    if (s == true)
        return true;
    return false;
};
exports.checkTrue = checkTrue;
