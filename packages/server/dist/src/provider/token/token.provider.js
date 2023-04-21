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
var TokenProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenProvider = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const setting_provider_1 = require("../setting/setting.provider");
let TokenProvider = TokenProvider_1 = class TokenProvider {
    constructor(tokenModel, jwtService, settingProvider) {
        this.tokenModel = tokenModel;
        this.jwtService = jwtService;
        this.settingProvider = settingProvider;
        this.logger = new common_1.Logger(TokenProvider_1.name);
        this.timer = null;
    }
    async getAllAPIToken() {
        this.logger.log(`获取所有 API Token`);
        return await this.tokenModel.find({ userId: 666666, disabled: false }).exec();
    }
    async disableAPIToken(token) {
        return await this.tokenModel.updateOne({ token }, { disabled: true });
    }
    async disableAPITokenByName(name) {
        return await this.tokenModel.updateOne({ name }, { disabled: true });
    }
    async disableAPITokenById(id) {
        return await this.tokenModel.updateOne({ _id: id }, { disabled: true });
    }
    async createAPIToken(name) {
        this.logger.log(`创建 API Token`);
        const expiresIn = 3600 * 24 * 365 * 100;
        const token = this.jwtService.sign({
            sub: 0,
            username: name,
            role: 'admin',
        }, {
            expiresIn,
        });
        this.tokenModel.create({ userId: 666666, name, token, expiresIn });
        return token;
    }
    async createToken(payload) {
        this.logger.debug(`用户 ${payload.username} 登录，创建 Token。`);
        const loginSetting = await this.settingProvider.getLoginSetting();
        const expiresIn = (loginSetting === null || loginSetting === void 0 ? void 0 : loginSetting.expiresIn) || 3600 * 24 * 7;
        const token = this.jwtService.sign(payload, {
            expiresIn,
        });
        this.tokenModel.create({ userId: payload.sub, token, expiresIn });
        return token;
    }
    async disableToken(token) {
        return await this.tokenModel.updateOne({ token }, { disabled: true });
    }
    async disableAll() {
        return await this.tokenModel.updateMany({ disabled: false }, { disabled: true });
    }
    async disableAllAdmin() {
        return await this.tokenModel.updateMany({ disabled: false, userId: 0 }, { disabled: true });
    }
    async disableAllCollaborator() {
        return await this.tokenModel.updateMany({ disabled: false, userId: { $ne: 0 } }, { disabled: true });
    }
    async disableByUserId(id) {
        return await this.tokenModel.updateMany({ disabled: false, userId: id }, { disabled: true });
    }
    async checkToken(token) {
        const result = await this.tokenModel.findOne({ token, disabled: false });
        if (!result) {
            return false;
        }
        return true;
    }
};
TokenProvider = TokenProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Token')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        setting_provider_1.SettingProvider])
], TokenProvider);
exports.TokenProvider = TokenProvider;
//# sourceMappingURL=token.provider.js.map