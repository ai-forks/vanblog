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
exports.MetaSchema = exports.Meta = void 0;
const openapi = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const about_dto_1 = require("../types/about.dto");
const site_dto_1 = require("../types/site.dto");
let Meta = class Meta extends mongoose_2.Document {
    static _OPENAPI_METADATA_FACTORY() {
        return { links: { required: true, type: () => [require("../types/link.dto").LinkItem] }, socials: { required: true, type: () => [require("../types/social.dto").SocialItem] }, menus: { required: true, type: () => [Object] }, rewards: { required: true, type: () => [require("../types/reward.dto").RewardItem] }, about: { required: true, type: () => require("../types/about.dto").AboutDto }, siteInfo: { required: true, type: () => require("../types/site.dto").SiteInfo }, viewer: { required: true, type: () => Number }, visited: { required: true, type: () => Number }, categories: { required: true, type: () => [String] }, totalWordCount: { required: true, type: () => Number } };
    }
};
__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], Meta.prototype, "links", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], Meta.prototype, "socials", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], Meta.prototype, "menus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], Meta.prototype, "rewards", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: { updatedAt: new Date(), content: '' },
    }),
    __metadata("design:type", about_dto_1.AboutDto)
], Meta.prototype, "about", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", site_dto_1.SiteInfo)
], Meta.prototype, "siteInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Meta.prototype, "viewer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Meta.prototype, "visited", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], Meta.prototype, "categories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Meta.prototype, "totalWordCount", void 0);
Meta = __decorate([
    (0, mongoose_1.Schema)()
], Meta);
exports.Meta = Meta;
exports.MetaSchema = mongoose_1.SchemaFactory.createForClass(Meta);
//# sourceMappingURL=meta.schema.js.map