"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOrCreateByFilePath = exports.checkFolder = exports.checkOrCreate = void 0;
const fs = __importStar(require("fs"));
const checkOrCreate = (p) => {
    try {
        fs.readdirSync(p);
    }
    catch (err) {
        console.log(`${p}不存在，创建。`);
        fs.mkdirSync(p, { recursive: true });
    }
};
exports.checkOrCreate = checkOrCreate;
const checkFolder = (p) => {
    try {
        fs.readdirSync(p);
    }
    catch (err) {
        return false;
    }
    return true;
};
exports.checkFolder = checkFolder;
const checkOrCreateByFilePath = (p) => {
    const folderPathArr = p.split('/');
    folderPathArr.pop();
    const folderPath = folderPathArr.join('/');
    try {
        fs.readdirSync(folderPath);
    }
    catch (err) {
        console.log(`${folderPath}不存在，创建。`);
        fs.mkdirSync(folderPath, { recursive: true });
    }
};
exports.checkOrCreateByFilePath = checkOrCreateByFilePath;
//# sourceMappingURL=checkFolder.js.map