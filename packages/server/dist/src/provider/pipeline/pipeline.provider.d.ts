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
/// <reference types="mongoose/types/inferschematype" />
import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { PipelineDocument } from 'src/scheme/pipeline.schema';
import { VanblogSystemEvent } from 'src/types/event';
import { CreatePipelineDto, UpdatePipelineDto } from 'src/types/pipeline.dto';
import { LogProvider } from '../log/log.provider';
export interface CodeResult {
    logs: string[];
    output: any;
    status: 'success' | 'error';
}
export declare class PipelineProvider {
    private pipelineModel;
    private readonly logProvider;
    logger: Logger;
    idLock: boolean;
    runnerPath: string;
    constructor(pipelineModel: Model<PipelineDocument>, logProvider: LogProvider);
    checkEvent(eventName: string): boolean;
    checkAllDeps(): Promise<void>;
    saveAllScripts(): Promise<void>;
    init(): Promise<void>;
    getNewId(): Promise<number>;
    createPipeline(pipeline: CreatePipelineDto): Promise<void>;
    updatePipelineById(id: number, updateDto: UpdatePipelineDto): Promise<void>;
    deletePipelineById(id: number): Promise<void>;
    getAll(): Promise<(import("mongoose").Document<unknown, {}, PipelineDocument> & Omit<import("src/scheme/pipeline.schema").Pipeline & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    getPipelineById(id: number): Promise<import("mongoose").Document<unknown, {}, PipelineDocument> & Omit<import("src/scheme/pipeline.schema").Pipeline & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getPipelinesByEvent(eventName: string): Promise<(import("mongoose").Document<unknown, {}, PipelineDocument> & Omit<import("src/scheme/pipeline.schema").Pipeline & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    triggerById(id: number, data: any): Promise<CodeResult>;
    dispatchEvent(eventName: VanblogSystemEvent, data?: any): Promise<CodeResult[]>;
    getPathById(id: number): string;
    runCodeByPipelineId(id: number, data: any): Promise<CodeResult>;
    addDeps(deps: string[]): Promise<void>;
    deleteScriptById(id: number): Promise<void>;
    saveOrUpdateScriptToRunnerPath(id: number, script: string): Promise<void>;
}
