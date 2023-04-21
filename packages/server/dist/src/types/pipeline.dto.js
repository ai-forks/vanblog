"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePipelineDto = exports.CreatePipelineDto = void 0;
const openapi = require("@nestjs/swagger");
class CreatePipelineDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, enabled: { required: true, type: () => Boolean }, eventName: { required: true, type: () => String }, script: { required: true, type: () => String }, deps: { required: false, type: () => [String] } };
    }
}
exports.CreatePipelineDto = CreatePipelineDto;
class UpdatePipelineDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, description: { required: false, type: () => String }, enabled: { required: false, type: () => Boolean }, eventName: { required: false, type: () => String }, script: { required: false, type: () => String }, deps: { required: false, type: () => [String] } };
    }
}
exports.UpdatePipelineDto = UpdatePipelineDto;
//# sourceMappingURL=pipeline.dto.js.map