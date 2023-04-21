"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryDto = exports.CreateCategoryDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateCategoryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String } };
    }
}
exports.CreateCategoryDto = CreateCategoryDto;
class UpdateCategoryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, password: { required: false, type: () => String }, private: { required: false, type: () => Boolean } };
    }
}
exports.UpdateCategoryDto = UpdateCategoryDto;
