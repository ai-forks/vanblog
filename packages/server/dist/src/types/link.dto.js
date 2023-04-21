"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkDto = exports.LinkItem = void 0;
const openapi = require("@nestjs/swagger");
class LinkItem {
    static _OPENAPI_METADATA_FACTORY() {
        return { updatedAt: { required: true, type: () => Date }, url: { required: true, type: () => String }, name: { required: true, type: () => String }, desc: { required: true, type: () => String }, logo: { required: true, type: () => String } };
    }
}
exports.LinkItem = LinkItem;
class LinkDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { url: { required: true, type: () => String }, name: { required: true, type: () => String }, desc: { required: true, type: () => String }, logo: { required: true, type: () => String } };
    }
}
exports.LinkDto = LinkDto;
