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
exports.PublicController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const article_provider_1 = require("../../provider/article/article.provider");
const category_provider_1 = require("../../provider/category/category.provider");
const meta_provider_1 = require("../../provider/meta/meta.provider");
const setting_provider_1 = require("../../provider/setting/setting.provider");
const tag_provider_1 = require("../../provider/tag/tag.provider");
const visit_provider_1 = require("../../provider/visit/visit.provider");
const loadConfig_1 = require("../../utils/loadConfig");
const customPage_provider_1 = require("../../provider/customPage/customPage.provider");
const js_base64_1 = require("js-base64");
let PublicController = class PublicController {
    constructor(articleProvider, categoryProvider, tagProvider, metaProvider, visitProvider, settingProvider, customPageProvider) {
        this.articleProvider = articleProvider;
        this.categoryProvider = categoryProvider;
        this.tagProvider = tagProvider;
        this.metaProvider = metaProvider;
        this.visitProvider = visitProvider;
        this.settingProvider = settingProvider;
        this.customPageProvider = customPageProvider;
    }
    async getAll() {
        return {
            statusCode: 200,
            data: await this.customPageProvider.getAll(),
        };
    }
    async getOneByPath(path) {
        const data = await this.customPageProvider.getCustomPageByPath(path);
        return {
            statusCode: 200,
            data: Object.assign(Object.assign({}, data), { html: (data === null || data === void 0 ? void 0 : data.html) ? (0, js_base64_1.encode)(data === null || data === void 0 ? void 0 : data.html) : '' }),
        };
    }
    async getArticleByIdOrPathname(id) {
        const data = await this.articleProvider.getByIdOrPathnameWithPreNext(id, 'public');
        return {
            statusCode: 200,
            data: data,
        };
    }
    async getArticleByIdOrPathnameWithPassword(id, body) {
        const data = await this.articleProvider.getByIdWithPassword(id, body === null || body === void 0 ? void 0 : body.password);
        return {
            statusCode: 200,
            data: data,
        };
    }
    async searchArticle(search) {
        const data = await this.articleProvider.searchByString(search, false);
        return {
            statusCode: 200,
            data: {
                total: data.length,
                data: this.articleProvider.toSearchResult(data),
            },
        };
    }
    async addViewer(isNew, isNewByPath, req) {
        const refer = req.headers.referer;
        const url = new URL(refer);
        if (!url.pathname || url.pathname == '') {
            console.log('没找到 refer:', req.headers);
        }
        const data = await this.metaProvider.addViewer(isNew, decodeURIComponent(url.pathname), isNewByPath);
        return {
            statusCode: 200,
            data: data,
        };
    }
    async getViewer() {
        const data = await this.metaProvider.getViewer();
        return {
            statusCode: 200,
            data: data,
        };
    }
    async getViewerByArticleIdOrPathname(id) {
        const data = await this.visitProvider.getByArticleId(id);
        return {
            statusCode: 200,
            data: data,
        };
    }
    async getArticlesByTagName(name) {
        const data = await this.tagProvider.getArticlesByTag(name, false);
        return {
            statusCode: 200,
            data: this.articleProvider.toPublic(data),
        };
    }
    async getByOption(page, pageSize = 5, toListView = false, regMatch = false, withWordCount = false, category, tags, sortCreatedAt, sortTop) {
        const option = {
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            category,
            tags,
            toListView,
            regMatch,
            sortTop,
            sortCreatedAt,
            withWordCount,
        };
        const data = await this.articleProvider.getByOption(option, true);
        return {
            statusCode: 200,
            data,
        };
    }
    async getTimeLineInfo() {
        const data = await this.articleProvider.getTimeLineInfo();
        return {
            statusCode: 200,
            data,
        };
    }
    async getArticlesByCategory() {
        const data = await this.categoryProvider.getCategoriesWithArticle(false);
        return {
            statusCode: 200,
            data,
        };
    }
    async getArticlesByTag() {
        const data = await this.tagProvider.getTagsWithArticle(false);
        return {
            statusCode: 200,
            data,
        };
    }
    async getBuildMeta() {
        const tags = await this.tagProvider.getAllTags(false);
        const meta = await this.metaProvider.getAll();
        const metaDoc = (meta === null || meta === void 0 ? void 0 : meta._doc) || meta;
        const categories = await this.categoryProvider.getAllCategories(false);
        const { data: menus } = await this.settingProvider.getMenuSetting();
        const totalArticles = await this.articleProvider.getTotalNum(false);
        const totalWordCount = await this.metaProvider.getTotalWords();
        const LayoutSetting = await this.settingProvider.getLayoutSetting();
        const LayoutRes = this.settingProvider.encodeLayoutSetting(LayoutSetting);
        const data = Object.assign({ version: loadConfig_1.version, tags, meta: Object.assign(Object.assign({}, metaDoc), { categories }), menus,
            totalArticles,
            totalWordCount }, (LayoutSetting ? { layout: LayoutRes } : {}));
        return {
            statusCode: 200,
            data,
        };
    }
};
__decorate([
    (0, common_1.Get)('/customPage/all'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/customPage'),
    __param(0, (0, common_1.Query)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getOneByPath", null);
__decorate([
    (0, common_1.Get)('/article/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getArticleByIdOrPathname", null);
__decorate([
    (0, common_1.Post)('/article/:id'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getArticleByIdOrPathnameWithPassword", null);
__decorate([
    (0, common_1.Get)('/search'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "searchArticle", null);
__decorate([
    (0, common_1.Post)('/viewer'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Query)('isNew')),
    __param(1, (0, common_1.Query)('isNewByPath')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Boolean, Object]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "addViewer", null);
__decorate([
    (0, common_1.Get)('/viewer'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getViewer", null);
__decorate([
    (0, common_1.Get)('/article/viewer/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getViewerByArticleIdOrPathname", null);
__decorate([
    (0, common_1.Get)('/tag/:name'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getArticlesByTagName", null);
__decorate([
    (0, common_1.Get)('article'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Query)('toListView')),
    __param(3, (0, common_1.Query)('regMatch')),
    __param(4, (0, common_1.Query)('withWordCount')),
    __param(5, (0, common_1.Query)('category')),
    __param(6, (0, common_1.Query)('tags')),
    __param(7, (0, common_1.Query)('sortCreatedAt')),
    __param(8, (0, common_1.Query)('sortTop')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object, Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getByOption", null);
__decorate([
    (0, common_1.Get)('timeline'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getTimeLineInfo", null);
__decorate([
    (0, common_1.Get)('category'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getArticlesByCategory", null);
__decorate([
    (0, common_1.Get)('tag'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getArticlesByTag", null);
__decorate([
    (0, common_1.Get)('/meta'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getBuildMeta", null);
PublicController = __decorate([
    (0, swagger_1.ApiTags)('public'),
    (0, common_1.Controller)('/api/public/'),
    __metadata("design:paramtypes", [article_provider_1.ArticleProvider,
        category_provider_1.CategoryProvider,
        tag_provider_1.TagProvider,
        meta_provider_1.MetaProvider,
        visit_provider_1.VisitProvider,
        setting_provider_1.SettingProvider,
        customPage_provider_1.CustomPageProvider])
], PublicController);
exports.PublicController = PublicController;
