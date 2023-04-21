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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalProvider = void 0;
const common_1 = require("@nestjs/common");
const setting_dto_1 = require("../../types/setting.dto");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const config_1 = require("../../config");
const image_size_1 = require("image-size");
const size_1 = require("../../utils/size");
const isProd_1 = require("../../utils/isProd");
const compressing_1 = __importDefault(require("compressing"));
const dayjs_1 = __importDefault(require("dayjs"));
const checkFolder_1 = require("../../utils/checkFolder");
const deleteFolder_1 = require("../../utils/deleteFolder");
const readFileList_1 = require("../../utils/readFileList");
const checkFile_1 = require("../../utils/checkFile");
let LocalProvider = class LocalProvider {
    async saveFile(fileName, buffer, type, toRootPath) {
        if (type == 'img') {
            return await this.saveImg(fileName, buffer, type, toRootPath);
        }
        else if (type == 'customPage') {
            const storagePath = setting_dto_1.StoragePath[type];
            const realName = fileName;
            const srcPath = path.join(config_1.config.staticPath, storagePath, realName);
            const byteLength = buffer.byteLength;
            const realPath = `/static/${storagePath}/${realName}`;
            (0, checkFolder_1.checkOrCreateByFilePath)(srcPath);
            fs.writeFileSync(srcPath, buffer);
            const meta = { size: (0, size_1.formatBytes)(byteLength) };
            return {
                meta,
                realPath,
            };
        }
    }
    async getFolderFiles(p) {
        const storagePath = setting_dto_1.StoragePath['customPage'];
        const absPath = path.join(config_1.config.staticPath, storagePath, p.replace('/', ''));
        const res = (0, readFileList_1.readDirs)(absPath, absPath);
        return res;
    }
    async createFile(p, subPath) {
        const storagePath = setting_dto_1.StoragePath['customPage'];
        let absPath = '';
        if (subPath && subPath != '') {
            absPath = path.join(config_1.config.staticPath, storagePath, p.replace('/', ''), subPath);
        }
        else {
            absPath = path.join(config_1.config.staticPath, storagePath, p.replace('/', ''));
        }
        (0, checkFile_1.checkOrCreateFile)(absPath);
    }
    async createFolder(p, subPath) {
        const storagePath = setting_dto_1.StoragePath['customPage'];
        let absPath = '';
        if (subPath && subPath != '') {
            absPath = path.join(config_1.config.staticPath, storagePath, p.replace('/', ''), subPath);
        }
        else {
            absPath = path.join(config_1.config.staticPath, storagePath, p.replace('/', ''));
        }
        (0, checkFolder_1.checkOrCreate)(absPath);
    }
    async getFileContent(p, subPath) {
        const storagePath = setting_dto_1.StoragePath['customPage'];
        let absPath = '';
        if (subPath && subPath != '') {
            absPath = path.join(config_1.config.staticPath, storagePath, p.replace('/', ''), subPath);
        }
        else {
            absPath = path.join(config_1.config.staticPath, storagePath, p.replace('/', ''));
        }
        const r = fs.readFileSync(absPath, { encoding: 'utf-8' });
        return r;
    }
    async updateCustomPageFileContent(pathname, filePath, content) {
        const storagePath = setting_dto_1.StoragePath['customPage'];
        const absPath = path.join(config_1.config.staticPath, storagePath, pathname.replace('/', ''), filePath);
        fs.writeFileSync(absPath, content, { encoding: 'utf-8' });
    }
    async saveImg(fileName, buffer, type, toRootPath) {
        const storagePath = setting_dto_1.StoragePath[type] || setting_dto_1.StoragePath['img'];
        const srcPath = path.join(config_1.config.staticPath, storagePath, fileName);
        let realPath = `/static/${type}/${fileName}`;
        if ((0, isProd_1.isProd)()) {
            if (toRootPath) {
                realPath = `/${fileName}`;
            }
        }
        const result = (0, image_size_1.imageSize)(buffer);
        const byteLength = buffer.byteLength;
        fs.writeFileSync(srcPath, buffer);
        const meta = Object.assign(Object.assign({}, result), { size: (0, size_1.formatBytes)(byteLength) });
        return {
            meta,
            realPath,
        };
    }
    async deleteCustomPageFolder(name) {
        const storagePath = setting_dto_1.StoragePath['customPage'];
        const srcPath = path.join(config_1.config.staticPath, storagePath, name);
        try {
            (0, deleteFolder_1.rmDir)(srcPath);
        }
        catch (err) {
            console.log('删除实际文件夹失败：', name);
        }
    }
    async deleteFile(fileName, type) {
        try {
            const storagePath = setting_dto_1.StoragePath[type] || setting_dto_1.StoragePath['img'];
            const srcPath = path.join(config_1.config.staticPath, storagePath, fileName);
            fs.rmSync(srcPath);
        }
        catch (err) {
            console.log('删除实际文件失败：', fileName, '可能是更新版本后没映射静态文件目录导致的');
        }
    }
    async exportAllImg() {
        const src = path.join(config_1.config.staticPath, 'img');
        const dst = path.join(config_1.config.staticPath, 'export', `export-img-${(0, dayjs_1.default)().format('YYYY-MM-DD')}.zip`);
        const dstSrc = `/static/export/export-img-${(0, dayjs_1.default)().format('YYYY-MM-DD')}.zip`;
        const compressPromise = new Promise((resolve, reject) => {
            compressing_1.default.zip
                .compressDir(src, dst)
                .then((v) => {
                resolve(v);
            })
                .catch((e) => {
                reject(e);
            });
        });
        try {
            const r = await Promise.all([compressPromise]);
            console.log(r);
            return {
                success: true,
                path: dstSrc,
            };
        }
        catch (err) {
            console.log(err);
            return {
                success: false,
                error: err,
            };
        }
    }
};
LocalProvider = __decorate([
    (0, common_1.Injectable)()
], LocalProvider);
exports.LocalProvider = LocalProvider;
