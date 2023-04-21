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
var CountTask_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountTask = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const meta_provider_1 = require("../provider/meta/meta.provider");
let CountTask = CountTask_1 = class CountTask {
    constructor(metaProvider) {
        this.metaProvider = metaProvider;
        this.logger = new common_1.Logger(CountTask_1.name);
    }
    async handleCron() {
        await this.metaProvider.updateTotalWords('定时任务');
    }
};
__decorate([
    (0, schedule_1.Interval)(1000 * 60 * 5),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CountTask.prototype, "handleCron", null);
CountTask = CountTask_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [meta_provider_1.MetaProvider])
], CountTask);
exports.CountTask = CountTask;
//# sourceMappingURL=count.task.js.map