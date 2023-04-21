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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var SiteMapProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteMapProvider = void 0;
const common_1 = require("@nestjs/common");
const article_provider_1 = require("../article/article.provider");
const washUrl_1 = require("../../utils/washUrl");
const customPage_provider_1 = require("../customPage/customPage.provider");
const category_provider_1 = require("../category/category.provider");
const tag_provider_1 = require("../tag/tag.provider");
const meta_provider_1 = require("../meta/meta.provider");
const sitemap_1 = require("sitemap");
const config_1 = require("../../config");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let SiteMapProvider = SiteMapProvider_1 = class SiteMapProvider {
    constructor(articleProvider, categoryProvider, tagProvider, customPageProvider, metaProvider) {
        this.articleProvider = articleProvider;
        this.categoryProvider = categoryProvider;
        this.tagProvider = tagProvider;
        this.customPageProvider = customPageProvider;
        this.metaProvider = metaProvider;
        this.logger = new common_1.Logger(SiteMapProvider_1.name);
        this.timer = null;
    }
    async generateSiteMap(info, delay) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.generateSiteMapFn(info);
        }, delay || 60 * 1000);
    }
    async generateSiteMapFn(info) {
        this.logger.log(info + '重新生成 SiteMap ');
        const pathnames = await this.getSiteUrls();
        const siteInfo = await this.metaProvider.getSiteInfo();
        const baseUrl = (siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.baseUrl) || '';
        const smStream = new sitemap_1.SitemapStream({ hostname: (0, washUrl_1.washUrl)(baseUrl) });
        pathnames.forEach((pathname) => {
            smStream.write({
                url: pathname,
            });
        });
        (0, sitemap_1.streamToPromise)(smStream).then((sm) => {
            const sitemapPath = path_1.default.join(config_1.config.staticPath, 'sitemap');
            fs_1.default.mkdirSync(sitemapPath, { recursive: true });
            fs_1.default.writeFileSync(path_1.default.join(sitemapPath, 'sitemap.xml'), sm);
        });
        smStream.end();
    }
    async getArticleUrls() {
        const articles = await this.articleProvider.getAll('list', false, false);
        return articles.map((a) => {
            return `/post/${a.pathname || a.id}`;
        });
    }
    async getCategoryUrls() {
        const categories = await this.categoryProvider.getAllCategories();
        return categories.map((c) => {
            return `/category/${(0, washUrl_1.encodeQuerystring)(c)}`;
        });
    }
    async getPageUrls() {
        const num = await this.articleProvider.getTotalNum(false);
        const total = Math.ceil(num / 5);
        const paths = [];
        for (let i = 1; i <= total; i++) {
            paths.push(`/page/${i}`);
        }
        return paths;
    }
    async getCustomUrls() {
        const data = await this.customPageProvider.getAll();
        return data.map((c) => {
            return `/c${c.path}`;
        });
    }
    async getTagUrls() {
        const tags = await this.tagProvider.getAllTags(false);
        return tags.map((c) => {
            return `/tag/${(0, washUrl_1.encodeQuerystring)(c)}`;
        });
    }
    async getSiteUrls() {
        let urlList = ['/', '/category', '/tag', '/timeline', '/about', '/link'];
        urlList = urlList.concat(await this.getArticleUrls());
        urlList = urlList.concat(await this.getTagUrls());
        urlList = urlList.concat(await this.getCategoryUrls());
        urlList = urlList.concat(await this.getPageUrls());
        urlList = urlList.concat(await this.getCustomUrls());
        return urlList;
    }
};
SiteMapProvider = SiteMapProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [article_provider_1.ArticleProvider,
        category_provider_1.CategoryProvider,
        tag_provider_1.TagProvider,
        customPage_provider_1.CustomPageProvider,
        meta_provider_1.MetaProvider])
], SiteMapProvider);
exports.SiteMapProvider = SiteMapProvider;
//# sourceMappingURL=sitemap.provider.js.map