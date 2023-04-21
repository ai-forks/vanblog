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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisProvider = void 0;
const common_1 = require("@nestjs/common");
const article_provider_1 = require("../article/article.provider");
const viewer_provider_1 = require("../viewer/viewer.provider");
const meta_provider_1 = require("../meta/meta.provider");
const visit_provider_1 = require("../visit/visit.provider");
const tag_provider_1 = require("../tag/tag.provider");
const category_provider_1 = require("../category/category.provider");
let AnalysisProvider = class AnalysisProvider {
    constructor(metaProvider, articleProvider, viewProvider, visitProvider, tagProvider, categoryProvider) {
        this.metaProvider = metaProvider;
        this.articleProvider = articleProvider;
        this.viewProvider = viewProvider;
        this.visitProvider = visitProvider;
        this.tagProvider = tagProvider;
        this.categoryProvider = categoryProvider;
    }
    async getOverViewTabData(num) {
        const total = {
            wordCount: await this.metaProvider.getTotalWords(),
            articleNum: await this.articleProvider.getTotalNum(true),
        };
        const viewer = await this.viewProvider.getViewerGrid(num);
        const siteInfo = await this.metaProvider.getSiteInfo();
        return {
            total,
            viewer,
            link: {
                baseUrl: siteInfo.baseUrl,
                enableComment: siteInfo.enableComment || 'true',
            },
        };
    }
    async getViewerTabData(num) {
        const siteInfo = await this.metaProvider.getSiteInfo();
        const enableGA = Boolean(siteInfo.gaAnalysisId) && siteInfo.gaAnalysisId != '';
        const enableBaidu = Boolean(siteInfo.baiduAnalysisId) && siteInfo.baiduAnalysisId != '';
        const topViewer = await this.articleProvider.getTopViewer('list', num);
        const topVisited = await this.articleProvider.getTopVisited('list', num);
        const recentVisitArticles = await this.articleProvider.getRecentVisitedArticles(num, 'list');
        let siteLastVisitedTime = null;
        let siteLastVisitedPathname = '';
        const lastVisitItem = await this.visitProvider.getLastVisitItem();
        if (lastVisitItem) {
            siteLastVisitedTime = lastVisitItem.lastVisitedTime;
            siteLastVisitedPathname = lastVisitItem.pathname;
        }
        const { viewer: totalViewer, visited: totalVisited } = await this.metaProvider.getViewer();
        let maxArticleVisited = 0;
        let maxArticleViewer = 0;
        if (topViewer && topViewer.length > 0) {
            maxArticleViewer = topViewer[0].viewer;
        }
        if (topVisited && topVisited.length > 0) {
            maxArticleVisited = topVisited[0].visited;
        }
        return {
            enableGA,
            enableBaidu,
            topViewer,
            topVisited,
            recentVisitArticles,
            siteLastVisitedTime,
            siteLastVisitedPathname,
            totalViewer,
            totalVisited,
            maxArticleVisited,
            maxArticleViewer,
        };
    }
    async getArticleTabData(num) {
        var _a, _b, _c;
        const articleNum = await this.articleProvider.getTotalNum(true);
        const wordNum = await this.metaProvider.getTotalWords();
        const tagNum = ((_a = (await this.tagProvider.getAllTags(true))) === null || _a === void 0 ? void 0 : _a.length) || 0;
        const categoryNum = ((_c = (_b = (await this.metaProvider.getAll())) === null || _b === void 0 ? void 0 : _b.categories) === null || _c === void 0 ? void 0 : _c.length) || 0;
        const categoryPieData = await this.categoryProvider.getPieData();
        const columnData = await this.tagProvider.getColumnData(num, true);
        return {
            articleNum,
            wordNum,
            tagNum,
            categoryNum,
            categoryPieData,
            columnData,
        };
    }
    async getWelcomePageData(tab, overviewDataNum, viewerDataNum, articleTabDataNum) {
        if (tab == 'overview') {
            return await this.getOverViewTabData(overviewDataNum);
        }
        if (tab == 'viewer') {
            return await this.getViewerTabData(viewerDataNum);
        }
        if (tab == 'article') {
            return await this.getArticleTabData(articleTabDataNum);
        }
    }
};
AnalysisProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [meta_provider_1.MetaProvider,
        article_provider_1.ArticleProvider,
        viewer_provider_1.ViewerProvider,
        visit_provider_1.VisitProvider,
        tag_provider_1.TagProvider,
        category_provider_1.CategoryProvider])
], AnalysisProvider);
exports.AnalysisProvider = AnalysisProvider;
