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
exports.PipelineController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const pipeline_provider_1 = require("../../../provider/pipeline/pipeline.provider");
const pipeline_dto_1 = require("../../../types/pipeline.dto");
const event_1 = require("../../../types/event");
const token_1 = require("../../../provider/swagger/token");
let PipelineController = class PipelineController {
    constructor(pipelineProvider) {
        this.pipelineProvider = pipelineProvider;
    }
    async getAllPipelines(req) {
        const pipelines = await this.pipelineProvider.getAll();
        return {
            statusCode: 200,
            data: pipelines,
        };
    }
    async getPipelineConfig(req) {
        return {
            statusCode: 200,
            data: event_1.VanblogSystemEvents,
        };
    }
    async getPipelineById(idString) {
        const id = parseInt(idString);
        const pipeline = await this.pipelineProvider.getPipelineById(id);
        return {
            statusCode: 200,
            data: pipeline,
        };
    }
    async createPipeline(createPipelineDto) {
        const pipeline = await this.pipelineProvider.createPipeline(createPipelineDto);
        return {
            statusCode: 200,
            data: pipeline,
        };
    }
    async deletePipelineById(idString) {
        const id = parseInt(idString);
        const pipeline = await this.pipelineProvider.deletePipelineById(id);
        return {
            statusCode: 200,
            data: pipeline,
        };
    }
    async updatePipelineById(idString, updatePipelineDto) {
        const id = parseInt(idString);
        const pipeline = await this.pipelineProvider.updatePipelineById(id, updatePipelineDto);
        return {
            statusCode: 200,
            data: pipeline,
        };
    }
    async triggerPipelineById(idString, triggerDto) {
        const id = parseInt(idString);
        const result = await this.pipelineProvider.triggerById(id, triggerDto.input);
        return {
            statusCode: 200,
            data: result,
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PipelineController.prototype, "getAllPipelines", null);
__decorate([
    (0, common_1.Get)('config'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PipelineController.prototype, "getPipelineConfig", null);
__decorate([
    (0, common_1.Get)('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PipelineController.prototype, "getPipelineById", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pipeline_dto_1.CreatePipelineDto]),
    __metadata("design:returntype", Promise)
], PipelineController.prototype, "createPipeline", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PipelineController.prototype, "deletePipelineById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pipeline_dto_1.CreatePipelineDto]),
    __metadata("design:returntype", Promise)
], PipelineController.prototype, "updatePipelineById", null);
__decorate([
    (0, common_1.Post)('/trigger/:id'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PipelineController.prototype, "triggerPipelineById", null);
PipelineController = __decorate([
    (0, swagger_1.ApiTags)('pipeline'),
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    token_1.ApiToken,
    (0, common_1.Controller)('/api/admin/pipeline'),
    __metadata("design:paramtypes", [pipeline_provider_1.PipelineProvider])
], PipelineController);
exports.PipelineController = PipelineController;
