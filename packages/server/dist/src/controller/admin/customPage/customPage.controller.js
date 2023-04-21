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
var CustomPageController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomPageController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("../../../config");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const customPage_provider_1 = require("../../../provider/customPage/customPage.provider");
const static_provider_1 = require("../../../provider/static/static.provider");
const token_1 = require("../../../provider/swagger/token");
const customPage_schema_1 = require("../../../scheme/customPage.schema");
let CustomPageController = CustomPageController_1 = class CustomPageController {
    constructor(customPageProvider, staticProvider) {
        this.customPageProvider = customPageProvider;
        this.staticProvider = staticProvider;
        this.logger = new common_1.Logger(CustomPageController_1.name);
    }
    async upload(file, path, name) {
        this.logger.log(`上传自定义页面文件：${path}\t ${name}`);
        file.originalname = name;
        const res = await this.staticProvider.upload(file, 'customPage', false, path);
        return {
            statusCode: 200,
            data: res,
        };
    }
    async getAll() {
        return {
            statusCode: 200,
            data: await this.customPageProvider.getAll(),
        };
    }
    async getFolderFiles(path) {
        return {
            statusCode: 200,
            data: await this.staticProvider.getFolderFiles(path),
        };
    }
    async getFileData(path, subPath) {
        return {
            statusCode: 200,
            data: await this.staticProvider.getFileContent(path, subPath),
        };
    }
    async getOneByPath(path) {
        return {
            statusCode: 200,
            data: await this.customPageProvider.getCustomPageByPath(path),
        };
    }
    async createOne(dto) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.customPageProvider.createCustomPage(dto);
        return {
            statusCode: 200,
            data,
        };
    }
    async createFile(pathname, subPath) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.staticProvider.createFile(pathname, subPath);
        return {
            statusCode: 200,
            data,
        };
    }
    async createFolder(pathname, subPath) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.staticProvider.createFolder(pathname, subPath);
        return {
            statusCode: 200,
            data,
        };
    }
    async updateFileInFolder(dto) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.staticProvider.updateCustomPageFileContent(dto.pathname, dto.filePath, dto.content);
        return {
            statusCode: 200,
            data,
        };
    }
    async updateOne(dto) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.customPageProvider.updateCustomPage(dto);
        return {
            statusCode: 200,
            data,
        };
    }
    async deleteOne(path) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const toDelete = await this.customPageProvider.getCustomPageByPath(path);
        if (toDelete && toDelete.type == 'folder') {
            await this.staticProvider.deleteCustomPage(path);
        }
        const data = await this.customPageProvider.deleteByPath(path);
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
    __param(1, (0, common_1.Query)('path')),
    __param(2, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], CustomPageController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)('/all'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomPageController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/folder'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomPageController.prototype, "getFolderFiles", null);
__decorate([
    (0, common_1.Get)('/file'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('path')),
    __param(1, (0, common_1.Query)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomPageController.prototype, "getFileData", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomPageController.prototype, "getOneByPath", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customPage_schema_1.CustomPage]),
    __metadata("design:returntype", Promise)
], CustomPageController.prototype, "createOne", null);
__decorate([
    (0, common_1.Post)('file'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Query)('path')),
    __param(1, (0, common_1.Query)('subPath')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomPageController.prototype, "createFile", null);
__decorate([
    (0, common_1.Post)('folder'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Query)('path')),
    __param(1, (0, common_1.Query)('subPath')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomPageController.prototype, "createFolder", null);
__decorate([
    (0, common_1.Put)('file'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomPageController.prototype, "updateFileInFolder", null);
__decorate([
    (0, common_1.Put)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customPage_schema_1.CustomPage]),
    __metadata("design:returntype", Promise)
], CustomPageController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Delete)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Query)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomPageController.prototype, "deleteOne", null);
CustomPageController = CustomPageController_1 = __decorate([
    (0, swagger_1.ApiTags)('customPage'),
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    token_1.ApiToken,
    (0, common_1.Controller)('/api/admin/customPage'),
    __metadata("design:paramtypes", [customPage_provider_1.CustomPageProvider,
        static_provider_1.StaticProvider])
], CustomPageController);
exports.CustomPageController = CustomPageController;
//# sourceMappingURL=customPage.controller.js.map