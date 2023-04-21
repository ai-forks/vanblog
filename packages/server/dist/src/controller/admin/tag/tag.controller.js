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
exports.TagController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("../../../config");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const isr_provider_1 = require("../../../provider/isr/isr.provider");
const token_1 = require("../../../provider/swagger/token");
const tag_provider_1 = require("../../../provider/tag/tag.provider");
let TagController = class TagController {
    constructor(tagProvider, isrProvider) {
        this.tagProvider = tagProvider;
        this.isrProvider = isrProvider;
    }
    async getAllTags() {
        const data = await this.tagProvider.getAllTags(true);
        return {
            statusCode: 200,
            data,
        };
    }
    async getArticlesByTagName(name) {
        const data = await this.tagProvider.getArticlesByTag(name, true);
        return {
            statusCode: 200,
            data,
        };
    }
    async updateTagByName(name, newName) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.tagProvider.updateTagByName(name, newName);
        this.isrProvider.activeAll('批量更新标签名触发增量渲染！');
        return {
            statusCode: 200,
            data,
        };
    }
    async deleteTagByName(name) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.tagProvider.deleteOne(name);
        this.isrProvider.activeAll('批量删除标签触发增量渲染！');
        return {
            statusCode: 200,
            data,
        };
    }
};
__decorate([
    (0, common_1.Get)('/all'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TagController.prototype, "getAllTags", null);
__decorate([
    (0, common_1.Get)('/:name'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "getArticlesByTagName", null);
__decorate([
    (0, common_1.Put)('/:name'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Query)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "updateTagByName", null);
__decorate([
    (0, common_1.Delete)('/:name'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "deleteTagByName", null);
TagController = __decorate([
    (0, swagger_1.ApiTags)('tag'),
    token_1.ApiToken,
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    (0, common_1.Controller)('/api/admin/tag/'),
    __metadata("design:paramtypes", [tag_provider_1.TagProvider,
        isr_provider_1.ISRProvider])
], TagController);
exports.TagController = TagController;
//# sourceMappingURL=tag.controller.js.map