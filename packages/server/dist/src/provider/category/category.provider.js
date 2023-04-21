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
exports.CategoryProvider = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const article_provider_1 = require("../article/article.provider");
const sleep_1 = require("../../utils/sleep");
let CategoryProvider = class CategoryProvider {
    constructor(categoryModal, articleProvider) {
        this.categoryModal = categoryModal;
        this.articleProvider = articleProvider;
        this.idLock = false;
    }
    async getCategoriesWithArticle(includeHidden) {
        const allArticles = await this.articleProvider.getAll('list', includeHidden);
        const categories = await this.getAllCategories();
        const data = {};
        categories.forEach((c) => {
            data[c] = [];
        });
        allArticles.forEach((a) => {
            var _a;
            (_a = data[a.category]) === null || _a === void 0 ? void 0 : _a.push(a);
        });
        return data;
    }
    async getPieData() {
        const oldData = await this.getCategoriesWithArticle(true);
        const categories = Object.keys(oldData);
        if (!categories || categories.length < 0) {
            return [];
        }
        const res = [];
        categories.forEach((c) => {
            res.push({
                type: c,
                value: oldData[c].length || 0,
            });
        });
        return res;
    }
    async getAllCategories(all) {
        const d = await this.categoryModal.find({});
        if (!d || !d.length) {
            return [];
        }
        if (all)
            return d;
        else
            return d.map((item) => item.name);
    }
    async getArticlesByCategory(name, includeHidden) {
        var _a;
        const d = await this.getCategoriesWithArticle(includeHidden);
        return (_a = d[name]) !== null && _a !== void 0 ? _a : [];
    }
    async addOne(name) {
        const existData = await this.categoryModal.findOne({
            name,
        });
        if (existData) {
            throw new common_1.NotAcceptableException('分类名重复，无法创建！');
        }
        else {
            await this.categoryModal.create({
                id: await this.getNewId(),
                name,
                type: 'category',
                private: false,
            });
        }
    }
    async getNewId() {
        while (this.idLock) {
            await (0, sleep_1.sleep)(10);
        }
        this.idLock = true;
        const maxObj = await this.categoryModal.find({}).sort({ id: -1 }).limit(1);
        let res = 1;
        if (maxObj.length) {
            res = maxObj[0].id + 1;
        }
        this.idLock = false;
        return res;
    }
    async deleteOne(name) {
        const d = await this.getArticlesByCategory(name, true);
        if (d && d.length) {
            throw new common_1.NotAcceptableException('分类已有文章，无法删除！');
        }
        await this.categoryModal.deleteOne({
            name,
        });
    }
    async updateCategoryByName(name, dto) {
        if (Object.keys(dto).length == 0) {
            throw new common_1.NotAcceptableException('无有效信息，无法修改！');
        }
        if (dto.name && name != dto.name) {
            const existData = await this.categoryModal.findOne({
                name: dto.name,
            });
            if (existData) {
                throw new common_1.NotAcceptableException('分类名重复，无法修改！');
            }
            const articles = await this.getArticlesByCategory(name, true);
            if (articles && articles.length) {
                for (const article of articles) {
                    await this.articleProvider.updateById(article.id, {
                        category: dto.name,
                    });
                }
            }
        }
        await this.categoryModal.updateOne({
            name: name,
        }, Object.assign({}, dto));
    }
};
CategoryProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Category')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        article_provider_1.ArticleProvider])
], CategoryProvider);
exports.CategoryProvider = CategoryProvider;
