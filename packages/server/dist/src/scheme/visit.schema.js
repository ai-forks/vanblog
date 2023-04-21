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
exports.VisitSchema = exports.Visit = void 0;
const openapi = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Visit = class Visit extends mongoose_2.Document {
    static _OPENAPI_METADATA_FACTORY() {
        return { visited: { required: true, type: () => Number }, viewer: { required: true, type: () => Number }, date: { required: true, type: () => String }, pathname: { required: true, type: () => String }, lastVisitedTime: { required: true, type: () => Date }, createdAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Visit.prototype, "visited", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Visit.prototype, "viewer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], Visit.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], Visit.prototype, "pathname", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", Date)
], Visit.prototype, "lastVisitedTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        index: true,
        default: () => {
            return new Date();
        },
    }),
    __metadata("design:type", Date)
], Visit.prototype, "createdAt", void 0);
Visit = __decorate([
    (0, mongoose_1.Schema)()
], Visit);
exports.Visit = Visit;
exports.VisitSchema = mongoose_1.SchemaFactory.createForClass(Visit);
