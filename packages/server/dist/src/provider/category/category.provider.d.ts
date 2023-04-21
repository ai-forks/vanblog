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
import { ArticleProvider } from '../article/article.provider';
import { CategoryDocument } from 'src/scheme/category.schema';
import { UpdateCategoryDto } from 'src/types/category.dto';
export declare class CategoryProvider {
    private categoryModal;
    private readonly articleProvider;
    idLock: boolean;
    constructor(categoryModal: Model<CategoryDocument>, articleProvider: ArticleProvider);
    getCategoriesWithArticle(includeHidden: boolean): Promise<{}>;
    getPieData(): Promise<any[]>;
    getAllCategories(all?: boolean): Promise<string[] | (import("mongoose").Document<unknown, {}, CategoryDocument> & Omit<import("src/scheme/category.schema").Category & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    getArticlesByCategory(name: string, includeHidden: boolean): Promise<any>;
    addOne(name: string): Promise<void>;
    getNewId(): Promise<number>;
    deleteOne(name: string): Promise<void>;
    updateCategoryByName(name: string, dto: UpdateCategoryDto): Promise<void>;
}
