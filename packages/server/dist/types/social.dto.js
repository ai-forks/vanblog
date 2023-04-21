"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialDto = exports.SocialItem = void 0;
const openapi = require("@nestjs/swagger");
class SocialItem {
    static _OPENAPI_METADATA_FACTORY() {
        return { updatedAt: { required: true, type: () => Date }, value: { required: true, type: () => String }, type: { required: true, type: () => Object } };
    }
}
exports.SocialItem = SocialItem;
class SocialDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { value: { required: true, type: () => String }, type: { required: true, type: () => Object } };
    }
}
exports.SocialDto = SocialDto;
