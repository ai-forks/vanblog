"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArticle = void 0;
const sortArticle = (data, sortKey, sortDesc) => {
    const t = [];
    for (const each of data) {
        const articleMeta = (each === null || each === void 0 ? void 0 : each._doc) || each;
        t.push(articleMeta);
    }
    return t.sort((a, b) => {
        const keyA = a[sortKey];
        const keyB = b[sortKey];
        if (sortDesc == 'asc') {
            return keyA <= keyB ? -1 : 1;
        }
        else {
            return keyB <= keyA ? -1 : 1;
        }
    });
};
exports.sortArticle = sortArticle;
//# sourceMappingURL=sortArticle.js.map