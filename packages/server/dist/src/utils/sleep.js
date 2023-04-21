"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
const sleep = (delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, delay);
    });
};
exports.sleep = sleep;
//# sourceMappingURL=sleep.js.map