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
exports.SettingSchema = exports.Setting = void 0;
const openapi = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Setting = class Setting extends mongoose_2.Document {
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: true, type: () => Object }, value: { required: true, type: () => Object } };
    }
};
__decorate([
    (0, mongoose_1.Prop)({ default: 'static', index: true, unique: true }),
    __metadata("design:type", String)
], Setting.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.Mixed }),
    __metadata("design:type", Object)
], Setting.prototype, "value", void 0);
Setting = __decorate([
    (0, mongoose_1.Schema)()
], Setting);
exports.Setting = Setting;
exports.SettingSchema = mongoose_1.SchemaFactory.createForClass(Setting);
