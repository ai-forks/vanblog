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
export type ArticleDocument = Article & Document;
export declare class Article extends Document {
    id: number;
    title: string;
    content: string;
    tags: string[];
    top: number;
    category: string;
    hidden: boolean;
    author: string;
    pathname: string;
    private: boolean;
    password: string;
    deleted: boolean;
    viewer: number;
    visited: number;
    copyright?: string;
    lastVisitedTime: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ArticleSchema: import("mongoose").Schema<Article, import("mongoose").Model<Article, any, any, any, Document<unknown, any, Article> & Omit<Article & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Article, Document<unknown, {}, import("mongoose").FlatRecord<Article>> & Omit<import("mongoose").FlatRecord<Article> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
