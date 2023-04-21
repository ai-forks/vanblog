"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchArticleOption = exports.UpdateArticleDto = exports.CreateArticleDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateArticleDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, content: { required: false, type: () => String }, tags: { required: false, type: () => [String] }, top: { required: false, type: () => Number }, category: { required: true, type: () => String }, hidden: { required: false, type: () => Boolean }, private: { required: false, type: () => Boolean }, password: { required: false, type: () => String }, updatedAt: { required: false, type: () => Date }, createdAt: { required: false, type: () => Date }, author: { required: false, type: () => String }, copyright: { required: false, type: () => String }, pathname: { required: false, type: () => String } };
    }
}
exports.CreateArticleDto = CreateArticleDto;
class UpdateArticleDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: false, type: () => String }, content: { required: false, type: () => String }, tags: { required: false, type: () => [String] }, category: { required: false, type: () => String }, hidden: { required: false, type: () => Boolean }, top: { required: false, type: () => Number }, private: { required: false, type: () => Boolean }, password: { required: false, type: () => String }, deleted: { required: false, type: () => Boolean }, viewer: { required: false, type: () => Number }, visited: { required: false, type: () => Number }, updatedAt: { required: false, type: () => Date }, author: { required: false, type: () => String }, copyright: { required: false, type: () => String }, pathname: { required: false, type: () => String } };
    }
}
exports.UpdateArticleDto = UpdateArticleDto;
class SearchArticleOption {
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: true, type: () => Number }, pageSize: { required: true, type: () => Number }, regMatch: { required: true, type: () => Boolean }, category: { required: false, type: () => String }, tags: { required: false, type: () => String }, title: { required: false, type: () => String }, sortCreatedAt: { required: false, type: () => Object }, sortTop: { required: false, type: () => Object }, startTime: { required: false, type: () => String }, endTime: { required: false, type: () => String }, sortViewer: { required: false, type: () => String }, toListView: { required: false, type: () => Boolean }, withWordCount: { required: false, type: () => Boolean }, author: { required: false, type: () => String } };
    }
}
exports.SearchArticleOption = SearchArticleOption;
