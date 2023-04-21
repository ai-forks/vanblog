"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutDto = void 0;
const openapi = require("@nestjs/swagger");
class AboutDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { updatedAt: { required: true, type: () => Date }, content: { required: true, type: () => String } };
    }
}
exports.AboutDto = AboutDto;
//# sourceMappingURL=about.dto.js.map