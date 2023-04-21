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
exports.CollaboratorController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("../../../config");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const meta_provider_1 = require("../../../provider/meta/meta.provider");
const token_1 = require("../../../provider/swagger/token");
const token_provider_1 = require("../../../provider/token/token.provider");
const user_provider_1 = require("../../../provider/user/user.provider");
let CollaboratorController = class CollaboratorController {
    constructor(userProvider, metaProvider, tokenProvider) {
        this.userProvider = userProvider;
        this.metaProvider = metaProvider;
        this.tokenProvider = tokenProvider;
    }
    async getAllCollaborators() {
        const data = await this.userProvider.getAllCollaborators();
        return {
            statusCode: 200,
            data: data || [],
        };
    }
    async getAllCollaboratorsList() {
        const siteInfo = await this.metaProvider.getSiteInfo();
        const admin = await this.userProvider.getUser(true);
        const adminUser = {
            name: admin.name,
            nickname: siteInfo.author,
            id: 0,
        };
        const data = await this.userProvider.getAllCollaborators(true);
        return {
            statusCode: 200,
            data: [adminUser, ...data] || [adminUser],
        };
    }
    async deleteCollaboratorById(id) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.userProvider.deleteCollaborator(id);
        await this.tokenProvider.disableAllCollaborator();
        return {
            statusCode: 200,
            data,
        };
    }
    async createCollaborator(dto) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.userProvider.createCollaborator(dto);
        return {
            statusCode: 200,
            data,
        };
    }
    async updateCollaborator(dto) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.userProvider.updateCollaborator(dto);
        await this.tokenProvider.disableAllCollaborator();
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
], CollaboratorController.prototype, "getAllCollaborators", null);
__decorate([
    (0, common_1.Get)('/list'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CollaboratorController.prototype, "getAllCollaboratorsList", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CollaboratorController.prototype, "deleteCollaboratorById", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CollaboratorController.prototype, "createCollaborator", null);
__decorate([
    (0, common_1.Put)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CollaboratorController.prototype, "updateCollaborator", null);
CollaboratorController = __decorate([
    (0, swagger_1.ApiTags)('collaborator'),
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    token_1.ApiToken,
    (0, common_1.Controller)('/api/admin/collaborator/'),
    __metadata("design:paramtypes", [user_provider_1.UserProvider,
        meta_provider_1.MetaProvider,
        token_provider_1.TokenProvider])
], CollaboratorController);
exports.CollaboratorController = CollaboratorController;
//# sourceMappingURL=collaborator.controller.js.map