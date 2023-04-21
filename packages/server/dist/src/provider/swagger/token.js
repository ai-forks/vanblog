"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiToken = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.ApiToken = (0, swagger_1.ApiHeader)({
    name: "token",
    description: "鉴权密钥，请在后台 Token 管理中获取",
    required: true,
});
//# sourceMappingURL=token.js.map