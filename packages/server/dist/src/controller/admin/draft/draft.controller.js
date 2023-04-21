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
exports.DraftController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const draft_dto_1 = require("../../../types/draft.dto");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const draft_provider_1 = require("../../../provider/draft/draft.provider");
const isr_provider_1 = require("../../../provider/isr/isr.provider");
const config_1 = require("../../../config");
const pipeline_provider_1 = require("../../../provider/pipeline/pipeline.provider");
const token_1 = require("../../../provider/swagger/token");
let DraftController = class DraftController {
    constructor(draftProvider, isrProvider, pipelineProvider) {
        this.draftProvider = draftProvider;
        this.isrProvider = isrProvider;
        this.pipelineProvider = pipelineProvider;
    }
    async getByOption(page, pageSize = 5, toListView = false, category, tags, title, sortCreatedAt, startTime, endTime) {
        const option = {
            page,
            pageSize,
            category,
            tags,
            title,
            sortCreatedAt,
            startTime,
            endTime,
            toListView,
        };
        const data = await this.draftProvider.getByOption(option);
        return {
            statusCode: 200,
            data,
        };
    }
    async getOne(id) {
        const data = await this.draftProvider.findById(id);
        return {
            statusCode: 200,
            data,
        };
    }
    async update(id, updateDto) {
        const result = await this.pipelineProvider.dispatchEvent("beforeUpdateDraft", updateDto);
        if (result.length > 0) {
            const lastResult = result[result.length - 1];
            const lastOuput = lastResult.output;
            if (lastOuput) {
                updateDto = lastOuput;
            }
        }
        const data = await this.draftProvider.updateById(id, updateDto);
        const updated = await this.draftProvider.findById(id);
        this.pipelineProvider.dispatchEvent("afterUpdateDraft", updated);
        return {
            statusCode: 200,
            data,
        };
    }
    async create(req, createDto) {
        var _a;
        const author = ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.nickname) || undefined;
        if (!createDto.author) {
            createDto.author = author;
        }
        const result = await this.pipelineProvider.dispatchEvent("beforeUpdateDraft", createDto);
        if (result.length > 0) {
            const lastResult = result[result.length - 1];
            const lastOuput = lastResult.output;
            if (lastOuput) {
                createDto = lastOuput;
            }
        }
        const data = await this.draftProvider.create(createDto);
        this.pipelineProvider.dispatchEvent("afterUpdateDraft", data);
        return {
            statusCode: 200,
            data,
        };
    }
    async publish(id, publishDto) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止发布草稿！',
            };
        }
        const result = await this.pipelineProvider.dispatchEvent("beforeUpdateArticle", publishDto);
        if (result.length > 0) {
            const lastResult = result[result.length - 1];
            const lastOuput = lastResult.output;
            if (lastOuput) {
                publishDto = lastOuput;
            }
        }
        const data = await this.draftProvider.publish(id, publishDto);
        this.isrProvider.activeAll('发布草稿触发增量渲染！');
        this.pipelineProvider.dispatchEvent("afterUpdateArticle", data);
        return {
            statusCode: 200,
            data,
        };
    }
    async delete(id) {
        const toDeleteDraft = await this.draftProvider.findById(id);
        const data = await this.draftProvider.deleteById(id);
        this.pipelineProvider.dispatchEvent("deleteDraft", toDeleteDraft);
        return {
            statusCode: 200,
            data,
        };
    }
};
__decorate([
    (0, common_1.Get)('/'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Query)('toListView')),
    __param(3, (0, common_1.Query)('category')),
    __param(4, (0, common_1.Query)('tags')),
    __param(5, (0, common_1.Query)('title')),
    __param(6, (0, common_1.Query)('sortCreatedAt')),
    __param(7, (0, common_1.Query)('startTime')),
    __param(8, (0, common_1.Query)('endTime')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], DraftController.prototype, "getByOption", null);
__decorate([
    (0, common_1.Get)('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DraftController.prototype, "getOne", null);
__decorate([
    (0, common_1.Put)('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, draft_dto_1.UpdateDraftDto]),
    __metadata("design:returntype", Promise)
], DraftController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, draft_dto_1.CreateDraftDto]),
    __metadata("design:returntype", Promise)
], DraftController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/publish'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, draft_dto_1.PublishDraftDto]),
    __metadata("design:returntype", Promise)
], DraftController.prototype, "publish", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DraftController.prototype, "delete", null);
DraftController = __decorate([
    (0, swagger_1.ApiTags)('draft'),
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    token_1.ApiToken,
    (0, common_1.Controller)('/api/admin/draft'),
    __metadata("design:paramtypes", [draft_provider_1.DraftProvider,
        isr_provider_1.ISRProvider,
        pipeline_provider_1.PipelineProvider])
], DraftController);
exports.DraftController = DraftController;
//# sourceMappingURL=draft.controller.js.map