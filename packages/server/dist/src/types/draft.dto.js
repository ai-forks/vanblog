"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchDraftOption = exports.PublishDraftDto = exports.UpdateDraftDto = exports.CreateDraftDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateDraftDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, content: { required: false, type: () => String }, tags: { required: false, type: () => [String] }, category: { required: true, type: () => String }, author: { required: false, type: () => String }, draft: { required: false, type: () => String } };
    }
}
exports.CreateDraftDto = CreateDraftDto;
class UpdateDraftDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: false, type: () => String }, content: { required: false, type: () => String }, tags: { required: false, type: () => [String] }, category: { required: false, type: () => String }, deleted: { required: false, type: () => Boolean }, author: { required: false, type: () => String }, draft: { required: false, type: () => String } };
    }
}
exports.UpdateDraftDto = UpdateDraftDto;
class PublishDraftDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { hidden: { required: false, type: () => Boolean }, pathname: { required: false, type: () => String }, private: { required: false, type: () => Boolean }, password: { required: false, type: () => String }, copyright: { required: false, type: () => String } };
    }
}
exports.PublishDraftDto = PublishDraftDto;
class SearchDraftOption {
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: true, type: () => Number }, pageSize: { required: true, type: () => Number }, category: { required: false, type: () => String }, tags: { required: false, type: () => String }, title: { required: false, type: () => String }, sortCreatedAt: { required: false, type: () => Object }, startTime: { required: false, type: () => String }, endTime: { required: false, type: () => String }, toListView: { required: false, type: () => Boolean } };
    }
}
exports.SearchDraftOption = SearchDraftOption;
//# sourceMappingURL=draft.dto.js.map