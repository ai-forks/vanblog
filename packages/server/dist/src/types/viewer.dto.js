"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createViewerDto = void 0;
const openapi = require("@nestjs/swagger");
class createViewerDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { visited: { required: true, type: () => Number }, viewer: { required: true, type: () => Number }, date: { required: true, type: () => String } };
    }
}
exports.createViewerDto = createViewerDto;
//# sourceMappingURL=viewer.dto.js.map