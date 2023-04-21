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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var MetaProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaProvider = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_provider_1 = require("../user/user.provider");
const visit_provider_1 = require("../visit/visit.provider");
const article_provider_1 = require("../article/article.provider");
const dayjs_1 = __importDefault(require("dayjs"));
const isTrue_1 = require("../../utils/isTrue");
const viewer_provider_1 = require("../viewer/viewer.provider");
let MetaProvider = MetaProvider_1 = class MetaProvider {
    constructor(metaModel, userProvider, visitProvider, viewProvider, articleProvider) {
        this.metaModel = metaModel;
        this.userProvider = userProvider;
        this.visitProvider = visitProvider;
        this.viewProvider = viewProvider;
        this.articleProvider = articleProvider;
        this.logger = new common_1.Logger(MetaProvider_1.name);
        this.timer = null;
    }
    async updateTotalWords(reason) {
        if (this.timer)
            clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
            const total = await this.articleProvider.countTotalWords();
            await this.update({ totalWordCount: total });
            this.logger.log(`${reason}触发更新字数缓存：当前文章总字数: ${total}`);
        }, 1000 * 30);
    }
    async getViewer() {
        const old = await this.getAll();
        const ov = old.viewer || 0;
        const oldVisited = old.visited || 0;
        const newViewer = ov;
        const newVisited = oldVisited;
        return { visited: newVisited, viewer: newViewer };
    }
    async addViewer(isNew, pathname, isNewByPath) {
        const old = await this.getAll();
        const ov = old.viewer || 0;
        const oldVisited = old.visited || 0;
        const newViewer = ov + 1;
        let newVisited = oldVisited;
        let isNewVisitorByArticle = false;
        if ((0, isTrue_1.isTrue)(isNew)) {
            newVisited += 1;
        }
        if ((0, isTrue_1.isTrue)(isNewByPath)) {
            isNewVisitorByArticle = true;
        }
        // 这个是 meta 的
        await this.update({
            viewer: newViewer,
            visited: newVisited,
        });
        // 更新文章的
        const r = /\/post\//;
        const isArticlePath = r.test(pathname);
        if (isArticlePath) {
            await this.articleProvider.updateViewerByPathname(pathname.replace('/post/', ''), isNewByPath);
        }
        // 还需要增加每天的
        this.viewProvider.createOrUpdate({
            date: (0, dayjs_1.default)().format('YYYY-MM-DD'),
            viewer: newViewer,
            visited: newVisited,
        });
        //增加每个路径的。
        this.visitProvider.add({
            pathname: pathname,
            isNew: isNewVisitorByArticle,
        });
        return { visited: newVisited, viewer: newViewer };
    }
    async getAll() {
        return this.metaModel.findOne().exec();
    }
    async getSocialTypes() {
        return [
            {
                label: '哔哩哔哩',
                value: 'bilibili',
            },
            {
                label: '邮箱',
                value: 'email',
            },
            {
                label: 'GitHub',
                value: 'github',
            },
            {
                label: 'Gitee',
                value: 'gitee',
            },
            {
                label: '微信',
                value: 'wechat',
            },
            {
                label: '微信（暗色模式）',
                value: 'wechat-dark',
            },
        ];
    }
    async getTotalWords() {
        return (await this.getAll()).totalWordCount || 0;
    }
    async update(updateMetaDto) {
        return this.metaModel.updateOne({}, updateMetaDto);
    }
    async getAbout() {
        var _a;
        return (_a = (await this.getAll())) === null || _a === void 0 ? void 0 : _a.about;
    }
    async getSiteInfo() {
        var _a;
        return (_a = (await this.getAll())) === null || _a === void 0 ? void 0 : _a.siteInfo;
    }
    async getRewards() {
        var _a;
        return (_a = (await this.getAll())) === null || _a === void 0 ? void 0 : _a.rewards;
    }
    async getSocials() {
        var _a;
        return (_a = (await this.getAll())) === null || _a === void 0 ? void 0 : _a.socials;
    }
    async getLinks() {
        var _a;
        return (_a = (await this.getAll())) === null || _a === void 0 ? void 0 : _a.links;
    }
    async updateAbout(newContent) {
        return this.metaModel.updateOne({}, {
            about: {
                updatedAt: new Date(),
                content: newContent,
            },
        });
    }
    async updateSiteInfo(updateSiteInfoDto) {
        // @ts-ignore eslint-disable-next-line @typescript-eslint/ban-ts-comment
        const { name, password } = updateSiteInfoDto, updateDto = __rest(updateSiteInfoDto, ["name", "password"]);
        const oldSiteInfo = await this.getSiteInfo();
        return this.metaModel.updateOne({}, { siteInfo: Object.assign(Object.assign({}, oldSiteInfo), updateDto) });
    }
    async addOrUpdateReward(addReward) {
        const meta = await this.getAll();
        const toAdd = {
            updatedAt: new Date(),
            value: addReward.value,
            name: addReward.name,
        };
        const newRewards = [];
        let pushed = false;
        meta.rewards.forEach((r) => {
            if (r.name === toAdd.name) {
                pushed = true;
                newRewards.push(toAdd);
            }
            else {
                newRewards.push(r);
            }
        });
        if (!pushed) {
            newRewards.push(toAdd);
        }
        return this.metaModel.updateOne({}, { rewards: newRewards });
    }
    async deleteReward(name) {
        const meta = await this.getAll();
        const newRewards = [];
        meta.rewards.forEach((r) => {
            if (r.name !== name) {
                newRewards.push(r);
            }
        });
        return this.metaModel.updateOne({}, { rewards: newRewards });
    }
    async deleteSocial(type) {
        const meta = await this.getAll();
        const newSocials = [];
        meta.socials.forEach((r) => {
            if (r.type !== type) {
                newSocials.push(r);
            }
        });
        return this.metaModel.updateOne({}, { socials: newSocials });
    }
    async addOrUpdateSocial(addSocial) {
        const meta = await this.getAll();
        const toAdd = {
            updatedAt: new Date(),
            value: addSocial.value,
            type: addSocial.type,
        };
        const newSocials = [];
        let pushed = false;
        meta.socials.forEach((r) => {
            if (r.type === toAdd.type) {
                pushed = true;
                newSocials.push(toAdd);
            }
            else {
                newSocials.push(r);
            }
        });
        if (!pushed) {
            newSocials.push(toAdd);
        }
        return this.metaModel.updateOne({}, { socials: newSocials });
    }
    async addOrUpdateLink(addLinkDto) {
        const meta = await this.getAll();
        const toAdd = {
            updatedAt: new Date(),
            url: addLinkDto.url,
            name: addLinkDto.name,
            desc: addLinkDto.desc,
            logo: addLinkDto.logo,
        };
        const newLinks = [];
        let pushed = false;
        meta.links.forEach((r) => {
            if (r.name === toAdd.name) {
                pushed = true;
                newLinks.push(toAdd);
            }
            else {
                newLinks.push(r);
            }
        });
        if (!pushed) {
            newLinks.push(toAdd);
        }
        return this.metaModel.updateOne({}, { links: newLinks });
    }
    async deleteLink(name) {
        const meta = await this.getAll();
        const newLinks = [];
        meta.links.forEach((r) => {
            if (r.name !== name) {
                newLinks.push(r);
            }
        });
        return this.metaModel.updateOne({}, { links: newLinks });
    }
};
MetaProvider = MetaProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Meta')),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => article_provider_1.ArticleProvider))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_provider_1.UserProvider,
        visit_provider_1.VisitProvider,
        viewer_provider_1.ViewerProvider,
        article_provider_1.ArticleProvider])
], MetaProvider);
exports.MetaProvider = MetaProvider;
