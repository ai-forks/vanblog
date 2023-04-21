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
import { StaticType, StorageType } from 'src/types/setting.dto';
export type StaticDocument = Static & Document;
export declare class Static extends Document {
    staticType: StaticType;
    storageType: StorageType;
    fileType: string;
    realPath: string;
    meta: any;
    name: string;
    sign: string;
    updatedAt: Date;
}
export declare const StaticSchema: import("mongoose").Schema<Static, import("mongoose").Model<Static, any, any, any, Document<unknown, any, Static> & Omit<Static & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Static, Document<unknown, {}, import("mongoose").FlatRecord<Static>> & Omit<import("mongoose").FlatRecord<Static> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
