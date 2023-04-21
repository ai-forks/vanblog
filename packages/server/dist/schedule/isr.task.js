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
exports.ISRTask = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const isr_provider_1 = require("../provider/isr/isr.provider");
let ISRTask = class ISRTask {
    constructor(isrProvider) {
        this.isrProvider = isrProvider;
    }
    async handleCron() {
        // 每到整点小时，手动触发一次 ISR。
        // 这样可以预防某些情况下，服务端渲染了默认黑色主题，可是客户端是白天导致的闪屏问题。
        this.isrProvider.activeAll('定时触发 ISR');
    }
};
__decorate([
    (0, schedule_1.Cron)('0 0 */1 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ISRTask.prototype, "handleCron", null);
ISRTask = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [isr_provider_1.ISRProvider])
], ISRTask);
exports.ISRTask = ISRTask;
