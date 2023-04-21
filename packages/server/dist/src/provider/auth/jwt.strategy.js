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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const meta_provider_1 = require("../meta/meta.provider");
const user_provider_1 = require("../user/user.provider");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(userProvider, metaProvider) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromHeader('token'),
            secretOrKey: global.jwtSecret,
        });
        this.userProvider = userProvider;
        this.metaProvider = metaProvider;
    }
    async validate(payload) {
        const moreDto = Object.assign({}, payload);
        if (payload.sub != 0) {
            const user = await this.userProvider.getCollaboratorById(payload.sub);
            moreDto.permissions = user.permissions;
            moreDto.nickname = user.nickname;
        }
        else {
            const user = await this.userProvider.getUser();
            const siteInfo = await this.metaProvider.getSiteInfo();
            const authorName = siteInfo.author;
            moreDto.nickname = authorName || user.nickname;
        }
        return Object.assign({ name: payload.username, id: payload.sub }, moreDto);
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_provider_1.UserProvider,
        meta_provider_1.MetaProvider])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map