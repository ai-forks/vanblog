"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressImgToWebp = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const compressImgToWebp = async (srcImage) => {
    const filenameTemp = `temp${Date.now()}`;
    const p = `/tmp/${filenameTemp}`;
    const o = `/tmp/${filenameTemp}.webp`;
    (0, fs_1.writeFileSync)(p, srcImage);
    (0, child_process_1.execSync)(`cwebp -q 80 ${p} -o ${o}`);
    const f = (0, fs_1.readFileSync)(o);
    (0, fs_1.rmSync)(p);
    (0, fs_1.rmSync)(o);
    return f;
};
exports.compressImgToWebp = compressImgToWebp;
//# sourceMappingURL=webp.js.map