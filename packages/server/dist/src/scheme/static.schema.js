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
exports.StaticSchema = exports.Static = void 0;
const openapi = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Static = class Static extends mongoose_2.Document {
    static _OPENAPI_METADATA_FACTORY() {
        return { staticType: { required: true, type: () => Object }, storageType: { required: true, type: () => Object }, fileType: { required: true, type: () => String }, realPath: { required: true, type: () => String }, meta: { required: true, type: () => Object }, name: { required: true, type: () => String }, sign: { required: true, type: () => String }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, mongoose_1.Prop)({ default: 'img', index: true }),
    __metadata("design:type", String)
], Static.prototype, "staticType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'local', index: true }),
    __metadata("design:type", String)
], Static.prototype, "storageType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], Static.prototype, "fileType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Static.prototype, "realPath", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.Mixed }),
    __metadata("design:type", Object)
], Static.prototype, "meta", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], Static.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], Static.prototype, "sign", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        index: true,
        default: () => {
            return new Date();
        },
    }),
    __metadata("design:type", Date)
], Static.prototype, "updatedAt", void 0);
Static = __decorate([
    (0, mongoose_1.Schema)()
], Static);
exports.Static = Static;
exports.StaticSchema = mongoose_1.SchemaFactory.createForClass(Static);
