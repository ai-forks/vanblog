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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = void 0;
const common_1 = require("@nestjs/common");
const token_provider_1 = require("../token/token.provider");
const user_provider_1 = require("../user/user.provider");
let AuthProvider = class AuthProvider {
    constructor(usersService, tokenProvider) {
        this.usersService = usersService;
        this.tokenProvider = tokenProvider;
    }
    async validateUser(username, pass) {
        const user = await this.usersService.validateUser(username, pass);
        if (user) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async login(user) {
        var _a, _b, _c;
        const payload = {
            username: user.name,
            sub: user.id,
            type: ((_a = ((user === null || user === void 0 ? void 0 : user._doc) || user)) === null || _a === void 0 ? void 0 : _a.type) || undefined,
            nickname: ((_b = ((user === null || user === void 0 ? void 0 : user._doc) || user)) === null || _b === void 0 ? void 0 : _b.nickname) || undefined,
            permissions: ((_c = ((user === null || user === void 0 ? void 0 : user._doc) || user)) === null || _c === void 0 ? void 0 : _c.permissions) || undefined,
        };
        if (user._doc) {
            payload.username = user._doc.name;
            payload.sub = user._doc.id;
        }
        const token = await this.tokenProvider.createToken(payload);
        return {
            token,
            user: {
                name: payload.username,
                id: payload.sub,
                type: payload.type,
                nickname: payload.nickname,
                permissions: payload.permissions,
            },
        };
    }
};
AuthProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_provider_1.UserProvider,
        token_provider_1.TokenProvider])
], AuthProvider);
exports.AuthProvider = AuthProvider;
