"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitDto = void 0;
const openapi = require("@nestjs/swagger");
class InitDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { user: { required: true, type: () => ({ username: { required: true, type: () => String }, password: { required: true, type: () => String }, nickname: { required: true, type: () => String } }) }, siteInfo: { required: true, type: () => require("./site.dto").SiteInfo } };
    }
}
exports.InitDto = InitDto;
//# sourceMappingURL=init.dto.js.map