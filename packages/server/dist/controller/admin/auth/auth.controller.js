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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../../config/index");
const user_dto_1 = require("../../../types/user.dto");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const auth_provider_1 = require("../../../provider/auth/auth.provider");
const log_provider_1 = require("../../../provider/log/log.provider");
const user_provider_1 = require("../../../provider/user/user.provider");
const login_guard_1 = require("../../../provider/auth/login.guard");
const token_provider_1 = require("../../../provider/token/token.provider");
const cache_provider_1 = require("../../../provider/cache/cache.provider");
const init_provider_1 = require("../../../provider/init/init.provider");
const pipeline_provider_1 = require("../../../provider/pipeline/pipeline.provider");
const token_1 = require("../../../provider/swagger/token");
let AuthController = class AuthController {
    constructor(authProvider, userProvider, logProvider, tokenProvider, cacheProvider, initProvider, pipelineProvider) {
        this.authProvider = authProvider;
        this.userProvider = userProvider;
        this.logProvider = logProvider;
        this.tokenProvider = tokenProvider;
        this.cacheProvider = cacheProvider;
        this.initProvider = initProvider;
        this.pipelineProvider = pipelineProvider;
    }
    async login(request) {
        var _a;
        if ((_a = request === null || request === void 0 ? void 0 : request.user) === null || _a === void 0 ? void 0 : _a.fail) {
            this.logProvider.login(request, false);
            throw new common_1.UnauthorizedException({
                statusCode: 401,
                message: '用户名或密码错误！',
            });
        }
        // 能到这里登陆就成功了
        this.logProvider.login(request, true);
        const data = await this.authProvider.login(request.user);
        this.pipelineProvider.dispatchEvent('login', data);
        return {
            statusCode: 200,
            data,
        };
    }
    async logout(request) {
        const token = request.headers['token'];
        if (!token) {
            throw new common_1.UnauthorizedException({
                statusCode: 401,
                message: '无登录凭证！',
            });
        }
        this.pipelineProvider.dispatchEvent('logout', {
            token,
        });
        await this.tokenProvider.disableToken(token);
        return {
            statusCode: 200,
            data: '登出成功！',
        };
    }
    async restore(request, body) {
        const token = body.key;
        const keyInCache = await this.cacheProvider.get('restoreKey');
        if (!token || token != keyInCache) {
            throw new common_1.UnauthorizedException({
                statusCode: 401,
                message: '恢复密钥错误！',
            });
        }
        await this.userProvider.updateUser({
            name: body.name,
            password: body.password,
        });
        await this.initProvider.initRestoreKey();
        setTimeout(() => {
            // 在前端清理 localStore 之后
            this.tokenProvider.disableAll();
        }, 1000);
        return {
            statusCode: 200,
            data: '重置成功！',
        };
    }
    async updateUser(updateUserDto) {
        if ((index_1.config === null || index_1.config === void 0 ? void 0 : index_1.config.demo) == true || (index_1.config === null || index_1.config === void 0 ? void 0 : index_1.config.demo) == 'true') {
            return { statusCode: 401, message: '演示站禁止修改账号密码！' };
        }
        const data = await this.userProvider.updateUser(updateUserDto);
        setTimeout(() => {
            // 在前端清理 localStore 之后
            this.tokenProvider.disableAll();
        }, 1000);
        return {
            statusCode: 200,
            data,
        };
    }
};
__decorate([
    (0, common_1.UseGuards)(login_guard_1.LoginGuard, (0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('/login'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/logout'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('/restore'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "restore", null);
__decorate([
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    token_1.ApiToken,
    (0, common_1.Put)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUser", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('tag'),
    (0, common_1.Controller)('/api/admin/auth/'),
    __metadata("design:paramtypes", [auth_provider_1.AuthProvider,
        user_provider_1.UserProvider,
        log_provider_1.LogProvider,
        token_provider_1.TokenProvider,
        cache_provider_1.CacheProvider,
        init_provider_1.InitProvider,
        pipeline_provider_1.PipelineProvider])
], AuthController);
exports.AuthController = AuthController;
