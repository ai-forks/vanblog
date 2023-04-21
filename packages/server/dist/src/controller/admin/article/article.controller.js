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
exports.ArticleController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("../../../config");
const article_dto_1 = require("../../../types/article.dto");
const article_provider_1 = require("../../../provider/article/article.provider");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const isr_provider_1 = require("../../../provider/isr/isr.provider");
const pipeline_provider_1 = require("../../../provider/pipeline/pipeline.provider");
const token_1 = require("../../../provider/swagger/token");
let ArticleController = class ArticleController {
    constructor(articleProvider, isrProvider, pipelineProvider) {
        this.articleProvider = articleProvider;
        this.isrProvider = isrProvider;
        this.pipelineProvider = pipelineProvider;
    }
    async getByOption(page, pageSize = 5, toListView = false, regMatch = true, category, tags, title, sortCreatedAt, sortTop, sortViewer, startTime, endTime) {
        const option = {
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            category,
            tags,
            title,
            sortCreatedAt,
            sortTop,
            startTime,
            endTime,
            toListView,
            regMatch,
            sortViewer,
        };
        const data = await this.articleProvider.getByOption(option, false);
        return {
            statusCode: 200,
            data,
        };
    }
    async getOneByIdOrPathname(id) {
        const data = await this.articleProvider.getByIdOrPathname(id, 'admin');
        return {
            statusCode: 200,
            data,
        };
    }
    async update(id, updateDto) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改文章！',
            };
        }
        const result = await this.pipelineProvider.dispatchEvent('beforeUpdateArticle', updateDto);
        if (result.length > 0) {
            const lastResult = result[result.length - 1];
            const lastOuput = lastResult.output;
            if (lastOuput) {
                updateDto = lastOuput;
            }
        }
        const data = await this.articleProvider.updateById(id, updateDto);
        this.isrProvider.activeAll('更新文章触发增量渲染！', undefined, {
            postId: id,
        });
        const updatedArticle = await this.articleProvider.getById(id, 'admin');
        this.pipelineProvider.dispatchEvent('afterUpdateArticle', updatedArticle);
        return {
            statusCode: 200,
            data,
        };
    }
    async create(req, createDto) {
        var _a;
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止创建文章！',
            };
        }
        const author = ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.nickname) || undefined;
        if (!createDto.author) {
            createDto.author = author;
        }
        const result = await this.pipelineProvider.dispatchEvent('beforeUpdateArticle', createDto);
        if (result.length > 0) {
            const lastResult = result[result.length - 1];
            const lastOuput = lastResult.output;
            if (lastOuput) {
                createDto = lastOuput;
            }
        }
        const data = await this.articleProvider.create(createDto);
        this.isrProvider.activeAll('创建文章触发增量渲染！', undefined, {
            postId: data.id,
        });
        this.pipelineProvider.dispatchEvent('afterUpdateArticle', data);
        return {
            statusCode: 200,
            data,
        };
    }
    async searchArtcilesByLink(searchDto) {
        const data = await this.articleProvider.searchArticlesByLink((searchDto === null || searchDto === void 0 ? void 0 : searchDto.link) || '');
        return {
            statusCode: 200,
            data,
        };
    }
    async delete(id) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return { statusCode: 401, message: '演示站禁止删除文章！' };
        }
        const toDeleteArticle = await this.articleProvider.getById(id, 'admin');
        this.pipelineProvider.dispatchEvent('deleteArticle', toDeleteArticle);
        const data = await this.articleProvider.deleteById(id);
        this.isrProvider.activeAll('删除文章触发增量渲染！', undefined, {
            postId: id,
        });
        return {
            statusCode: 200,
            data,
        };
    }
};
__decorate([
    (0, common_1.Get)('/'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Query)('toListView')),
    __param(3, (0, common_1.Query)('regMatch')),
    __param(4, (0, common_1.Query)('category')),
    __param(5, (0, common_1.Query)('tags')),
    __param(6, (0, common_1.Query)('title')),
    __param(7, (0, common_1.Query)('sortCreatedAt')),
    __param(8, (0, common_1.Query)('sortTop')),
    __param(9, (0, common_1.Query)('sortViewer')),
    __param(10, (0, common_1.Query)('startTime')),
    __param(11, (0, common_1.Query)('endTime')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getByOption", null);
__decorate([
    (0, common_1.Get)('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getOneByIdOrPathname", null);
__decorate([
    (0, common_1.Put)('/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, article_dto_1.UpdateArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('searchByLink'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "searchArtcilesByLink", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "delete", null);
ArticleController = __decorate([
    (0, swagger_1.ApiTags)('article'),
    token_1.ApiToken,
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    (0, common_1.Controller)('/api/admin/article'),
    __metadata("design:paramtypes", [article_provider_1.ArticleProvider,
        isr_provider_1.ISRProvider,
        pipeline_provider_1.PipelineProvider])
], ArticleController);
exports.ArticleController = ArticleController;
