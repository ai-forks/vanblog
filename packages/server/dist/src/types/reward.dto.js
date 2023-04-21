"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardDto = exports.RewardItem = void 0;
const openapi = require("@nestjs/swagger");
class RewardItem {
    static _OPENAPI_METADATA_FACTORY() {
        return { updatedAt: { required: true, type: () => Date }, value: { required: true, type: () => String }, name: { required: true, type: () => String } };
    }
}
exports.RewardItem = RewardItem;
class RewardDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { value: { required: true, type: () => String }, name: { required: true, type: () => String } };
    }
}
exports.RewardDto = RewardDto;
//# sourceMappingURL=reward.dto.js.map