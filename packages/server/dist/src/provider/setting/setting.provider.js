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
var SettingProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingProvider = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const setting_dto_1 = require("../../types/setting.dto");
const picgo_provider_1 = require("../static/picgo.provider");
const js_base64_1 = require("js-base64");
const menu_dto_1 = require("../../types/menu.dto");
const meta_provider_1 = require("../meta/meta.provider");
const htmlParser_1 = require("../../utils/htmlParser");
let SettingProvider = SettingProvider_1 = class SettingProvider {
    constructor(settingModel, picgoProvider, metaProvider) {
        this.settingModel = settingModel;
        this.picgoProvider = picgoProvider;
        this.metaProvider = metaProvider;
        this.logger = new common_1.Logger(SettingProvider_1.name);
    }
    async getStaticSetting() {
        const res = (await this.settingModel
            .findOne({ type: 'static' })
            .exec());
        if (res) {
            return ((res === null || res === void 0 ? void 0 : res.value) || setting_dto_1.defaultStaticSetting);
        }
        else {
            await this.settingModel.create({
                type: 'static',
                value: setting_dto_1.defaultStaticSetting,
            });
            return setting_dto_1.defaultStaticSetting;
        }
    }
    async getVersionSetting() {
        const res = await this.settingModel.findOne({ type: 'version' }).exec();
        if (res) {
            return res === null || res === void 0 ? void 0 : res.value;
        }
        return null;
    }
    async getISRSetting() {
        const res = await this.settingModel.findOne({ type: 'isr' }).exec();
        if (res) {
            return res === null || res === void 0 ? void 0 : res.value;
        }
        else {
            await this.settingModel.create({
                type: 'isr',
                value: {
                    mode: 'onDemand',
                },
            });
            return {
                mode: 'onDemand',
            };
        }
    }
    async updateISRSetting(dto) {
        const oldValue = await this.getISRSetting();
        const newValue = Object.assign(Object.assign({}, oldValue), dto);
        if (!oldValue) {
            return await this.settingModel.create({
                type: 'isr',
                value: newValue,
            });
        }
        const res = await this.settingModel.updateOne({ type: 'isr' }, { value: newValue });
        return res;
    }
    async getMenuSetting() {
        const res = await this.settingModel.findOne({ type: 'menu' }).exec();
        if (res) {
            return res === null || res === void 0 ? void 0 : res.value;
        }
        return null;
    }
    async updateMenuSetting(dto) {
        const oldValue = await this.getMenuSetting();
        const newValue = Object.assign(Object.assign({}, oldValue), dto);
        if (!oldValue) {
            return await this.settingModel.create({
                type: 'menu',
                value: newValue,
            });
        }
        const res = await this.settingModel.updateOne({ type: 'menu' }, { value: newValue });
        return res;
    }
    async importSetting(setting) {
        for (const [k, v] of Object.entries(setting)) {
            if (k == 'static') {
                await this.importStaticSetting(v);
            }
        }
    }
    async importStaticSetting(dto) {
        await this.updateStaticSetting(dto);
    }
    async getHttpsSetting() {
        const res = await this.settingModel.findOne({ type: 'https' }).exec();
        if (res) {
            return (res === null || res === void 0 ? void 0 : res.value) || { redirect: false };
        }
        return null;
    }
    async getLayoutSetting() {
        const res = await this.settingModel.findOne({ type: 'layout' }).exec();
        if (res) {
            return res === null || res === void 0 ? void 0 : res.value;
        }
        return null;
    }
    async getLoginSetting() {
        const res = await this.settingModel.findOne({ type: 'login' }).exec();
        if (res) {
            return ((res === null || res === void 0 ? void 0 : res.value) || {
                enableMaxLoginRetry: false,
                maxRetryTimes: 3,
                durationSeconds: 60,
                expiresIn: 3600 * 24 * 7,
            });
        }
        return null;
    }
    encodeLayoutSetting(dto) {
        if (!dto) {
            return null;
        }
        const res = {};
        for (const key of Object.keys(dto)) {
            if (key == 'head') {
                res[key] = (0, htmlParser_1.parseHtmlToHeadTagArr)(dto[key]);
            }
            else {
                res[key] = (0, js_base64_1.encode)(dto[key]);
            }
        }
        return res;
    }
    async getWalineSetting() {
        const res = await this.settingModel.findOne({ type: 'waline' }).exec();
        if (res) {
            return ((res === null || res === void 0 ? void 0 : res.value) || {
                email: process.env.EMAIL || undefined,
                'smtp.enabled': false,
                forceLoginComment: false,
            });
        }
        return null;
    }
    async updateLoginSetting(dto) {
        const oldValue = await this.getLoginSetting();
        const newValue = Object.assign(Object.assign({}, oldValue), dto);
        if (!oldValue) {
            return await this.settingModel.create({
                type: 'login',
                value: newValue,
            });
        }
        const res = await this.settingModel.updateOne({ type: 'login' }, { value: newValue });
        return res;
    }
    async updateVersionSetting(dto) {
        const oldValue = await this.getVersionSetting();
        const newValue = Object.assign(Object.assign({}, oldValue), dto);
        if (!oldValue) {
            return await this.settingModel.create({
                type: 'version',
                value: newValue,
            });
        }
        const res = await this.settingModel.updateOne({ type: 'version' }, { value: newValue });
        return res;
    }
    async updateWalineSetting(dto) {
        const oldValue = await this.getWalineSetting();
        const newValue = Object.assign(Object.assign({}, oldValue), dto);
        if (!oldValue) {
            return await this.settingModel.create({
                type: 'waline',
                value: newValue,
            });
        }
        const res = await this.settingModel.updateOne({ type: 'waline' }, { value: newValue });
        return res;
    }
    async updateLayoutSetting(dto) {
        const oldValue = await this.getLayoutSetting();
        const newValue = Object.assign(Object.assign({}, oldValue), dto);
        if (!oldValue) {
            return await this.settingModel.create({
                type: 'layout',
                value: newValue,
            });
        }
        const res = await this.settingModel.updateOne({ type: 'layout' }, { value: newValue });
        return res;
    }
    async updateHttpsSetting(dto) {
        const oldValue = await this.getHttpsSetting();
        const newValue = Object.assign(Object.assign({}, oldValue), dto);
        if (!oldValue) {
            return await this.settingModel.create({
                type: 'https',
                value: newValue,
            });
        }
        const res = await this.settingModel.updateOne({ type: 'https' }, { value: newValue });
        return res;
    }
    async updateStaticSetting(dto) {
        const oldValue = await this.getStaticSetting();
        const newValue = Object.assign(Object.assign({}, oldValue), dto);
        if (!oldValue) {
            return await this.settingModel.create({
                type: 'static',
                value: newValue,
            });
        }
        const res = await this.settingModel.updateOne({ type: 'static' }, { value: newValue });
        await this.picgoProvider.initDriver();
        return res;
    }
    async washDefaultMenu() {
        const r = await this.settingModel.findOne({ type: 'menu' });
        if (!r) {
            const toInsert = menu_dto_1.defaultMenu;
            const meta = await this.metaProvider.getAll();
            const oldMenus = meta.menus;
            const d = Date.now();
            oldMenus.forEach((item, index) => {
                toInsert.push({
                    id: d + index,
                    level: 0,
                    name: item.name,
                    value: item.value,
                });
            });
            await this.updateMenuSetting({ data: toInsert });
            this.logger.log('清洗老 menu 数据成功！');
        }
    }
};
SettingProvider = SettingProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Setting')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        picgo_provider_1.PicgoProvider,
        meta_provider_1.MetaProvider])
], SettingProvider);
exports.SettingProvider = SettingProvider;
//# sourceMappingURL=setting.provider.js.map