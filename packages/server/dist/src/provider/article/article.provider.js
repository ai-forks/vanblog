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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleProvider = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const parseImgOfMarkdown_1 = require("../../utils/parseImgOfMarkdown");
const wordCount_1 = require("../../utils/wordCount");
const meta_provider_1 = require("../meta/meta.provider");
const visit_provider_1 = require("../visit/visit.provider");
const sleep_1 = require("../../utils/sleep");
let ArticleProvider = class ArticleProvider {
    constructor(articleModel, categoryModal, metaProvider, visitProvider) {
        this.articleModel = articleModel;
        this.categoryModal = categoryModal;
        this.metaProvider = metaProvider;
        this.visitProvider = visitProvider;
        this.idLock = false;
        this.publicView = {
            title: 1,
            content: 1,
            tags: 1,
            category: 1,
            updatedAt: 1,
            createdAt: 1,
            lastVisitedTime: 1,
            id: 1,
            top: 1,
            _id: 0,
            viewer: 1,
            visited: 1,
            private: 1,
            hidden: 1,
            author: 1,
            copyright: 1,
            pathname: 1,
        };
        this.adminView = {
            title: 1,
            content: 1,
            tags: 1,
            category: 1,
            lastVisitedTime: 1,
            updatedAt: 1,
            createdAt: 1,
            id: 1,
            top: 1,
            hidden: 1,
            password: 1,
            private: 1,
            _id: 0,
            viewer: 1,
            visited: 1,
            author: 1,
            copyright: 1,
            pathname: 1,
        };
        this.listView = {
            title: 1,
            tags: 1,
            category: 1,
            updatedAt: 1,
            lastVisitedTime: 1,
            createdAt: 1,
            id: 1,
            top: 1,
            hidden: 1,
            private: 1,
            _id: 0,
            viewer: 1,
            visited: 1,
            author: 1,
            copyright: 1,
            pathname: 1,
        };
    }
    toPublic(oldArticles) {
        return oldArticles.map((item) => {
            return {
                title: item.title,
                content: item.content,
                tags: item.tags,
                category: item.category,
                updatedAt: item.updatedAt,
                createdAt: item.createdAt,
                id: item.id,
                top: item.top,
            };
        });
    }
    async create(createArticleDto, skipUpdateWordCount, id) {
        const createdData = new this.articleModel(createArticleDto);
        const newId = id || (await this.getNewId());
        createdData.id = newId;
        if (!skipUpdateWordCount) {
            this.metaProvider.updateTotalWords('新建文章');
        }
        const res = createdData.save();
        return res;
    }
    async searchArticlesByLink(link) {
        const artciles = await this.articleModel.find({
            content: { $regex: link, $options: 'i' },
            $or: [
                {
                    deleted: false,
                },
                {
                    deleted: { $exists: false },
                },
            ],
        }, this.listView);
        return artciles;
    }
    async getAllImageLinks() {
        const res = [];
        const articles = await this.articleModel.find({
            $or: [
                {
                    deleted: false,
                },
                {
                    deleted: { $exists: false },
                },
            ],
        });
        for (const article of articles) {
            const eachLinks = (0, parseImgOfMarkdown_1.parseImgLinksOfMarkdown)(article.content || '');
            res.push({
                articleId: article.id,
                title: article.title,
                links: eachLinks,
            });
        }
        return res;
    }
    async updateViewerByPathname(pathname, isNew) {
        let article = await this.getByPathName(pathname, 'list');
        if (!article) {
            article = await this.getById(Number(pathname), 'list');
            if (!article) {
                return;
            }
        }
        const oldViewer = article.viewer || 0;
        const oldVIsited = article.visited || 0;
        const newViewer = oldViewer + 1;
        const newVisited = isNew ? oldVIsited + 1 : oldVIsited;
        const nowTime = new Date();
        await this.articleModel.updateOne({ id: article.id }, { visited: newVisited, viewer: newViewer, lastVisitedTime: nowTime });
    }
    async updateViewer(id, isNew) {
        const article = await this.getById(id, 'list');
        if (!article) {
            return;
        }
        const oldViewer = article.viewer || 0;
        const oldVIsited = article.visited || 0;
        const newViewer = oldViewer + 1;
        const newVisited = isNew ? oldVIsited + 1 : oldVIsited;
        const nowTime = new Date();
        await this.articleModel.updateOne({ id: id }, { visited: newVisited, viewer: newViewer, lastVisitedTime: nowTime });
    }
    async getRecentVisitedArticles(num, view) {
        return await this.articleModel
            .find({
            lastVisitedTime: { $exists: true },
            $or: [
                {
                    deleted: false,
                },
                {
                    deleted: { $exists: false },
                },
            ],
        }, this.getView(view))
            .sort({ lastVisitedTime: -1 })
            .limit(num);
    }
    async getTopViewer(view, num) {
        return await this.articleModel
            .find({
            viewer: { $ne: 0, $exists: true },
            $or: [
                {
                    deleted: false,
                },
                {
                    deleted: { $exists: false },
                },
            ],
        }, this.getView(view))
            .sort({ viewer: -1 })
            .limit(num);
    }
    async getTopVisited(view, num) {
        return await this.articleModel
            .find({
            viewer: { $ne: 0, $exists: true },
            $or: [
                {
                    deleted: false,
                },
                {
                    deleted: { $exists: false },
                },
            ],
        }, this.getView(view))
            .sort({ visited: -1 })
            .limit(num);
    }
    async washViewerInfoByVisitProvider() {
        const articles = await this.getAll('list', true);
        for (const a of articles) {
            const visitData = await this.visitProvider.getByArticleId(a.id);
            if (visitData) {
                const updateDto = {
                    viewer: visitData.viewer,
                    visited: visitData.visited,
                };
                await this.updateById(a.id, updateDto);
            }
        }
    }
    async washViewerInfoToVisitProvider() {
        const articles = await this.getAll('list', true);
        for (const a of articles) {
            await this.visitProvider.rewriteToday(`/post/${a.id}`, a.viewer, a.visited);
        }
    }
    async importArticles(articles) {
        for (const a of articles) {
            const { id } = a, createDto = __rest(a, ["id"]);
            const oldArticle = await this.getById(id, 'admin');
            if (oldArticle) {
                this.updateById(oldArticle.id, Object.assign(Object.assign({}, createDto), { deleted: false, updatedAt: oldArticle.updatedAt || oldArticle.createdAt }), true);
            }
            else {
                await this.create(Object.assign(Object.assign({}, createDto), { updatedAt: createDto.updatedAt || createDto.createdAt || new Date() }), true, id);
            }
        }
        this.metaProvider.updateTotalWords('导入文章');
    }
    async countTotalWords() {
        let total = 0;
        const $and = [
            {
                $or: [
                    {
                        deleted: false,
                    },
                    {
                        deleted: { $exists: false },
                    },
                ],
            },
            {
                $or: [
                    {
                        hidden: false,
                    },
                    {
                        hidden: { $exists: false },
                    },
                ],
            },
        ];
        const articles = await this.articleModel
            .find({
            $and,
        })
            .exec();
        articles.forEach((a) => {
            total = total + (0, wordCount_1.wordCount)(a.content);
        });
        return total;
    }
    async getTotalNum(includeHidden) {
        const $and = [
            {
                $or: [
                    {
                        deleted: false,
                    },
                    {
                        deleted: { $exists: false },
                    },
                ],
            },
        ];
        if (!includeHidden) {
            $and.push({
                $or: [
                    {
                        hidden: false,
                    },
                    {
                        hidden: { $exists: false },
                    },
                ],
            });
        }
        return await this.articleModel
            .find({
            $and,
        })
            .count();
    }
    getView(view) {
        let thisView = this.adminView;
        switch (view) {
            case 'admin':
                thisView = this.adminView;
                break;
            case 'list':
                thisView = this.listView;
                break;
            case 'public':
                thisView = this.publicView;
        }
        return thisView;
    }
    async getAll(view, includeHidden, includeDelete) {
        const thisView = this.getView(view);
        const $and = [];
        if (!includeDelete) {
            $and.push({
                $or: [
                    {
                        deleted: false,
                    },
                    {
                        deleted: { $exists: false },
                    },
                ],
            });
        }
        if (!includeHidden) {
            $and.push({
                $or: [
                    {
                        hidden: false,
                    },
                    {
                        hidden: { $exists: false },
                    },
                ],
            });
        }
        const articles = await this.articleModel
            .find($and.length > 0
            ? {
                $and,
            }
            : undefined, thisView)
            .sort({ createdAt: -1 })
            .exec();
        return articles;
    }
    async getTimeLineInfo() {
        const articles = await this.articleModel
            .find({
            $and: [
                {
                    $or: [
                        {
                            deleted: false,
                        },
                        {
                            deleted: { $exists: false },
                        },
                    ],
                },
                {
                    $or: [
                        {
                            hidden: false,
                        },
                        {
                            hidden: { $exists: false },
                        },
                    ],
                },
            ],
        }, this.listView)
            .sort({ createdAt: -1 })
            .exec();
        const dates = Array.from(new Set(articles.map((a) => a.createdAt.getFullYear())));
        const res = {};
        dates.forEach((date) => {
            res[date] = articles.filter((a) => a.createdAt.getFullYear() == date);
        });
        return res;
    }
    async getByOption(option, isPublic) {
        var _a, _b;
        const query = {};
        const $and = [
            {
                $or: [
                    {
                        deleted: false,
                    },
                    {
                        deleted: { $exists: false },
                    },
                ],
            },
        ];
        const and = [];
        let sort = { createdAt: -1 };
        if (isPublic) {
            $and.push({
                $or: [
                    {
                        hidden: false,
                    },
                    {
                        hidden: { $exists: false },
                    },
                ],
            });
        }
        if (option.sortTop) {
            if (option.sortTop == 'asc') {
                sort = { top: 1 };
            }
            else {
                sort = { top: -1 };
            }
        }
        if (option.sortViewer) {
            if (option.sortViewer == 'asc') {
                sort = { viewer: 1 };
            }
            else {
                sort = { viewer: -1 };
            }
        }
        if (option.sortCreatedAt) {
            if (option.sortCreatedAt == 'asc') {
                sort = { createdAt: 1 };
            }
        }
        if (option.tags) {
            const tags = option.tags.split(',');
            const or = [];
            tags.forEach((t) => {
                if (option.regMatch) {
                    or.push({
                        tags: { $regex: `${t}`, $options: 'i' },
                    });
                }
                else {
                    or.push({
                        tags: t,
                    });
                }
            });
            and.push({ $or: or });
        }
        if (option.category) {
            if (option.regMatch) {
                and.push({
                    category: { $regex: `${option.category}`, $options: 'i' },
                });
            }
            else {
                and.push({
                    category: option.category,
                });
            }
        }
        if (option.title) {
            and.push({
                title: { $regex: `${option.title}`, $options: 'i' },
            });
        }
        if (option.startTime || option.endTime) {
            const obj = {};
            if (option.startTime) {
                obj['$gte'] = new Date(option.startTime);
            }
            if (option.endTime) {
                obj['$lte'] = new Date(option.endTime);
            }
            $and.push({ createdAt: obj });
        }
        if (and.length) {
            $and.push({ $and: and });
        }
        query.$and = $and;
        let view = isPublic ? this.publicView : this.adminView;
        if (option.toListView) {
            view = this.listView;
        }
        if (option.withWordCount) {
            view = isPublic ? this.publicView : this.adminView;
        }
        let articlesQuery = this.articleModel.find(query, view).sort(sort);
        if (option.pageSize != -1 && !isPublic) {
            articlesQuery = articlesQuery
                .skip(option.pageSize * option.page - option.pageSize)
                .limit(option.pageSize);
        }
        let articles = await articlesQuery.exec();
        if (isPublic && option.pageSize != -1) {
            const topArticles = articles.filter((a) => {
                var _a;
                const top = ((_a = a === null || a === void 0 ? void 0 : a._doc) === null || _a === void 0 ? void 0 : _a.top) || (a === null || a === void 0 ? void 0 : a.top);
                return Boolean(top) && top != '';
            });
            const notTopArticles = articles.filter((a) => {
                var _a;
                const top = ((_a = a === null || a === void 0 ? void 0 : a._doc) === null || _a === void 0 ? void 0 : _a.top) || (a === null || a === void 0 ? void 0 : a.top);
                return !Boolean(top) || top == '';
            });
            const sortedTopArticles = topArticles.sort((a, b) => {
                var _a, _b;
                const topA = ((_a = a === null || a === void 0 ? void 0 : a._doc) === null || _a === void 0 ? void 0 : _a.top) || (a === null || a === void 0 ? void 0 : a.top);
                const topB = ((_b = b === null || b === void 0 ? void 0 : b._doc) === null || _b === void 0 ? void 0 : _b.top) || (b === null || b === void 0 ? void 0 : b.top);
                if (topA > topB) {
                    return -1;
                }
                else if (topB > topA) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            articles = [...sortedTopArticles, ...notTopArticles];
            const skip = option.pageSize * option.page - option.pageSize;
            const rawEnd = skip + option.pageSize;
            const end = rawEnd > articles.length - 1 ? articles.length : rawEnd;
            articles = articles.slice(skip, end);
        }
        const total = await this.articleModel.count(query).exec();
        if (isPublic) {
            const tmpArticles = [];
            for (const a of articles) {
                const isPrivateInArticle = ((_a = a === null || a === void 0 ? void 0 : a._doc) === null || _a === void 0 ? void 0 : _a.private) || (a === null || a === void 0 ? void 0 : a.private);
                const category = await this.categoryModal.findOne({
                    name: ((_b = a === null || a === void 0 ? void 0 : a._doc) === null || _b === void 0 ? void 0 : _b.category) || (a === null || a === void 0 ? void 0 : a.category),
                });
                const isPrivateInCategory = (category === null || category === void 0 ? void 0 : category.private) || false;
                const isPrivate = isPrivateInArticle || isPrivateInCategory;
                if (isPrivate) {
                    tmpArticles.push(Object.assign(Object.assign({}, ((a === null || a === void 0 ? void 0 : a._doc) || a)), { content: undefined, password: undefined, private: true }));
                }
                else {
                    tmpArticles.push(Object.assign({}, ((a === null || a === void 0 ? void 0 : a._doc) || a)));
                }
            }
            articles = tmpArticles;
        }
        const resData = {};
        if (option.withWordCount) {
            let totalWordCount = 0;
            articles.forEach((a) => {
                totalWordCount = totalWordCount + (0, wordCount_1.wordCount)((a === null || a === void 0 ? void 0 : a.content) || '');
            });
            resData.totalWordCount = totalWordCount;
        }
        if (option.withWordCount && option.toListView) {
            resData.articles = articles.map((a) => (Object.assign(Object.assign({}, ((a === null || a === void 0 ? void 0 : a._doc) || a)), { content: undefined, password: undefined })));
        }
        else {
            resData.articles = articles;
        }
        resData.total = total;
        return resData;
    }
    async getByIdOrPathname(id, view) {
        const articleByPathname = await this.getByPathName(String(id), this.getView(view));
        if (articleByPathname) {
            return articleByPathname;
        }
        return await this.getById(Number(id), this.getView(view));
    }
    async getByPathName(pathname, view) {
        const $and = [
            {
                $or: [
                    {
                        deleted: false,
                    },
                    {
                        deleted: { $exists: false },
                    },
                ],
            },
        ];
        return await this.articleModel
            .findOne({
            pathname: decodeURIComponent(pathname),
            $and,
        }, this.getView(view))
            .exec();
    }
    async getById(id, view) {
        const $and = [
            {
                $or: [
                    {
                        deleted: false,
                    },
                    {
                        deleted: { $exists: false },
                    },
                ],
            },
        ];
        return await this.articleModel
            .findOne({
            id,
            $and,
        }, this.getView(view))
            .exec();
    }
    async getByIdWithPassword(id, password) {
        const article = await this.getByIdOrPathname(id, 'admin');
        if (!password) {
            return null;
        }
        if (!article) {
            return null;
        }
        const category = (await this.categoryModal.findOne({
            name: article.category,
        })) || {};
        const categoryPassword = category.private ? category.password : undefined;
        const targetPassword = categoryPassword
            ? categoryPassword
            : article.password;
        if (!targetPassword || targetPassword == '') {
            return Object.assign(Object.assign({}, ((article === null || article === void 0 ? void 0 : article._doc) || article)), { password: undefined });
        }
        else {
            if (targetPassword == password) {
                return Object.assign(Object.assign({}, ((article === null || article === void 0 ? void 0 : article._doc) || article)), { password: undefined });
            }
            else {
                return null;
            }
        }
    }
    async getByIdOrPathnameWithPreNext(id, view) {
        const curArticle = await this.getByIdOrPathname(id, view);
        if (!curArticle) {
            throw new common_1.NotFoundException('找不到文章');
        }
        if (curArticle.hidden) {
            const siteInfo = await this.metaProvider.getSiteInfo();
            if (!(siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.allowOpenHiddenPostByUrl) ||
                (siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.allowOpenHiddenPostByUrl) == 'false') {
                throw new common_1.NotFoundException('该文章是隐藏文章！');
            }
        }
        if (curArticle.private) {
            curArticle.content = undefined;
        }
        else {
            const category = await this.categoryModal.findOne({
                name: curArticle.category,
            });
            if (category && category.private) {
                curArticle.private = true;
                curArticle.content = undefined;
            }
        }
        const res = { article: curArticle };
        const preArticle = await this.getPreArticleByArticle(curArticle, 'list');
        const nextArticle = await this.getNextArticleByArticle(curArticle, 'list');
        if (preArticle) {
            res.pre = preArticle;
        }
        if (nextArticle) {
            res.next = nextArticle;
        }
        return res;
    }
    async getPreArticleByArticle(article, view, includeHidden) {
        const $and = [
            {
                $or: [
                    {
                        deleted: false,
                    },
                    {
                        deleted: { $exists: false },
                    },
                ],
            },
            { createdAt: { $lt: article.createdAt } },
        ];
        if (!includeHidden) {
            $and.push({
                $or: [
                    {
                        hidden: false,
                    },
                    {
                        hidden: { $exists: false },
                    },
                ],
            });
        }
        const result = await this.articleModel
            .find({
            $and,
        }, this.getView(view))
            .sort({ createdAt: -1 })
            .limit(1);
        if (result.length) {
            return result[0];
        }
        return null;
    }
    async getNextArticleByArticle(article, view, includeHidden) {
        const $and = [
            {
                $or: [
                    {
                        deleted: false,
                    },
                    {
                        deleted: { $exists: false },
                    },
                ],
            },
            { createdAt: { $gt: article.createdAt } },
        ];
        if (!includeHidden) {
            $and.push({
                $or: [
                    {
                        hidden: false,
                    },
                    {
                        hidden: { $exists: false },
                    },
                ],
            });
        }
        const result = await this.articleModel
            .find({
            $and,
        }, this.getView(view))
            .sort({ createdAt: 1 })
            .limit(1);
        if (result.length) {
            return result[0];
        }
        return null;
    }
    async findOneByTitle(title) {
        return this.articleModel.findOne({ title }).exec();
    }
    toSearchResult(articles) {
        return articles.map((each) => ({
            title: each.title,
            id: each.id,
            category: each.category,
            tags: each.tags,
            updatedAt: each.updatedAt,
            createdAt: each.createdAt,
        }));
    }
    async searchByString(str, includeHidden) {
        const $and = [
            {
                $or: [
                    { content: { $regex: `${str}`, $options: 'i' } },
                    { title: { $regex: `${str}`, $options: 'i' } },
                    { category: { $regex: `${str}`, $options: 'i' } },
                    { tags: { $regex: `${str}`, $options: 'i' } },
                ],
            },
            {
                $or: [
                    {
                        deleted: false,
                    },
                    {
                        deleted: { $exists: false },
                    },
                ],
            },
        ];
        if (!includeHidden) {
            $and.push({
                $or: [
                    {
                        hidden: false,
                    },
                    {
                        hidden: { $exists: false },
                    },
                ],
            });
        }
        const rawData = await this.articleModel
            .find({
            $and,
        })
            .exec();
        const s = str.toLocaleLowerCase();
        const titleData = rawData.filter((each) => each.title.toLocaleLowerCase().includes(s));
        const contentData = rawData.filter((each) => each.content.toLocaleLowerCase().includes(s));
        const categoryData = rawData.filter((each) => each.category.toLocaleLowerCase().includes(s));
        const tagData = rawData.filter((each) => each.tags.map((t) => t.toLocaleLowerCase()).includes(s));
        const sortedData = [
            ...titleData,
            ...contentData,
            ...tagData,
            ...categoryData,
        ];
        const resData = [];
        for (const e of sortedData) {
            if (!resData.includes(e)) {
                resData.push(e);
            }
        }
        return resData;
    }
    async findAll() {
        return this.articleModel.find({}).exec();
    }
    async deleteById(id) {
        const res = await this.articleModel
            .updateOne({ id }, { deleted: true })
            .exec();
        this.metaProvider.updateTotalWords('删除文章');
        return res;
    }
    async updateById(id, updateArticleDto, skipUpdateWordCount) {
        const res = await this.articleModel.updateOne({ id }, Object.assign(Object.assign({}, updateArticleDto), { updatedAt: updateArticleDto.updatedAt || new Date() }));
        if (!skipUpdateWordCount) {
            this.metaProvider.updateTotalWords('更新文章');
        }
        return res;
    }
    async getNewId() {
        while (this.idLock) {
            await (0, sleep_1.sleep)(10);
        }
        this.idLock = true;
        const maxObj = await this.articleModel.find({}).sort({ id: -1 }).limit(1);
        let res = 1;
        if (maxObj.length) {
            res = maxObj[0].id + 1;
        }
        this.idLock = false;
        return res;
    }
};
ArticleProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Article')),
    __param(1, (0, mongoose_1.InjectModel)('Category')),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => meta_provider_1.MetaProvider))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        meta_provider_1.MetaProvider,
        visit_provider_1.VisitProvider])
], ArticleProvider);
exports.ArticleProvider = ArticleProvider;
