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
exports.ISRController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const isr_provider_1 = require("../../../provider/isr/isr.provider");
const setting_provider_1 = require("../../../provider/setting/setting.provider");
const token_1 = require("../../../provider/swagger/token");
const website_provider_1 = require("../../../provider/website/website.provider");
let ISRController = class ISRController {
    constructor(isrProvider, settingProvider, websiteProvider) {
        this.isrProvider = isrProvider;
        this.settingProvider = settingProvider;
        this.websiteProvider = websiteProvider;
    }
    async activeISR() {
        await this.isrProvider.activeAll('手动触发 ISR', undefined, {
            forceActice: true,
        });
        return {
            statusCode: 200,
            data: '触发成功！',
        };
    }
    async updateISRSetting(dto) {
        await this.settingProvider.updateISRSetting(dto);
        await this.websiteProvider.restart('更新 ISR 配置');
        return {
            statusCode: 200,
            data: '更新成功！',
        };
    }
    async getISRSetting() {
        const data = await this.settingProvider.getISRSetting();
        return {
            statusCode: 200,
            data,
        };
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ISRController.prototype, "activeISR", null);
__decorate([
    (0, common_1.Put)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ISRController.prototype, "updateISRSetting", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ISRController.prototype, "getISRSetting", null);
ISRController = __decorate([
    (0, swagger_1.ApiTags)('isr'),
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    token_1.ApiToken,
    (0, common_1.Controller)('/api/admin/isr'),
    __metadata("design:paramtypes", [isr_provider_1.ISRProvider,
        setting_provider_1.SettingProvider,
        website_provider_1.WebsiteProvider])
], ISRController);
exports.ISRController = ISRController;
//# sourceMappingURL=isr.controller.js.map