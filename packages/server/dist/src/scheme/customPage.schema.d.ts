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
import { CustomType } from 'src/types/custom';
export type CustomPageDocument = CustomPage & Document;
export declare class CustomPage extends Document {
    name: string;
    path: string;
    type: CustomType;
    html: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const CustomPageSchema: import("mongoose").Schema<CustomPage, import("mongoose").Model<CustomPage, any, any, any, Document<unknown, any, CustomPage> & Omit<CustomPage & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CustomPage, Document<unknown, {}, import("mongoose").FlatRecord<CustomPage>> & Omit<import("mongoose").FlatRecord<CustomPage> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
