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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ViewerTask_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewerTask = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const dayjs_1 = __importDefault(require("dayjs"));
const meta_provider_1 = require("../provider/meta/meta.provider");
const viewer_provider_1 = require("../provider/viewer/viewer.provider");
let ViewerTask = ViewerTask_1 = class ViewerTask {
    constructor(metaProvider, viewerProvider) {
        this.metaProvider = metaProvider;
        this.viewerProvider = viewerProvider;
        this.logger = new common_1.Logger(ViewerTask_1.name);
    }
    async handleCron() {
        const curTime = (0, dayjs_1.default)();
        const { visited, viewer } = await this.metaProvider.getViewer();
        this.logger.debug(`[${curTime.format('YYYY-MM-DD HH:mm:ss')}] visitor: ${visited} \t viewer: ${viewer}`);
        this.viewerProvider.createOrUpdate({
            viewer: viewer,
            visited: visited,
            date: curTime.format('YYYY-MM-DD'),
        });
    }
};
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ViewerTask.prototype, "handleCron", null);
ViewerTask = ViewerTask_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [meta_provider_1.MetaProvider,
        viewer_provider_1.ViewerProvider])
], ViewerTask);
exports.ViewerTask = ViewerTask;
