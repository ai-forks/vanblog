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
import { Document } from 'mongoose';
import { VanblogEventType } from 'src/types/event';
export type PipelineDocument = Pipeline & Document;
export declare class Pipeline extends Document {
    id: number;
    name: string;
    eventType: VanblogEventType;
    description: string;
    enabled: boolean;
    deps: string[];
    createdAt: Date;
    updatedAt: Date;
    eventName: string;
    script: string;
    deleted: boolean;
}
export declare const PipelineSchema: import("mongoose").Schema<Pipeline, import("mongoose").Model<Pipeline, any, any, any, Document<unknown, any, Pipeline> & Omit<Pipeline & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Pipeline, Document<unknown, {}, import("mongoose").FlatRecord<Pipeline>> & Omit<import("mongoose").FlatRecord<Pipeline> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
