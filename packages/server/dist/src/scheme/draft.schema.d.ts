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
export type DraftDocument = Draft & Document;
export declare class Draft extends Document {
    id: number;
    title: string;
    content: string;
    tags: string[];
    author: string;
    category: string;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const DraftSchema: import("mongoose").Schema<Draft, import("mongoose").Model<Draft, any, any, any, Document<unknown, any, Draft> & Omit<Draft & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Draft, Document<unknown, {}, import("mongoose").FlatRecord<Draft>> & Omit<import("mongoose").FlatRecord<Draft> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
