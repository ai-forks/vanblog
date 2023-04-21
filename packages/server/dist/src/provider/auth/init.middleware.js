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
exports.InitMiddleware = void 0;
const common_1 = require("@nestjs/common");
const init_provider_1 = require("../init/init.provider");
let InitMiddleware = class InitMiddleware {
    constructor(initProvider) {
        this.initProvider = initProvider;
    }
    async use(req, res, next) {
        if (req.path == '/api/admin/init') {
            next();
        }
        else {
            const hasInit = await this.initProvider.checkHasInited();
            if (hasInit) {
                next();
            }
            else {
                res.json({
                    statusCode: 233,
                    message: '未初始化!',
                    data: {
                        allowDomains: process.env.VAN_BLOG_ALLOW_DOMAINS || '',
                    },
                });
            }
        }
    }
};
InitMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [init_provider_1.InitProvider])
], InitMiddleware);
exports.InitMiddleware = InitMiddleware;
//# sourceMappingURL=init.middleware.js.map