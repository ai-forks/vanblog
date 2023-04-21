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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var LoginGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginGuard = void 0;
const common_1 = require("@nestjs/common");
const dayjs_1 = __importDefault(require("dayjs"));
const cache_provider_1 = require("../cache/cache.provider");
const utils_1 = require("../log/utils");
const setting_provider_1 = require("../setting/setting.provider");
let LoginGuard = LoginGuard_1 = class LoginGuard {
    constructor(cacheProvider, settingProvider) {
        this.cacheProvider = cacheProvider;
        this.settingProvider = settingProvider;
        this.logger = new common_1.Logger(LoginGuard_1.name);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return await this.validateRequest(request);
    }
    async validateRequest(request) {
        const loginSetting = await this.settingProvider.getLoginSetting();
        if (!loginSetting) {
            return true;
        }
        else {
            const { enableMaxLoginRetry } = loginSetting || {};
            if (!enableMaxLoginRetry) {
                return true;
            }
        }
        const { ip } = await (0, utils_1.getNetIp)(request);
        if (ip.trim() == '') {
            // 获取不到 ip 就当你🐂吧
            return true;
        }
        const key = `login-${ip.trim()}`;
        const { count, lastLoginTime } = this.cacheProvider.get(key);
        if (!lastLoginTime) {
            this.cacheProvider.set(key, {
                count: 1,
                lastLoginTime: new Date(),
            });
        }
        else {
            const now = (0, dayjs_1.default)();
            const diff = now.diff((0, dayjs_1.default)(lastLoginTime), 'seconds');
            if (diff > 60) {
                this.cacheProvider.set(key, {
                    count: 1,
                    lastLoginTime: new Date(),
                });
            }
            else {
                if (count >= 3) {
                    this.logger.warn(`登录频繁失败检测触发\nip: ${ip}\ncount: ${count}\nlastLoginTime: ${lastLoginTime}\ndiff: ${diff}`);
                    this.cacheProvider.set(key, {
                        count: count + 1,
                        lastLoginTime: new Date(),
                    });
                    throw new common_1.UnauthorizedException({
                        statusCode: 401,
                        message: '错误次数过多！请一分钟之后再试！',
                    });
                }
                else {
                    this.cacheProvider.set(key, {
                        count: count + 1,
                        lastLoginTime: new Date(),
                    });
                }
            }
        }
        return true;
    }
};
LoginGuard = LoginGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cache_provider_1.CacheProvider,
        setting_provider_1.SettingProvider])
], LoginGuard);
exports.LoginGuard = LoginGuard;
