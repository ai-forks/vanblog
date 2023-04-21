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
exports.AboutMetaController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const isr_provider_1 = require("../../../provider/isr/isr.provider");
const meta_provider_1 = require("../../../provider/meta/meta.provider");
const config_1 = require("../../../config");
const token_1 = require("../../../provider/swagger/token");
let AboutMetaController = class AboutMetaController {
    constructor(metaProvider, isrProvider) {
        this.metaProvider = metaProvider;
        this.isrProvider = isrProvider;
    }
    async getAbout() {
        const data = await this.metaProvider.getAbout();
        return {
            statusCode: 200,
            data,
        };
    }
    async updateAbout(updateAboutDto) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.metaProvider.updateAbout(updateAboutDto.content);
        this.isrProvider.activeAbout('更新 about 触发增量渲染！');
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
], AboutMetaController.prototype, "getAbout", null);
__decorate([
    (0, common_1.Put)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AboutMetaController.prototype, "updateAbout", null);
AboutMetaController = __decorate([
    (0, swagger_1.ApiTags)('about'),
    token_1.ApiToken,
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    (0, common_1.Controller)('/api/admin/meta/about'),
    __metadata("design:paramtypes", [meta_provider_1.MetaProvider,
        isr_provider_1.ISRProvider])
], AboutMetaController);
exports.AboutMetaController = AboutMetaController;
//# sourceMappingURL=about.meta.controller.js.map