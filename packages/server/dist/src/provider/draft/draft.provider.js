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
exports.DraftProvider = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const article_provider_1 = require("../article/article.provider");
const sleep_1 = require("../../utils/sleep");
let DraftProvider = class DraftProvider {
    constructor(draftModel, articleProvider) {
        this.draftModel = draftModel;
        this.articleProvider = articleProvider;
        this.idLock = false;
        this.publicView = {
            title: 1,
            content: 1,
            tags: 1,
            category: 1,
            updatedAt: 1,
            createdAt: 1,
            author: 1,
            id: 1,
            _id: 0,
        };
        this.adminView = {
            title: 1,
            content: 1,
            tags: 1,
            category: 1,
            updatedAt: 1,
            createdAt: 1,
            author: 1,
            id: 1,
            _id: 0,
        };
        this.listView = {
            title: 1,
            tags: 1,
            category: 1,
            updatedAt: 1,
            createdAt: 1,
            author: 1,
            id: 1,
            _id: 0,
        };
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
    async create(createDraftDto) {
        const createdData = new this.draftModel(createDraftDto);
        const newId = await this.getNewId();
        createdData.id = newId;
        return createdData.save();
    }
    async importDrafts(drafts) {
        for (const draft of drafts) {
            const { id } = draft, createDto = __rest(draft, ["id"]);
            const title = draft.title;
            const oldDraft = await this.findOneByTitle(title);
            if (oldDraft) {
                this.updateById(oldDraft.id, Object.assign(Object.assign({}, createDto), { deleted: false }));
            }
            else {
                await this.create(createDto);
            }
        }
    }
    async getByOption(option) {
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
        const sort = { createdAt: -1 };
        if (option.sortCreatedAt) {
            if (option.sortCreatedAt == 'asc') {
                sort.createdAt = 1;
            }
        }
        if (option.tags) {
            const tags = option.tags.split(',');
            const or = [];
            tags.forEach((t) => {
                or.push({
                    tags: { $regex: `${t}`, $options: 'i' },
                });
            });
            and.push({ $or: or });
        }
        if (option.category) {
            and.push({
                category: { $regex: `${option.category}`, $options: 'i' },
            });
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
        const view = option.toListView ? this.listView : this.adminView;
        const drafts = await this.draftModel
            .find(query, view)
            .sort(sort)
            .skip(option.pageSize * option.page - option.pageSize)
            .limit(option.pageSize)
            .exec();
        const total = await this.draftModel.count(query).exec();
        return {
            drafts,
            total,
        };
    }
    async publish(id, options) {
        const draft = await this.getById(id);
        if (!draft.content.includes('<!-- more -->')) {
            throw new common_1.ForbiddenException('未包含 more 标记，请修改后再发布！');
        }
        const createArticleDto = {
            title: draft.title,
            content: draft.content,
            tags: draft.tags,
            category: draft.category,
            author: draft.author,
        };
        for (const [k, v] of Object.entries(options || {})) {
            createArticleDto[k] = v;
        }
        const res = await this.articleProvider.create(createArticleDto);
        await this.deleteById(id);
        return res;
    }
    async getAll() {
        return this.draftModel.find({ deleted: false }).exec();
    }
    async getById(id) {
        return this.draftModel.findOne({ id, deleted: false }).exec();
    }
    async findById(id) {
        return this.draftModel.findOne({ id }).exec();
    }
    async findOneByTitle(title) {
        return this.draftModel.findOne({ title }).exec();
    }
    async searchByString(str) {
        return this.draftModel
            .find({
            $or: [
                { content: { $regex: `*${str}*`, $options: 'i' } },
                { title: { $regex: `*${str}*`, $options: 'i' } },
            ],
        })
            .exec();
    }
    async findAll() {
        return this.draftModel.find().exec();
    }
    async deleteById(id) {
        return this.draftModel.updateOne({ id }, { deleted: true }).exec();
    }
    async updateById(id, updateDraftDto) {
        return this.draftModel.updateOne({ id }, Object.assign(Object.assign({}, updateDraftDto), { updatedAt: new Date() }));
    }
    async getNewId() {
        while (this.idLock) {
            await (0, sleep_1.sleep)(10);
        }
        this.idLock = true;
        const maxObj = await this.draftModel.find({}).sort({ id: -1 }).limit(1);
        let res = 1;
        if (maxObj.length) {
            res = maxObj[0].id + 1;
        }
        this.idLock = false;
        return res;
    }
};
DraftProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Draft')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        article_provider_1.ArticleProvider])
], DraftProvider);
exports.DraftProvider = DraftProvider;
//# sourceMappingURL=draft.provider.js.map