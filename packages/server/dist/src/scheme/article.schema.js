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
exports.ArticleSchema = exports.Article = void 0;
const openapi = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Article = class Article extends mongoose_2.Document {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, title: { required: true, type: () => String }, content: { required: true, type: () => String }, tags: { required: true, type: () => [String] }, top: { required: true, type: () => Number }, category: { required: true, type: () => String }, hidden: { required: true, type: () => Boolean }, author: { required: true, type: () => String }, pathname: { required: true, type: () => String }, private: { required: true, type: () => Boolean }, password: { required: true, type: () => String }, deleted: { required: true, type: () => Boolean }, viewer: { required: true, type: () => Number }, visited: { required: true, type: () => Number }, copyright: { required: false, type: () => String }, lastVisitedTime: { required: true, type: () => Date }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, mongoose_1.Prop)({ index: true, unique: true }),
    __metadata("design:type", Number)
], Article.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Article.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [], index: true }),
    __metadata("design:type", Array)
], Article.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, index: true }),
    __metadata("design:type", Number)
], Article.prototype, "top", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], Article.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false, index: true }),
    __metadata("design:type", Boolean)
], Article.prototype, "hidden", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], Article.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '', index: true }),
    __metadata("design:type", String)
], Article.prototype, "pathname", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false, index: true }),
    __metadata("design:type", Boolean)
], Article.prototype, "private", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Article.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false, index: true }),
    __metadata("design:type", Boolean)
], Article.prototype, "deleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Article.prototype, "viewer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Article.prototype, "visited", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Article.prototype, "copyright", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Article.prototype, "lastVisitedTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        index: true,
        default: () => {
            return new Date();
        },
    }),
    __metadata("design:type", Date)
], Article.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        index: true,
        default: () => {
            return new Date();
        },
    }),
    __metadata("design:type", Date)
], Article.prototype, "updatedAt", void 0);
Article = __decorate([
    (0, mongoose_1.Schema)()
], Article);
exports.Article = Article;
exports.ArticleSchema = mongoose_1.SchemaFactory.createForClass(Article);
//# sourceMappingURL=article.schema.js.map