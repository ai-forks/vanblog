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
exports.SiteMetaController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const isr_provider_1 = require("../../../provider/isr/isr.provider");
const meta_provider_1 = require("../../../provider/meta/meta.provider");
const waline_provider_1 = require("../../../provider/waline/waline.provider");
const config_1 = require("../../../config");
const website_provider_1 = require("../../../provider/website/website.provider");
const pipeline_provider_1 = require("../../../provider/pipeline/pipeline.provider");
const token_1 = require("../../../provider/swagger/token");
let SiteMetaController = class SiteMetaController {
    constructor(metaProvider, isrProvider, walineProvider, websiteProvider, pipelineProvider) {
        this.metaProvider = metaProvider;
        this.isrProvider = isrProvider;
        this.walineProvider = walineProvider;
        this.websiteProvider = websiteProvider;
        this.pipelineProvider = pipelineProvider;
    }
    async get() {
        const data = await this.metaProvider.getSiteInfo();
        return {
            statusCode: 200,
            data,
        };
    }
    async update(updateDto) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const data = await this.metaProvider.updateSiteInfo(updateDto);
        this.pipelineProvider.dispatchEvent('updateSiteInfo', updateDto);
        this.isrProvider.activeAll('更新站点配置触发增量渲染！');
        this.walineProvider.restart('更新站点，');
        this.websiteProvider.restart('更新站点信息');
        return {
            statusCode: 200,
            data,
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SiteMetaController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SiteMetaController.prototype, "update", null);
SiteMetaController = __decorate([
    (0, swagger_1.ApiTags)('site'),
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    token_1.ApiToken,
    (0, common_1.Controller)('/api/admin/meta/site'),
    __metadata("design:paramtypes", [meta_provider_1.MetaProvider,
        isr_provider_1.ISRProvider,
        waline_provider_1.WalineProvider,
        website_provider_1.WebsiteProvider,
        pipeline_provider_1.PipelineProvider])
], SiteMetaController);
exports.SiteMetaController = SiteMetaController;
//# sourceMappingURL=site.meta.controller.js.map