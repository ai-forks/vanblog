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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../../config/index");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const isr_provider_1 = require("../../../provider/isr/isr.provider");
const setting_provider_1 = require("../../../provider/setting/setting.provider");
const waline_provider_1 = require("../../../provider/waline/waline.provider");
const token_1 = require("../../../provider/swagger/token");
let SettingController = class SettingController {
    constructor(settingProvider, walineProvider, isrProvider) {
        this.settingProvider = settingProvider;
        this.walineProvider = walineProvider;
        this.isrProvider = isrProvider;
    }
    async getStaticSetting() {
        const res = await this.settingProvider.getStaticSetting();
        return {
            statusCode: 200,
            data: res,
        };
    }
    async updateStaticSetting(body) {
        if (index_1.config.demo && index_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const res = await this.settingProvider.updateStaticSetting(body);
        return {
            statusCode: 200,
            data: res,
        };
    }
    async updateWalineSetting(body) {
        if (index_1.config.demo && index_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const res = await this.settingProvider.updateWalineSetting(body);
        await this.walineProvider.restart('更新 waline 设置，');
        return {
            statusCode: 200,
            data: res,
        };
    }
    async getWalineSetting() {
        if (index_1.config.demo && index_1.config.demo == 'true') {
            return {
                statusCode: 200,
                data: null,
            };
        }
        const res = await this.settingProvider.getWalineSetting();
        return {
            statusCode: 200,
            data: res,
        };
    }
    async updateLayoutSetting(body) {
        if (index_1.config.demo && index_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改定制化设置！',
            };
        }
        const res = await this.settingProvider.updateLayoutSetting(body);
        this.isrProvider.activeAll('更新 layout 设置');
        return {
            statusCode: 200,
            data: res,
        };
    }
    async getLayoutSetting() {
        const res = await this.settingProvider.getLayoutSetting();
        return {
            statusCode: 200,
            data: res,
        };
    }
    async updateLoginSetting(body) {
        if (index_1.config.demo && index_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改登录安全策略设置！',
            };
        }
        const res = await this.settingProvider.updateLoginSetting(body);
        return {
            statusCode: 200,
            data: res,
        };
    }
    async getLoginSetting() {
        const res = await this.settingProvider.getLoginSetting();
        return {
            statusCode: 200,
            data: res,
        };
    }
};
__decorate([
    (0, common_1.Get)('static'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "getStaticSetting", null);
__decorate([
    (0, common_1.Put)('static'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "updateStaticSetting", null);
__decorate([
    (0, common_1.Put)('waline'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "updateWalineSetting", null);
__decorate([
    (0, common_1.Get)('waline'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "getWalineSetting", null);
__decorate([
    (0, common_1.Put)('layout'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "updateLayoutSetting", null);
__decorate([
    (0, common_1.Get)('layout'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "getLayoutSetting", null);
__decorate([
    (0, common_1.Put)('login'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "updateLoginSetting", null);
__decorate([
    (0, common_1.Get)('login'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "getLoginSetting", null);
SettingController = __decorate([
    (0, swagger_1.ApiTags)('setting'),
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    token_1.ApiToken,
    (0, common_1.Controller)('/api/admin/setting'),
    __metadata("design:paramtypes", [setting_provider_1.SettingProvider,
        waline_provider_1.WalineProvider,
        isr_provider_1.ISRProvider])
], SettingController);
exports.SettingController = SettingController;
//# sourceMappingURL=setting.controller.js.map