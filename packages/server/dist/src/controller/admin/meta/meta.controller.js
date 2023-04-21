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
exports.MetaController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const loadConfig_1 = require("../../../utils/loadConfig");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const meta_provider_1 = require("../../../provider/meta/meta.provider");
const getVersion_1 = require("../../../utils/getVersion");
const token_1 = require("../../../provider/swagger/token");
let MetaController = class MetaController {
    constructor(metaProvider) {
        this.metaProvider = metaProvider;
    }
    async getAllMeta(req) {
        const meta = await this.metaProvider.getAll();
        const serverData = await (0, getVersion_1.getVersionFromServer)();
        const data = {
            version: loadConfig_1.version,
            latestVersion: (serverData === null || serverData === void 0 ? void 0 : serverData.version) || loadConfig_1.version,
            updatedAt: (serverData === null || serverData === void 0 ? void 0 : serverData.updatedAt) || new Date(),
            user: req.user,
            baseUrl: meta.siteInfo.baseUrl,
            enableComment: meta.siteInfo.enableComment || 'true',
            allowDomains: process.env.VAN_BLOG_ALLOW_DOMAINS || '',
        };
        return {
            statusCode: 200,
            data,
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getAllMeta", null);
MetaController = __decorate([
    (0, swagger_1.ApiTags)('meta'),
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    token_1.ApiToken,
    (0, common_1.Controller)('/api/admin/meta'),
    __metadata("design:paramtypes", [meta_provider_1.MetaProvider])
], MetaController);
exports.MetaController = MetaController;
