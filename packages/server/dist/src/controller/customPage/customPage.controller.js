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
exports.PublicOldCustomPageRedirectController = exports.PublicCustomPageController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const customPage_provider_1 = require("../../provider/customPage/customPage.provider");
const path_1 = require("path");
const config_1 = require("../../config");
const checkFolder_1 = require("../../utils/checkFolder");
let PublicCustomPageController = class PublicCustomPageController {
    constructor(customPageProvider) {
        this.customPageProvider = customPageProvider;
    }
    async getPageContent(pathname, res, req) {
        const foldername = pathname;
        if (!foldername) {
            res.status(404);
            throw new common_1.HttpException('未找到该页面！', 404);
        }
        const cur = await this.customPageProvider.getCustomPageByPath(`/${foldername}`);
        if (!cur) {
            res.status(404);
            throw new common_1.HttpException('未找到该页面！', 404);
        }
        if (cur.type == 'file' && !cur.html) {
            res.status(404);
            throw new common_1.HttpException('未找到该页面！', 404);
        }
        else if (cur.type == 'file' && cur.html) {
            res.status(200);
            res.send(cur.html);
            return;
        }
        else if (cur.type == 'folder') {
            let rPath = req.url.replace('/c/', '');
            const rPathArr = rPath.split('/');
            const lastString = rPathArr[rPathArr.length - 1];
            if (lastString == '') {
                rPath = rPathArr.join('/') + `/index.html`;
            }
            if (!lastString.includes('.')) {
                if ((0, checkFolder_1.checkFolder)((0, path_1.join)(config_1.config.staticPath, 'customPage', rPath))) {
                    res.redirect(302, req.url + '/');
                    return;
                }
            }
            const absPath = (0, path_1.join)(config_1.config.staticPath, 'customPage', rPath);
            res.sendFile(absPath);
            return;
        }
        res.status(404);
        throw new common_1.HttpException('未找到该页面！', 404);
    }
};
__decorate([
    (0, common_1.Get)('/:pathname*'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('pathname')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PublicCustomPageController.prototype, "getPageContent", null);
PublicCustomPageController = __decorate([
    (0, swagger_1.ApiTags)('c'),
    (0, common_1.Controller)('c'),
    __metadata("design:paramtypes", [customPage_provider_1.CustomPageProvider])
], PublicCustomPageController);
exports.PublicCustomPageController = PublicCustomPageController;
let PublicOldCustomPageRedirectController = class PublicOldCustomPageRedirectController {
    async redirect(res, req) {
        const newUrl = req.url.replace('/custom/', '/c/');
        res.redirect(301, newUrl);
        return;
    }
};
__decorate([
    (0, common_1.Get)('/:pathname*'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PublicOldCustomPageRedirectController.prototype, "redirect", null);
PublicOldCustomPageRedirectController = __decorate([
    (0, common_1.Controller)('custom')
], PublicOldCustomPageRedirectController);
exports.PublicOldCustomPageRedirectController = PublicOldCustomPageRedirectController;
//# sourceMappingURL=customPage.controller.js.map