/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { Request } from 'express';
import { PipelineProvider } from 'src/provider/pipeline/pipeline.provider';
import { CreatePipelineDto } from 'src/types/pipeline.dto';
export declare class PipelineController {
    private readonly pipelineProvider;
    constructor(pipelineProvider: PipelineProvider);
    getAllPipelines(req: Request): Promise<{
        statusCode: number;
        data: (import("mongoose").Document<unknown, {}, import("../../../scheme/pipeline.schema").PipelineDocument> & Omit<import("../../../scheme/pipeline.schema").Pipeline & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
    getPipelineConfig(req: Request): Promise<{
        statusCode: number;
        data: import("src/types/event").VanblogEventItem[];
    }>;
    getPipelineById(idString: string): Promise<{
        statusCode: number;
        data: import("mongoose").Document<unknown, {}, import("../../../scheme/pipeline.schema").PipelineDocument> & Omit<import("../../../scheme/pipeline.schema").Pipeline & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    createPipeline(createPipelineDto: CreatePipelineDto): Promise<{
        statusCode: number;
        data: void;
    }>;
    deletePipelineById(idString: string): Promise<{
        statusCode: number;
        data: void;
    }>;
    updatePipelineById(idString: string, updatePipelineDto: CreatePipelineDto): Promise<{
        statusCode: number;
        data: void;
    }>;
    triggerPipelineById(idString: string, triggerDto: {
        input?: any;
    }): Promise<{
        statusCode: number;
        data: import("src/provider/pipeline/pipeline.provider").CodeResult;
    }>;
}
