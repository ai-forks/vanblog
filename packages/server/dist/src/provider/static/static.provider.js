"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticProvider = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const crypto_1 = require("../../utils/crypto");
const article_provider_1 = require("../article/article.provider");
const setting_provider_1 = require("../setting/setting.provider");
const local_provider_1 = require("./local.provider");
const picgo_provider_1 = require("./picgo.provider");
const image_size_1 = require("image-size");
const size_1 = require("../../utils/size");
const axios_1 = __importDefault(require("axios"));
const watermark_1 = require("../../utils/watermark");
const checkTrue_1 = require("../../utils/checkTrue");
const webp_1 = require("../../utils/webp");
let StaticProvider = class StaticProvider {
    constructor(staticModel, settingProvider, localProvider, picgoProvider, articleProvder) {
        this.staticModel = staticModel;
        this.settingProvider = settingProvider;
        this.localProvider = localProvider;
        this.picgoProvider = picgoProvider;
        this.articleProvder = articleProvder;
        this.publicView = {
            _id: 0,
        };
        this.adminView = undefined;
    }
    getView(view) {
        if (view == 'admin') {
            return this.adminView;
        }
        return this.publicView;
    }
    async upload(file, type, isFavicon, customPathname, updateConfig) {
        const { buffer } = file;
        let buf = buffer;
        let currentSign = (0, crypto_1.encryptFileMD5)(buf);
        const staticConfigInDB = await this.settingProvider.getStaticSetting();
        if (type == 'img') {
            if (updateConfig && updateConfig.withWaterMark) {
                const waterMarkConfigInDB = staticConfigInDB;
                if (waterMarkConfigInDB &&
                    (0, checkTrue_1.checkTrue)(waterMarkConfigInDB === null || waterMarkConfigInDB === void 0 ? void 0 : waterMarkConfigInDB.enableWaterMark)) {
                    const waterMarkText = updateConfig.waterMarkText || waterMarkConfigInDB.waterMarkText;
                    if (waterMarkText && waterMarkText.trim() !== '') {
                        buf = await (0, watermark_1.addWaterMarkToIMG)(buffer, waterMarkText);
                        currentSign = (0, crypto_1.encryptFileMD5)(buf);
                    }
                }
            }
            if ((0, checkTrue_1.checkTrue)(staticConfigInDB.enableWebp)) {
                buf = await (0, webp_1.compressImgToWebp)(buf);
                currentSign = (0, crypto_1.encryptFileMD5)(buf);
            }
            const hasFile = await this.getOneBySign(currentSign);
            if (hasFile) {
                return {
                    src: hasFile.realPath,
                    isNew: false,
                };
            }
        }
        const arr = file.originalname.split('.');
        const fileType = arr[arr.length - 1];
        const pureFileName = arr.slice(0, arr.length - 1).join('.');
        let fileName = currentSign + '.' + file.originalname;
        if (type == 'customPage') {
            fileName = customPathname + '/' + file.originalname;
        }
        if (type == 'img' && (0, checkTrue_1.checkTrue)(staticConfigInDB.enableWebp)) {
            fileName = currentSign + '.' + pureFileName + '.webp';
        }
        const realPath = await this.saveFile(fileType, isFavicon ? `favicon.${fileType}` : fileName, buf, type, currentSign, isFavicon);
        if (!realPath) {
            throw new common_1.HttpException('上传失败', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {
            src: realPath,
            isNew: true,
        };
    }
    async importItems(items) {
        for (const each of items) {
            const oldItem = await this.getOneBySign(each.sign);
            if (!oldItem) {
                await this.createInDB(each);
            }
            else {
                this.staticModel.updateOne({ _id: oldItem._id }, { each });
            }
        }
    }
    async fetchImg(link) {
        try {
            const res = await (0, axios_1.default)({
                method: 'GET',
                url: encodeURI(link),
                responseType: 'arraybuffer',
            });
            return res.data;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
    async getImgInfoByLink(link) {
        var _a;
        const buffer = await this.fetchImg(link);
        if (!buffer) {
            return null;
        }
        const result = (0, image_size_1.imageSize)(buffer);
        const meta = Object.assign(Object.assign({}, result), { size: (0, size_1.formatBytes)(buffer.byteLength) });
        const filename = link.split('/').pop();
        const fileType = ((_a = filename === null || filename === void 0 ? void 0 : filename.split('.')) === null || _a === void 0 ? void 0 : _a.pop()) || '';
        const currentSign = (0, crypto_1.encryptFileMD5)(buffer);
        return {
            meta,
            staticType: 'img',
            storageType: 'picgo',
            fileType: (result === null || result === void 0 ? void 0 : result.type) || fileType,
            realPath: link,
            name: filename,
            sign: currentSign,
        };
    }
    async scanLinksOfArticles() {
        const linkObjs = await this.articleProvder.getAllImageLinks();
        const errorLinks = [];
        let total = 0;
        for (const linkObj of linkObjs) {
            const links = linkObj.links;
            for (const link of links) {
                total = total + 1;
                const dto = await this.getImgInfoByLink(link);
                if (!dto) {
                    errorLinks.push({
                        artcileId: linkObj.articleId,
                        title: linkObj.title,
                        link,
                    });
                }
                else {
                    const hasPicture = await this.getOneBySign((dto === null || dto === void 0 ? void 0 : dto.sign) || '');
                    console.log(link, dto);
                    if (!hasPicture) {
                        await this.createInDB(dto);
                    }
                }
            }
        }
        return { total: total, errorLinks };
    }
    async exportAllImg() {
        const storageSetting = await this.settingProvider.getStaticSetting();
        const storageType = (storageSetting === null || storageSetting === void 0 ? void 0 : storageSetting.storageType) || 'local';
        if (storageType == 'local') {
            const { success, path } = await this.localProvider.exportAllImg();
            if (success && path) {
                return path;
            }
            else {
                throw new common_1.HttpException({ statusCode: 500, message: '打包错误！' }, 500);
            }
        }
        else {
            throw new common_1.NotImplementedException('其他图床暂不支持打包导出！');
        }
    }
    async saveFile(fileType, fileName, buffer, type, sign, toRootPath) {
        var _a;
        const storageSetting = await this.settingProvider.getStaticSetting();
        let storageType = (storageSetting === null || storageSetting === void 0 ? void 0 : storageSetting.storageType) || 'local';
        if (type == 'customPage') {
            storageType = 'local';
        }
        switch (storageType) {
            case 'local':
                const { realPath, meta } = await this.localProvider.saveFile(fileName, buffer, type, toRootPath);
                if (type != 'customPage') {
                    await this.createInDB({
                        fileType: (meta === null || meta === void 0 ? void 0 : meta.type) || fileType,
                        staticType: type,
                        storageType: storageType,
                        sign,
                        name: fileName,
                        realPath,
                        meta,
                    });
                }
                return realPath;
            case 'picgo':
                const picgoRes = await this.picgoProvider.saveFile(fileName, buffer, type);
                await this.createInDB({
                    fileType: ((_a = picgoRes.meta) === null || _a === void 0 ? void 0 : _a.type) || fileType,
                    staticType: type,
                    storageType: storageType,
                    sign,
                    name: fileName,
                    realPath: picgoRes.realPath,
                    meta: picgoRes.meta,
                });
                return picgoRes.realPath;
        }
    }
    async createInDB(dto) {
        const newModal = new this.staticModel(dto);
        return await newModal.save();
    }
    async getOneBySign(sign) {
        return await this.staticModel.findOne({ sign }).exec();
    }
    async getAll(type, view) {
        return await this.staticModel
            .find({ staticType: type }, this.getView(view))
            .exec();
    }
    async exportAll() {
        return await this.staticModel.find({}, this.getView('public')).exec();
    }
    async getByOption(option) {
        const query = {};
        if (option.staticType) {
            query.staticType = option.staticType;
        }
        const total = await this.staticModel.count(query);
        const items = await this.staticModel
            .find(query, this.getView(option.view))
            .sort({ updatedAt: -1 })
            .limit(option.pageSize)
            .skip(option.page * option.pageSize - option.pageSize);
        return {
            total,
            data: items,
        };
    }
    async deleteCustomPage(path) {
        const folderName = path.replace('/', '');
        await this.localProvider.deleteCustomPageFolder(folderName);
    }
    async getFolderFiles(path) {
        return this.localProvider.getFolderFiles(path);
    }
    async getFileContent(path, subPath) {
        return this.localProvider.getFileContent(path, subPath);
    }
    async createFile(path, subPath) {
        return this.localProvider.createFile(path, subPath);
    }
    async createFolder(path, subPath) {
        return this.localProvider.createFolder(path, subPath);
    }
    async updateCustomPageFileContent(pathname, filePath, content) {
        return this.localProvider.updateCustomPageFileContent(pathname, filePath, content);
    }
    async deleteOneBySign(sign) {
        const toDeleteData = await this.staticModel.findOne({ sign }).exec();
        const storageType = toDeleteData.storageType;
        switch (storageType) {
            case 'local':
                await this.localProvider.deleteFile(toDeleteData.name, toDeleteData.staticType);
                break;
            case 'picgo':
                console.log('实际上只删了数据库，网盘上还有的。');
        }
        return await this.staticModel.deleteOne({ sign }).exec();
    }
    async deleteAllIMG() {
        const all = await this.getAll('img', 'admin');
        for (const each of all) {
            await this.deleteOneBySign(each.sign);
        }
    }
};
StaticProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Static')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        setting_provider_1.SettingProvider,
        local_provider_1.LocalProvider,
        picgo_provider_1.PicgoProvider,
        article_provider_1.ArticleProvider])
], StaticProvider);
exports.StaticProvider = StaticProvider;
