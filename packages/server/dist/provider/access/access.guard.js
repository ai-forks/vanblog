"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AccessGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessGuard = void 0;
const common_1 = require("@nestjs/common");
const access_1 = require("../../types/access/access");
let AccessGuard = AccessGuard_1 = class AccessGuard {
    constructor() {
        this.logger = new common_1.Logger(AccessGuard_1.name);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return await this.validateRequest(request);
    }
    async validateRequest(request) {
        try {
            const path = request.route.path;
            const method = Object.keys(request.route.methods)[0];
            const key = `${method}-${path}`;
            const user = request.user;
            // console.log(key, user);
            if (!user) {
                // 不管了让后面的处理
                return true;
            }
            if (user.id == 0) {
                // 超管为 0
                return true;
            }
            else {
                if (access_1.publicRoutes.includes(key)) {
                    return true;
                }
                // 其他都为协作者
                const { permissions } = user || {};
                if (!permissions || permissions.length == 0) {
                    return false;
                }
                else {
                    if (permissions.includes('all')) {
                        return true;
                    }
                    else {
                        // 看看是不是带权限的路由
                        if (access_1.permissionRoutes.includes(key)) {
                            const p = access_1.pathPermissionMap[key];
                            return permissions.includes(p);
                        }
                        else {
                            return false;
                        }
                    }
                }
            }
        }
        catch (err) {
            // 出了问题可能是 404 路由，就不管了。
            return true;
        }
    }
};
AccessGuard = AccessGuard_1 = __decorate([
    (0, common_1.Injectable)()
], AccessGuard);
exports.AccessGuard = AccessGuard;
