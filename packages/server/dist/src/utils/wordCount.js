"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordCount = void 0;
function wordCount(Words) {
    let iTotal = 0;
    let inum = 0;
    let eTotal = 0;
    let sTotal = 0;
    for (let i = 0; i < Words.length; i++) {
        const c = Words.charAt(i);
        if (c.match(/[\u4e00-\u9fa5]/)) {
            iTotal++;
        }
        if (c.match(/[\u9FA6-\u9fcb]/)) {
            iTotal++;
        }
        if (c.match(/[^\x00-\xff]/)) {
            sTotal++;
        }
        else {
            eTotal++;
        }
        if (c.match(/[0-9]/)) {
            inum++;
        }
    }
    return iTotal + eTotal;
}
exports.wordCount = wordCount;
//# sourceMappingURL=wordCount.js.map