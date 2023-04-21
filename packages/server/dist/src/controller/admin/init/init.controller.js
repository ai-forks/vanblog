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
exports.InitController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const init_dto_1 = require("../../../types/init.dto");
const init_provider_1 = require("../../../provider/init/init.provider");
const isr_provider_1 = require("../../../provider/isr/isr.provider");
const static_provider_1 = require("../../../provider/static/static.provider");
const token_1 = require("../../../provider/swagger/token");
let InitController = class InitController {
    constructor(initProvider, staticProvider, isrProvider) {
        this.initProvider = initProvider;
        this.staticProvider = staticProvider;
        this.isrProvider = isrProvider;
    }
    async initSystem(initDto) {
        const hasInit = await this.initProvider.checkHasInited();
        if (hasInit) {
            throw new common_1.HttpException('已初始化', 500);
        }
        await this.initProvider.init(initDto);
        this.isrProvider.activeAll('初始化触发增量渲染！', undefined, {
            forceActice: true,
        });
        return {
            statusCode: 200,
            message: '初始化成功!',
        };
    }
    async uploadImg(file, favicon) {
        const hasInit = await this.initProvider.checkHasInited();
        if (hasInit) {
            throw new common_1.HttpException('已初始化', 500);
        }
        let isFavicon = false;
        if (favicon && favicon == 'true') {
            isFavicon = true;
        }
        const res = await this.staticProvider.upload(file, 'img', isFavicon);
        return {
            statusCode: 200,
            data: res,
        };
    }
};
__decorate([
    (0, common_1.Post)('/init'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [init_dto_1.InitDto]),
    __metadata("design:returntype", Promise)
], InitController.prototype, "initSystem", null);
__decorate([
    (0, common_1.Post)('/init/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)('favicon')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], InitController.prototype, "uploadImg", null);
InitController = __decorate([
    (0, swagger_1.ApiTags)('init'),
    token_1.ApiToken,
    (0, common_1.Controller)('/api/admin'),
    __metadata("design:paramtypes", [init_provider_1.InitProvider,
        static_provider_1.StaticProvider,
        isr_provider_1.ISRProvider])
], InitController);
exports.InitController = InitController;
