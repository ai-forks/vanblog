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
exports.TagProvider = void 0;
const common_1 = require("@nestjs/common");
const article_provider_1 = require("../article/article.provider");
let TagProvider = class TagProvider {
    constructor(articleProvider) {
        this.articleProvider = articleProvider;
    }
    async getTagsWithArticle(includeHidden) {
        const allArticles = await this.articleProvider.getAll('list', includeHidden);
        const data = {};
        allArticles.forEach((a) => {
            a.tags.forEach((t) => {
                if (!Object.keys(data).includes(t)) {
                    data[t] = [a];
                }
                else {
                    data[t].push(a);
                }
            });
        });
        return data;
    }
    async getAllTags(includeHidden) {
        const d = await this.getTagsWithArticle(includeHidden);
        return Object.keys(d);
    }
    async getColumnData(topNum, includeHidden) {
        const data = await this.getTagsWithArticle(includeHidden);
        const tags = Object.keys(data);
        if (!tags || tags.length <= 0) {
            return [];
        }
        const res = [];
        const sortedTags = tags.sort((a, b) => {
            return data[b].length - data[a].length;
        });
        let i = 0;
        for (const t of sortedTags) {
            if (i == topNum) {
                break;
            }
            res.push({
                type: t,
                value: data[t].length || 0,
            });
            i = i + 1;
        }
        return res;
    }
    async getArticlesByTag(tagName, includeHidden) {
        var _a;
        const d = await this.getTagsWithArticle(includeHidden);
        return (_a = d[tagName]) !== null && _a !== void 0 ? _a : [];
    }
    async updateTagByName(oldName, newName) {
        const articles = await this.getArticlesByTag(oldName, true);
        for (const article of articles) {
            const newTags = [];
            if ((article === null || article === void 0 ? void 0 : article.tags) && article.tags.length > 0) {
                for (const t of article === null || article === void 0 ? void 0 : article.tags) {
                    if (t != oldName) {
                        newTags.push(t);
                    }
                    else {
                        if (!article.tags.includes(newName)) {
                            newTags.push(newName);
                        }
                    }
                }
            }
            await this.articleProvider.updateById(article.id, {
                tags: newTags,
            });
        }
        return { message: '更新成功！', total: articles.length };
    }
    async deleteOne(name) {
        const articles = await this.getArticlesByTag(name, true);
        for (const article of articles) {
            const newTags = [];
            if ((article === null || article === void 0 ? void 0 : article.tags) && article.tags.length > 0) {
                for (const t of article === null || article === void 0 ? void 0 : article.tags) {
                    if (t != name) {
                        newTags.push(t);
                    }
                }
            }
            await this.articleProvider.updateById(article.id, {
                tags: newTags,
            });
        }
        return { message: '删除成功！', total: articles.length };
    }
};
TagProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [article_provider_1.ArticleProvider])
], TagProvider);
exports.TagProvider = TagProvider;
