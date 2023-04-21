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
exports.ImgController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const static_provider_1 = require("../../../provider/static/static.provider");
const config_1 = require("../../../config");
const checkTrue_1 = require("../../../utils/checkTrue");
const token_1 = require("../../../provider/swagger/token");
let ImgController = class ImgController {
    constructor(staticProvider) {
        this.staticProvider = staticProvider;
    }
    async upload(file, favicon, waterMarkText, withWaterMark) {
        let isFavicon = false;
        if (favicon && favicon == 'true') {
            isFavicon = true;
        }
        // 只有这里开启水印，并且设置里也开启水印，才能触发水印，双保险。避免后台某些表单上传图片也触发了水印。
        const updateConfig = {
            withWaterMark: (0, checkTrue_1.checkTrue)(withWaterMark),
            waterMarkText,
        };
        const res = await this.staticProvider.upload(file, 'img', isFavicon, undefined, updateConfig);
        return {
            statusCode: 200,
            data: res,
        };
    }
    async getAll() {
        const res = await this.staticProvider.getAll('img', 'public');
        return {
            statusCode: 200,
            data: res,
        };
    }
    async scanImgsOfArticles() {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const res = await this.staticProvider.scanLinksOfArticles();
        return {
            statusCode: 200,
            data: res,
        };
    }
    async exportAllImgs() {
        const res = await this.staticProvider.exportAllImg();
        return {
            statusCode: 200,
            data: res,
        };
    }
    async deleteALL() {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const res = await this.staticProvider.deleteAllIMG();
        return {
            statusCode: 200,
            data: res,
        };
    }
    async delete(sign) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const res = await this.staticProvider.deleteOneBySign(sign);
        return {
            statusCode: 200,
            data: res,
        };
    }
    async getByOption(page, pageSize = 5) {
        const option = {
            page,
            pageSize,
            staticType: 'img',
            view: 'public',
        };
        const data = await this.staticProvider.getByOption(option);
        return {
            statusCode: 200,
            data,
        };
    }
};
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)('favicon')),
    __param(2, (0, common_1.Query)('waterMarkText')),
    __param(3, (0, common_1.Query)('withWaterMark')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], ImgController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)('all'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImgController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('scan'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImgController.prototype, "scanImgsOfArticles", null);
__decorate([
    (0, common_1.Post)('export'),
    openapi.ApiResponse({ status: 201 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImgController.prototype, "exportAllImgs", null);
__decorate([
    (0, common_1.Delete)('/all/delete'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImgController.prototype, "deleteALL", null);
__decorate([
    (0, common_1.Delete)('/:sign'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('sign')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImgController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(''),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ImgController.prototype, "getByOption", null);
ImgController = __decorate([
    (0, swagger_1.ApiTags)('img'),
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    token_1.ApiToken,
    (0, common_1.Controller)('/api/admin/img'),
    __metadata("design:paramtypes", [static_provider_1.StaticProvider])
], ImgController);
exports.ImgController = ImgController;
