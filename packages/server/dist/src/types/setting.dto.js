"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticSetting = exports.StoragePath = exports.defaultStaticSetting = void 0;
const openapi = require("@nestjs/swagger");
exports.defaultStaticSetting = {
    storageType: 'local',
    picgoConfig: null,
    enableWaterMark: false,
    enableWebp: true,
    waterMarkText: null,
    picgoPlugins: null,
};
exports.StoragePath = {
    img: `img`,
    customPage: `customPage`,
};
class StaticSetting {
    static _OPENAPI_METADATA_FACTORY() {
        return { storageType: { required: true, type: () => Object }, picgoConfig: { required: true, type: () => Object }, picgoPlugins: { required: true, type: () => String }, enableWaterMark: { required: true, type: () => Boolean }, waterMarkText: { required: true, type: () => String }, enableWebp: { required: true, type: () => Boolean } };
    }
}
exports.StaticSetting = StaticSetting;
//# sourceMappingURL=setting.dto.js.map