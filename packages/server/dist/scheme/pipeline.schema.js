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
exports.PipelineSchema = exports.Pipeline = void 0;
const openapi = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Pipeline = class Pipeline extends mongoose_2.Document {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, eventType: { required: true, type: () => Object }, description: { required: true, type: () => String }, enabled: { required: true, type: () => Boolean }, deps: { required: true, type: () => [String] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, eventName: { required: true, type: () => String }, script: { required: true, type: () => String }, deleted: { required: true, type: () => Boolean } };
    }
};
__decorate([
    (0, mongoose_1.Prop)({ index: true, unique: true }),
    __metadata("design:type", Number)
], Pipeline.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], Pipeline.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], Pipeline.prototype, "eventType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], Pipeline.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Pipeline.prototype, "enabled", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], Pipeline.prototype, "deps", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        index: true,
        default: () => {
            return new Date();
        },
    }),
    __metadata("design:type", Date)
], Pipeline.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        index: true,
        default: () => {
            return new Date();
        },
    }),
    __metadata("design:type", Date)
], Pipeline.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], Pipeline.prototype, "eventName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Pipeline.prototype, "script", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false, index: true }),
    __metadata("design:type", Boolean)
], Pipeline.prototype, "deleted", void 0);
Pipeline = __decorate([
    (0, mongoose_1.Schema)()
], Pipeline);
exports.Pipeline = Pipeline;
exports.PipelineSchema = mongoose_1.SchemaFactory.createForClass(Pipeline);
