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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const analysis_provider_1 = require("../../../provider/analysis/analysis.provider");
const token_1 = require("../../../provider/swagger/token");
let AnalysisController = class AnalysisController {
    constructor(analysisProvider) {
        this.analysisProvider = analysisProvider;
    }
    async getWelcomePageData(tab, viewerDataNum = 5, overviewDataNum = 5, articleTabDataNum = 5) {
        const data = await this.analysisProvider.getWelcomePageData(tab, parseInt(overviewDataNum), parseInt(viewerDataNum), parseInt(articleTabDataNum));
        return {
            statusCode: 200,
            data,
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('tab')),
    __param(1, (0, common_1.Query)('viewerDataNum')),
    __param(2, (0, common_1.Query)('overviewDataNum')),
    __param(3, (0, common_1.Query)('articleTabDataNum')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AnalysisController.prototype, "getWelcomePageData", null);
AnalysisController = __decorate([
    (0, swagger_1.ApiTags)('analysis'),
    token_1.ApiToken,
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    (0, common_1.Controller)('/api/admin/analysis'),
    __metadata("design:paramtypes", [analysis_provider_1.AnalysisProvider])
], AnalysisController);
exports.AnalysisController = AnalysisController;
