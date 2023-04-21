"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomPageSchema = exports.CustomPage = void 0;
const openapi = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CustomPage = class CustomPage extends mongoose_2.Document {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, path: { required: true, type: () => String }, type: { required: true, type: () => Object }, html: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, mongoose_1.Prop)({ index: true, unique: true }),
    __metadata("design:type", String)
], CustomPage.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true, unique: true }),
    __metadata("design:type", String)
], CustomPage.prototype, "path", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true, default: 'file' }),
    __metadata("design:type", String)
], CustomPage.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CustomPage.prototype, "html", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        index: true,
        default: () => {
            return new Date();
        },
    }),
    __metadata("design:type", Date)
], CustomPage.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        index: true,
        default: () => {
            return new Date();
        },
    }),
    __metadata("design:type", Date)
], CustomPage.prototype, "updatedAt", void 0);
CustomPage = __decorate([
    (0, mongoose_1.Schema)()
], CustomPage);
exports.CustomPage = CustomPage;
exports.CustomPageSchema = mongoose_1.SchemaFactory.createForClass(CustomPage);
