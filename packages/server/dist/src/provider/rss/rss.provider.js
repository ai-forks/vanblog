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
var RssProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RssProvider = void 0;
const common_1 = require("@nestjs/common");
const article_provider_1 = require("../article/article.provider");
const feed_1 = require("feed");
const meta_provider_1 = require("../meta/meta.provider");
const setting_provider_1 = require("../setting/setting.provider");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../../config");
const markdown_provider_1 = require("../markdown/markdown.provider");
const washUrl_1 = require("../../utils/washUrl");
let RssProvider = RssProvider_1 = class RssProvider {
    constructor(articleProvider, metaProvider, settingProvider, markdownProvider) {
        this.articleProvider = articleProvider;
        this.metaProvider = metaProvider;
        this.settingProvider = settingProvider;
        this.markdownProvider = markdownProvider;
        this.logger = new common_1.Logger(RssProvider_1.name);
        this.timer = null;
    }
    async generateRssFeed(info, delay) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.generateRssFeedFn(info);
        }, delay || 3 * 60 * 1000);
    }
    async generateRssFeedFn(info) {
        this.logger.log(info + '重新生成 RSS 订阅');
        try {
            let articles = await this.articleProvider.getAll('public', false, false);
            articles = articles.map((a) => {
                const article = (a === null || a === void 0 ? void 0 : a._doc) || a;
                if (article.private) {
                    return Object.assign(Object.assign({}, article), { content: '此文章已加密' });
                }
                else {
                    return article;
                }
            });
            const meta = await this.metaProvider.getAll();
            const walineSetting = await this.settingProvider.getWalineSetting();
            let email = process.env.EMAIL;
            if (walineSetting && (walineSetting === null || walineSetting === void 0 ? void 0 : walineSetting.authorEmail)) {
                email = walineSetting === null || walineSetting === void 0 ? void 0 : walineSetting.authorEmail;
            }
            walineSetting === null || walineSetting === void 0 ? void 0 : walineSetting.authorEmail;
            const author = {
                name: meta.siteInfo.author,
                email,
                link: meta.siteInfo.baseUrl,
            };
            const siteUrl = (0, washUrl_1.washUrl)(meta.siteInfo.baseUrl);
            const favicon = meta.siteInfo.favicon ||
                meta.siteInfo.siteLogo ||
                meta.siteInfo.authorLogo ||
                `${siteUrl}logo.svg`;
            const siteLogo = meta.siteInfo.siteLogo ||
                meta.siteInfo.authorLogo ||
                meta.siteInfo.favicon ||
                `${siteUrl}logo.svg`;
            const date = new Date();
            const feed = new feed_1.Feed({
                title: meta.siteInfo.siteName,
                description: meta.siteInfo.siteDesc,
                id: siteUrl,
                link: siteUrl,
                language: '	zh-cn',
                image: siteLogo,
                favicon: favicon,
                copyright: `All rights reserved ${date.getFullYear()}, ${meta.siteInfo.author}`,
                updated: date,
                generator: 'Feed for VanBlog',
                feedLinks: {
                    rss2: `${siteUrl}rss/feed.xml`,
                    json: `${siteUrl}rss/feed.json`,
                },
                author,
            });
            for (const article of articles) {
                const url = `${siteUrl}post/${article.pathname || article.id}`;
                const category = {
                    name: article.category,
                    domain: `${siteUrl}/category/${article.category}`,
                };
                const html = `<div class="markdown-body rss">
      <link rel="stylesheet" href="${siteUrl}markdown.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/default.min.css">
      ${this.markdownProvider
                    .renderMarkdown(article.content)
                    .replace(/<div class="mermaid">/g, `<div class="mermaid" style="background: #f3f3f3; padding: 8px;"> <p>Mermaid 图表 RSS 暂无法显示，具体请查看原文</p>`)}</div>`;
                feed.addItem({
                    title: article.title,
                    id: url,
                    link: url,
                    description: this.markdownProvider.renderMarkdown(this.markdownProvider.getDescription(article.content)),
                    category: [category],
                    content: html,
                    author: [author],
                    contributor: [author],
                    date: new Date(article.createdAt),
                    published: new Date(article.updatedAt || article.createdAt),
                });
            }
            const rssPath = path_1.default.join(config_1.config.staticPath, 'rss');
            fs_1.default.mkdirSync(rssPath, { recursive: true });
            fs_1.default.writeFileSync(path_1.default.join(rssPath, 'feed.json'), feed.json1());
            fs_1.default.writeFileSync(path_1.default.join(rssPath, 'feed.xml'), feed.rss2());
            fs_1.default.writeFileSync(path_1.default.join(rssPath, 'atom.xml'), feed.atom1());
        }
        catch (err) {
            this.logger.error('生成订阅源失败！');
            this.logger.error(JSON.stringify(err, null, 2));
        }
    }
};
RssProvider = RssProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [article_provider_1.ArticleProvider,
        meta_provider_1.MetaProvider,
        setting_provider_1.SettingProvider,
        markdown_provider_1.MarkdownProvider])
], RssProvider);
exports.RssProvider = RssProvider;
