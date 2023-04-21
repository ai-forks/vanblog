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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PicgoProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PicgoProvider = void 0;
const common_1 = require("@nestjs/common");
const setting_dto_1 = require("../../types/setting.dto");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const config_1 = require("../../config");
const image_size_1 = require("image-size");
const size_1 = require("../../utils/size");
const picgo_1 = require("picgo");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PicgoProvider = PicgoProvider_1 = class PicgoProvider {
    constructor(settingModel) {
        this.settingModel = settingModel;
        this.logger = new common_1.Logger(PicgoProvider_1.name);
        this.picgo = new picgo_1.PicGo();
        this.initDriver();
    }
    async getSetting() {
        const res = await this.settingModel.findOne({ type: 'static' }).exec();
        if (res) {
            return (res === null || res === void 0 ? void 0 : res.value) || { storageType: 'local', picgoConfig: null };
        }
        return null;
    }
    async initDriver() {
        const staticSetting = await this.getSetting();
        const picgoConfig = staticSetting === null || staticSetting === void 0 ? void 0 : staticSetting.picgoConfig;
        const plugins = staticSetting === null || staticSetting === void 0 ? void 0 : staticSetting.picgoPlugins;
        if (picgoConfig) {
            this.picgo.setConfig(picgoConfig);
        }
        if (plugins) {
            this.installPlugins(plugins.split(','));
        }
    }
    async installPlugins(plugins) {
        if (plugins && plugins.length > 0) {
            this.logger.log(`尝试安装 picgo 插件：${plugins}`);
            const res = this.picgo.pluginHandler.install(plugins);
            res.then((result) => {
                if (result.success) {
                    this.logger.log(`picgo 安装插件成功！${result.body}`);
                }
                else {
                    this.logger.error(`picgo 插件安装失败！${result.body}`);
                }
            });
        }
    }
    async saveFile(fileName, buffer, type) {
        const result = (0, image_size_1.imageSize)(buffer);
        const byteLength = buffer.byteLength;
        const meta = Object.assign(Object.assign({}, result), { size: (0, size_1.formatBytes)(byteLength) });
        // 搞一个临时的
        const srcPath = path.join(config_1.config.staticPath, 'tmp', fileName);
        fs.writeFileSync(srcPath, buffer);
        let realPath = undefined;
        try {
            const res = await this.picgo.upload([srcPath]);
            realPath = res[0].imgUrl;
        }
        catch (err) {
            throw err;
        }
        finally {
            fs.rmSync(srcPath);
        }
        return {
            meta,
            realPath,
        };
    }
    async deleteFile(fileName, type) {
        const storagePath = setting_dto_1.StoragePath[type] || setting_dto_1.StoragePath['img'];
        const srcPath = path.join(config_1.config.staticPath, storagePath, fileName);
        fs.rmSync(srcPath);
    }
};
PicgoProvider = PicgoProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Setting')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PicgoProvider);
exports.PicgoProvider = PicgoProvider;
