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
var TokenGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGuard = void 0;
const common_1 = require("@nestjs/common");
const token_provider_1 = require("../token/token.provider");
let TokenGuard = TokenGuard_1 = class TokenGuard {
    constructor(tokenProvider) {
        this.tokenProvider = tokenProvider;
        this.logger = new common_1.Logger(TokenGuard_1.name);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return await this.validateRequest(request);
    }
    async validateRequest(request) {
        const token = request.headers['token'];
        const ok = await this.tokenProvider.checkToken(token);
        if (!ok) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
};
TokenGuard = TokenGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_provider_1.TokenProvider])
], TokenGuard);
exports.TokenGuard = TokenGuard;
