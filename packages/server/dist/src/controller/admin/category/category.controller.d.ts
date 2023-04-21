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
import { CreateCategoryDto, UpdateCategoryDto } from 'src/types/category.dto';
import { CategoryProvider } from 'src/provider/category/category.provider';
import { ISRProvider } from 'src/provider/isr/isr.provider';
export declare class CategoryController {
    private readonly categoryProvider;
    private readonly isrProvider;
    constructor(categoryProvider: CategoryProvider, isrProvider: ISRProvider);
    getAllTags(withDetail?: string): Promise<{
        statusCode: number;
        data: string[] | (import("mongoose").Document<unknown, {}, import("../../../scheme/category.schema").CategoryDocument> & Omit<import("../../../scheme/category.schema").Category & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
    getArticlesByName(name: string): Promise<{
        statusCode: number;
        data: any;
    }>;
    createCategory(body: CreateCategoryDto): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        data: void;
        message?: undefined;
    }>;
    deleteCategory(name: string): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        data: void;
        message?: undefined;
    }>;
    updateCategoryByName(name: string, updateDto: UpdateCategoryDto): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        data: void;
        message?: undefined;
    }>;
}
