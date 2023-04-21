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
var ISRProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISRProvider = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const sleep_1 = require("../../utils/sleep");
const article_provider_1 = require("../article/article.provider");
const rss_provider_1 = require("../rss/rss.provider");
const setting_provider_1 = require("../setting/setting.provider");
const sitemap_provider_1 = require("../sitemap/sitemap.provider");
let ISRProvider = ISRProvider_1 = class ISRProvider {
    constructor(articleProvider, rssProvider, sitemapProvider, settingProvider) {
        this.articleProvider = articleProvider;
        this.rssProvider = rssProvider;
        this.sitemapProvider = sitemapProvider;
        this.settingProvider = settingProvider;
        this.urlList = ['/', '/category', '/tag', '/timeline', '/about', '/link'];
        this.base = 'http://127.0.0.1:3001/api/revalidate?path=';
        this.logger = new common_1.Logger(ISRProvider_1.name);
        this.timer = null;
    }
    async activeAllFn(info, activeConfig) {
        const isrConfig = await this.settingProvider.getISRSetting();
        if ((isrConfig === null || isrConfig === void 0 ? void 0 : isrConfig.mode) == 'delay' && !(activeConfig === null || activeConfig === void 0 ? void 0 : activeConfig.forceActice)) {
            this.logger.debug(`延时自动更新模式，阻止按需 ISR`);
            return;
        }
        if (info) {
            this.logger.log(info);
        }
        else {
            this.logger.log('首次启动触发全量渲染！');
        }
        await this.activeUrls(this.urlList, false);
        let postId = null;
        const articleWithThisId = await this.articleProvider.getById(postId, 'list');
        if (articleWithThisId) {
            postId = articleWithThisId.pathname || articleWithThisId.id;
        }
        await this.activePath('post', postId || undefined);
        await this.activePath('page');
        await this.activePath('category');
        await this.activePath('tag');
        this.logger.log('触发全量渲染完成！');
    }
    async activeAll(info, delay, activeConfig) {
        if (process.env["VANBLOG_DISABLE_WEBSITE"] === 'true') {
            return;
        }
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.rssProvider.generateRssFeed(info || '', delay);
            this.sitemapProvider.generateSiteMap(info || '', delay);
            this.activeWithRetry(() => {
                this.activeAllFn(info, activeConfig);
            });
        }, 1000);
    }
    async testConn() {
        try {
            await axios_1.default.get(encodeURI(this.base + '/'));
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    async activeWithRetry(fn, info) {
        const max = 6;
        const delay = 3000;
        let succ = false;
        for (let t = 0; t < max; t++) {
            const r = await this.testConn();
            if (t > 0) {
                this.logger.warn(`第${t}次重试触发增量渲染！来源：${info || '首次启动触发全量渲染！'}`);
            }
            if (r) {
                fn(info);
                succ = true;
                break;
            }
            else {
                await (0, sleep_1.sleep)(delay);
            }
        }
        if (!succ) {
            this.logger.error(`达到最大增量渲染重试次数！来源：${info || '首次启动触发全量渲染！'}`);
        }
    }
    async activeUrls(urls, log) {
        for (const each of urls) {
            await this.activeUrl(each, log);
        }
    }
    async activePath(type, postId) {
        switch (type) {
            case 'category':
                const categoryUrls = await this.sitemapProvider.getCategoryUrls();
                await this.activeUrls(categoryUrls, false);
                break;
            case 'page':
                const pageUrls = await this.sitemapProvider.getPageUrls();
                await this.activeUrls(pageUrls, false);
                break;
            case 'tag':
                const tagUrls = await this.sitemapProvider.getTagUrls();
                await this.activeUrls(tagUrls, false);
                break;
            case 'post':
                const articleUrls = await this.getArticleUrls();
                if (postId) {
                    const urlsWithoutThisId = articleUrls.filter((u) => u !== `/post/${postId}`);
                    await this.activeUrls([`/post/${postId}`, ...urlsWithoutThisId], false);
                }
                else {
                    await this.activeUrls(articleUrls, false);
                }
                break;
        }
    }
    async activeArticleById(id, event, beforeObj) {
        const { article, pre, next } = await this.articleProvider.getByIdOrPathnameWithPreNext(id, 'list');
        this.activeUrl(`/post/${id}`, true);
        if (pre) {
            this.activeUrl(`/post/${pre === null || pre === void 0 ? void 0 : pre.id}`, true);
        }
        if (next) {
            this.activeUrl(`/post/${next === null || next === void 0 ? void 0 : next.id}`, true);
        }
        const tags = article.tags;
        if (tags && tags.length > 0) {
            for (const each of tags) {
                this.activeUrl(`/tag/${each}`, true);
            }
        }
        const category = article.category;
        this.activeUrl(`/category/${category}`, true);
        if (event == 'update' && beforeObj) {
            const tags = beforeObj.tags;
            if (tags && tags.length > 0) {
                for (const each of tags) {
                    this.activeUrl(`/tag/${each}`, true);
                }
            }
            const category = beforeObj.category;
            this.activeUrl(`/category/${category}`, true);
        }
        this.activeUrl(`/timeline`, true);
        this.activeUrl(`/tag`, true);
        this.activeUrl(`/category`, true);
        this.activeUrl(`/`, true);
        this.logger.log('触发全部 page 页增量渲染！');
        this.activePath('page');
    }
    async activeAbout(info) {
        this.activeWithRetry(() => {
            this.logger.log(info);
            this.activeUrl(`/about`, false);
        }, info);
    }
    async activeLink(info) {
        this.activeWithRetry(() => {
            this.logger.log(info);
            this.activeUrl(`/link`, false);
        }, info);
    }
    async activeUrl(url, log) {
        try {
            await axios_1.default.get(encodeURI(this.base + url));
            if (log) {
                this.logger.log(`触发增量渲染成功！ ${url}`);
            }
        }
        catch (err) {
            this.logger.error(`触发增量渲染失败！ ${url}`);
        }
    }
    async getArticleUrls() {
        const articles = await this.articleProvider.getAll('list', true, true);
        return articles.map((a) => {
            return `/post/${a.pathname || a.id}`;
        });
    }
};
ISRProvider = ISRProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [article_provider_1.ArticleProvider,
        rss_provider_1.RssProvider,
        sitemap_provider_1.SiteMapProvider,
        setting_provider_1.SettingProvider])
], ISRProvider);
exports.ISRProvider = ISRProvider;
//# sourceMappingURL=isr.provider.js.map