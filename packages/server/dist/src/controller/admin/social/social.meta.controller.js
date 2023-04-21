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
exports.SocialMetaController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const social_dto_1 = require("../../../types/social.dto");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const isr_provider_1 = require("../../../provider/isr/isr.provider");
const meta_provider_1 = require("../../../provider/meta/meta.provider");
const config_1 = require("../../../config");
const website_provider_1 = require("../../../provider/website/website.provider");
const token_1 = require("../../../provider/swagger/token");
let SocialMetaController = class SocialMetaController {
    constructor(metaProvider, isrProvider, websiteProvider) {
        this.metaProvider = metaProvider;
        this.isrProvider = isrProvider;
        this.websiteProvider = websiteProvider;
    }
    async get() {
        const data = await this.metaProvider.getSocials();
        return {
            statusCode: 200,
            data,
        };
    }
    async getTypes() {
        const data = await this.metaProvider.getSocialTypes();
        return {
            statusCode: 200,
            data,
        };
    }
    async update(updateDto) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.metaProvider.addOrUpdateSocial(updateDto);
        this.isrProvider.activeAll('更新联系方式触发增量渲染！');
        return {
            statusCode: 200,
            data,
        };
    }
    async create(updateDto) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.metaProvider.addOrUpdateSocial(updateDto);
        this.isrProvider.activeAll('创建联系方式触发增量渲染！');
        return {
            statusCode: 200,
            data,
        };
    }
    async delete(type) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.metaProvider.deleteSocial(type);
        this.isrProvider.activeAll('删除联系方式触发增量渲染！');
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
], SocialMetaController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('/types'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SocialMetaController.prototype, "getTypes", null);
__decorate([
    (0, common_1.Put)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [social_dto_1.SocialDto]),
    __metadata("design:returntype", Promise)
], SocialMetaController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [social_dto_1.SocialDto]),
    __metadata("design:returntype", Promise)
], SocialMetaController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('/:type'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocialMetaController.prototype, "delete", null);
SocialMetaController = __decorate([
    (0, swagger_1.ApiTags)('social'),
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    token_1.ApiToken,
    (0, common_1.Controller)('/api/admin/meta/social'),
    __metadata("design:paramtypes", [meta_provider_1.MetaProvider,
        isr_provider_1.ISRProvider,
        website_provider_1.WebsiteProvider])
], SocialMetaController);
exports.SocialMetaController = SocialMetaController;
//# sourceMappingURL=social.meta.controller.js.map