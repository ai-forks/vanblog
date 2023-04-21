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
var InitProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitProvider = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const waline_provider_1 = require("../waline/waline.provider");
const setting_provider_1 = require("../setting/setting.provider");
const loadConfig_1 = require("../../utils/loadConfig");
const crypto_1 = require("../../utils/crypto");
const menu_dto_1 = require("../../types/menu.dto");
const cache_provider_1 = require("../cache/cache.provider");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const website_provider_1 = require("../website/website.provider");
let InitProvider = InitProvider_1 = class InitProvider {
    constructor(metaModel, userModel, categoryModal, customPageModal, walineProvider, settingProvider, cacheProvider, websiteProvider) {
        this.metaModel = metaModel;
        this.userModel = userModel;
        this.categoryModal = categoryModal;
        this.customPageModal = customPageModal;
        this.walineProvider = walineProvider;
        this.settingProvider = settingProvider;
        this.cacheProvider = cacheProvider;
        this.websiteProvider = websiteProvider;
        this.logger = new common_1.Logger(InitProvider_1.name);
    }
    async init(initDto) {
        const { user, siteInfo } = initDto;
        let toUpdateDto = siteInfo;
        if (!siteInfo.since) {
            toUpdateDto = Object.assign(Object.assign({}, siteInfo), { since: new Date() });
        }
        try {
            const salt = (0, crypto_1.makeSalt)();
            await this.userModel.create({
                id: 0,
                name: user.username,
                password: (0, crypto_1.encryptPassword)(user.username, user.password, salt),
                mickname: (user === null || user === void 0 ? void 0 : user.nickname) || user.username,
                type: 'admin',
                salt,
            });
            await this.metaModel.create({
                siteInfo: toUpdateDto,
                links: [],
                socials: [],
                rewards: [],
                about: {
                    updatedAt: new Date(),
                    content: '',
                },
                categories: [],
            });
            await this.settingProvider.updateMenuSetting({ data: menu_dto_1.defaultMenu });
            this.walineProvider.init();
            this.websiteProvider.restart('初始化');
            return '初始化成功!';
        }
        catch (err) {
            throw new common_1.BadRequestException('初始化失败');
        }
    }
    async checkHasInited() {
        const user = await this.userModel.findOne({}).exec();
        if (!user) {
            return false;
        }
        return true;
    }
    async initRestoreKey() {
        const key = (0, crypto_1.makeSalt)();
        await this.cacheProvider.set('restoreKey', key);
        const filePath = path_1.default.join('/var/log/', 'restore.key');
        try {
            fs_1.default.writeFileSync(filePath, key, { encoding: 'utf-8' });
        }
        catch (err) {
            this.logger.error('写入恢复密钥到文件失败！');
        }
        this.logger.warn(`忘记密码恢复密钥为： ${key}\n 注意此密钥也会同时写入到日志目录中的 restore.key 文件中，每次重启 vanblog 或老密钥被使用时都会重新生成此密钥`);
    }
    async washStaticSetting() {
        const staticSetting = await this.settingProvider.getStaticSetting();
        console.log(staticSetting);
        if (staticSetting && staticSetting.enableWebp === undefined) {
            this.logger.log('新版本自动开启图床压缩功能');
            await this.settingProvider.updateStaticSetting({
                enableWebp: true,
            });
        }
    }
    async washCustomPage() {
        const all = await this.customPageModal.find({
            type: {
                $exists: false,
            },
        });
        if (all && all.length) {
            for (const each of all) {
                this.logger.log(`清洗老版本自定义页面数据：${each.name}`);
                await this.customPageModal.updateOne({
                    _id: each._id,
                }, {
                    type: 'file',
                });
            }
        }
    }
    async washCategory() {
        const meta = await this.metaModel.findOne();
        const categoryInMeta = (meta === null || meta === void 0 ? void 0 : meta.categories) || [];
        const data = await this.categoryModal.find({});
        if (!data.length && !!categoryInMeta.length) {
            this.logger.warn('版本升级，自动清洗分类数据！');
            let i = 1;
            for (const c of categoryInMeta) {
                await this.categoryModal.create({
                    id: i,
                    name: c,
                    type: 'category',
                    private: false,
                    password: '',
                });
                i = i + 1;
            }
            this.logger.warn(`清洗完成！共 ${i} 条！`);
        }
    }
    async initVersion() {
        if (!loadConfig_1.version || loadConfig_1.version == 'dev') {
            this.logger.debug('开发版本');
            return;
        }
        try {
            const versionSetting = await this.settingProvider.getVersionSetting();
            if (!versionSetting || !(versionSetting === null || versionSetting === void 0 ? void 0 : versionSetting.version)) {
                await this.settingProvider.updateVersionSetting({
                    version: loadConfig_1.version,
                });
            }
            else {
                await this.settingProvider.updateVersionSetting({
                    version: loadConfig_1.version,
                });
            }
        }
        catch (err) {
            this.logger.error(`初始化版本信息失败: ${JSON.stringify(err, null, 2)}`);
        }
    }
};
InitProvider = InitProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Meta')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)('Category')),
    __param(3, (0, mongoose_1.InjectModel)('CustomPage')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        waline_provider_1.WalineProvider,
        setting_provider_1.SettingProvider,
        cache_provider_1.CacheProvider,
        website_provider_1.WebsiteProvider])
], InitProvider);
exports.InitProvider = InitProvider;
