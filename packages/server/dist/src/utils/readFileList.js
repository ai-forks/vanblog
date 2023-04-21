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
exports.readDir = exports.readDirs = exports.dirSort = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const checkFolder_1 = require("./checkFolder");
var FileType;
(function (FileType) {
    FileType[FileType["directory"] = 0] = "directory";
    FileType[FileType["file"] = 1] = "file";
})(FileType || (FileType = {}));
function dirSort(a, b) {
    if (a.type !== b.type)
        return FileType[a.type] < FileType[b.type] ? -1 : 1;
    else if (a.mtime !== b.mtime)
        return a.mtime > b.mtime ? -1 : 1;
}
exports.dirSort = dirSort;
function readDirs(dir, baseDir = '', blacklist = []) {
    const relativePath = path.relative(baseDir, dir);
    (0, checkFolder_1.checkOrCreate)(dir);
    const files = fs.readdirSync(dir);
    const result = files
        .filter((x) => !blacklist.includes(x))
        .map((file) => {
        const subPath = path.join(dir, file);
        const stats = fs.statSync(subPath);
        const key = path.join(relativePath, file);
        if (stats.isDirectory()) {
            return {
                title: file,
                key,
                type: 'directory',
                parent: relativePath,
                mtime: stats.mtime.getTime(),
                children: readDirs(subPath, baseDir).sort(dirSort),
            };
        }
        return {
            title: file,
            type: 'file',
            isLeaf: true,
            key,
            parent: relativePath,
            mtime: stats.mtime.getTime(),
        };
    });
    return result.sort(dirSort);
}
exports.readDirs = readDirs;
function readDir(dir, baseDir = '', blacklist = []) {
    const relativePath = path.relative(baseDir, dir);
    const files = fs.readdirSync(dir);
    const result = files
        .filter((x) => !blacklist.includes(x))
        .map((file) => {
        const subPath = path.join(dir, file);
        const stats = fs.statSync(subPath);
        const key = path.join(relativePath, file);
        return {
            title: file,
            type: stats.isDirectory() ? 'directory' : 'file',
            key,
            parent: relativePath,
        };
    });
    return result;
}
exports.readDir = readDir;
//# sourceMappingURL=readFileList.js.map