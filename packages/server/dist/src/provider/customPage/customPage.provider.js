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
exports.CustomPageProvider = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CustomPageProvider = class CustomPageProvider {
    constructor(customPageModal) {
        this.customPageModal = customPageModal;
    }
    async createCustomPage(dto) {
        const old = await this.customPageModal.findOne({ path: dto.path });
        if (old) {
            throw new common_1.ForbiddenException('已有此路由的自定义页面！无法重复创建！');
        }
        return await this.customPageModal.create(dto);
    }
    async updateCustomPage(dto) {
        return await this.customPageModal.updateOne({ path: dto.path }, Object.assign({}, dto));
    }
    async getCustomPageByPath(path) {
        return await this.customPageModal.findOne({ path });
    }
    async getAll() {
        return await this.customPageModal.find({}, { html: 0 });
    }
    async deleteByPath(path) {
        return await this.customPageModal.deleteOne({ path });
    }
};
CustomPageProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('CustomPage')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CustomPageProvider);
exports.CustomPageProvider = CustomPageProvider;
