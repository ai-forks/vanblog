"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rmDir = void 0;
const child_process_1 = require("child_process");
const rmDir = (p) => {
    (0, child_process_1.execSync)(`rm -rf ${p}`);
};
exports.rmDir = rmDir;
//# sourceMappingURL=deleteFolder.js.map