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
exports.MenuMetaController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const isr_provider_1 = require("../../../provider/isr/isr.provider");
const config_1 = require("../../../config");
const setting_provider_1 = require("../../../provider/setting/setting.provider");
const token_1 = require("../../../provider/swagger/token");
let MenuMetaController = class MenuMetaController {
    constructor(settingProvider, isrProvider) {
        this.settingProvider = settingProvider;
        this.isrProvider = isrProvider;
    }
    async get() {
        const data = await this.settingProvider.getMenuSetting();
        return {
            statusCode: 200,
            data,
        };
    }
    async update(dto) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        await this.settingProvider.updateMenuSetting(dto);
        const data = await this.isrProvider.activeAll('更新导航栏配置触发增量渲染！');
        return {
            statusCode: 200,
            data,
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuMetaController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MenuMetaController.prototype, "update", null);
MenuMetaController = __decorate([
    (0, swagger_1.ApiTags)('menu'),
    token_1.ApiToken,
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    (0, common_1.Controller)('/api/admin/meta/menu'),
    __metadata("design:paramtypes", [setting_provider_1.SettingProvider,
        isr_provider_1.ISRProvider])
], MenuMetaController);
exports.MenuMetaController = MenuMetaController;
//# sourceMappingURL=menu.meta.controller.js.map