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
exports.CategoryController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const category_dto_1 = require("../../../types/category.dto");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const category_provider_1 = require("../../../provider/category/category.provider");
const isr_provider_1 = require("../../../provider/isr/isr.provider");
const config_1 = require("../../../config");
const token_1 = require("../../../provider/swagger/token");
let CategoryController = class CategoryController {
    constructor(categoryProvider, isrProvider) {
        this.categoryProvider = categoryProvider;
        this.isrProvider = isrProvider;
    }
    async getAllTags(withDetail) {
        let withAllData = false;
        if (withDetail && withDetail == 'true')
            withAllData = true;
        const data = await this.categoryProvider.getAllCategories(withAllData);
        return {
            statusCode: 200,
            data,
        };
    }
    async getArticlesByName(name) {
        const data = await this.categoryProvider.getArticlesByCategory(name, true);
        return {
            statusCode: 200,
            data,
        };
    }
    async createCategory(body) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.categoryProvider.addOne(body.name);
        this.isrProvider.activeAll('创建分类触发增量渲染！');
        return {
            statusCode: 200,
            data,
        };
    }
    async deleteCategory(name) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.categoryProvider.deleteOne(name);
        this.isrProvider.activeAll('删除分类触发增量渲染！');
        return {
            statusCode: 200,
            data,
        };
    }
    async updateCategoryByName(name, updateDto) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.categoryProvider.updateCategoryByName(name, updateDto);
        this.isrProvider.activeAll('更新分类触发增量渲染！');
        return {
            statusCode: 200,
            data,
        };
    }
};
__decorate([
    (0, common_1.Get)('/all'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('detail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAllTags", null);
__decorate([
    (0, common_1.Get)('/:name'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getArticlesByName", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Delete)('/:name'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Put)('/:name'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategoryByName", null);
CategoryController = __decorate([
    (0, swagger_1.ApiTags)('category'),
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    token_1.ApiToken,
    (0, common_1.Controller)('/api/admin/category/'),
    __metadata("design:paramtypes", [category_provider_1.CategoryProvider,
        isr_provider_1.ISRProvider])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map