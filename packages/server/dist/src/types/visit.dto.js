"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVisitDto = void 0;
const openapi = require("@nestjs/swagger");
class createVisitDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { pathname: { required: true, type: () => String }, isNew: { required: true, type: () => Boolean } };
    }
}
exports.createVisitDto = createVisitDto;
//# sourceMappingURL=visit.dto.js.map