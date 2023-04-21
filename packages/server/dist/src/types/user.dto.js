"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDto = exports.UpdateUserDto = void 0;
const openapi = require("@nestjs/swagger");
class UpdateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, name: { required: true, type: () => String }, password: { required: true, type: () => String }, nickname: { required: false, type: () => String } };
    }
}
exports.UpdateUserDto = UpdateUserDto;
class LoginDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, password: { required: true, type: () => String } };
    }
}
exports.LoginDto = LoginDto;
