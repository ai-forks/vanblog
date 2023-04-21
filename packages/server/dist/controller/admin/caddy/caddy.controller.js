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
var CaddyController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaddyController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const config_1 = require("../../../config");
const setting_provider_1 = require("../../../provider/setting/setting.provider");
const caddy_provider_1 = require("../../../provider/caddy/caddy.provider");
const ip_1 = require("../../../utils/ip");
const token_1 = require("../../../provider/swagger/token");
let CaddyController = CaddyController_1 = class CaddyController {
    constructor(settingProvider, caddyProvider) {
        this.settingProvider = settingProvider;
        this.caddyProvider = caddyProvider;
        this.logger = new common_1.Logger(CaddyController_1.name);
    }
    async getHttpsConfig() {
        const config = await this.settingProvider.getHttpsSetting();
        return {
            statusCode: 200,
            data: config,
        };
    }
    async askOnDemand(domain) {
        // console.log(is);
        const is = (0, ip_1.isIpv4)(domain);
        // console.log(domain, is);
        if (!is) {
            return 'is Domain, on damand https';
        }
        else {
            // 增加到 subjects 中
            this.logger.log('试图通过 ip + https 访问，已驳回');
            // this.caddyProvider.addSubject(domain);
            throw new common_1.BadRequestException();
        }
    }
    async clearLog() {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        await this.caddyProvider.clearLog();
        return {
            statusCode: 200,
            data: '清除 Caddy 运行日志成功！',
        };
    }
    async getCaddyLog() {
        const log = await this.caddyProvider.getLog();
        return {
            statusCode: 200,
            data: log,
        };
    }
    async getCaddyConfig() {
        const caddyConfig = await this.caddyProvider.getConfig();
        return {
            statusCode: 200,
            data: JSON.stringify(caddyConfig, null, 2),
        };
    }
    async updateHttpsConfig(dto) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const result = await this.caddyProvider.setRedirect(dto.redirect || false);
        if (!result) {
            return {
                statusCode: 500,
                message: '更新失败！请查看 Caddy 日志获取详细信息！',
            };
        }
        await this.settingProvider.updateHttpsSetting(dto);
        return {
            statusCode: 200,
            data: '更新成功！',
        };
    }
};
__decorate([
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    (0, common_1.Get)('https'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CaddyController.prototype, "getHttpsConfig", null);
__decorate([
    (0, common_1.Get)('ask'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Query)('domain')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CaddyController.prototype, "askOnDemand", null);
__decorate([
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    (0, common_1.Delete)('log'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CaddyController.prototype, "clearLog", null);
__decorate([
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    (0, common_1.Get)('log'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CaddyController.prototype, "getCaddyLog", null);
__decorate([
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    (0, common_1.Get)('config'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CaddyController.prototype, "getCaddyConfig", null);
__decorate([
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    (0, common_1.Put)('https'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaddyController.prototype, "updateHttpsConfig", null);
CaddyController = CaddyController_1 = __decorate([
    (0, swagger_1.ApiTags)('caddy'),
    token_1.ApiToken,
    (0, common_1.Controller)('/api/admin/caddy'),
    __metadata("design:paramtypes", [setting_provider_1.SettingProvider,
        caddy_provider_1.CaddyProvider])
], CaddyController);
exports.CaddyController = CaddyController;
