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
import { Model } from 'mongoose';
import { createVisitDto } from 'src/types/visit.dto';
import { Visit } from 'src/scheme/visit.schema';
import { VisitDocument } from 'src/scheme/visit.schema';
export declare class VisitProvider {
    private visitModel;
    constructor(visitModel: Model<VisitDocument>);
    add(createViewerDto: createVisitDto): Promise<any>;
    rewriteToday(pathname: string, viewer: number, visited: number): Promise<void>;
    getLastData(pathname: string): Promise<import("mongoose").Document<unknown, {}, VisitDocument> & Omit<Visit & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getAll(): Promise<Visit[]>;
    findByDateAndPath(date: string, pathname: string): Promise<Visit>;
    getByArticleId(id: number | string): Promise<import("mongoose").Document<unknown, {}, VisitDocument> & Omit<Visit & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getLastVisitItem(): Promise<import("mongoose").Document<unknown, {}, VisitDocument> & Omit<Visit & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    import(data: Visit[]): Promise<void>;
}
