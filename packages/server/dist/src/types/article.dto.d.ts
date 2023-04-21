import { SortOrder } from './sort';
export declare class CreateArticleDto {
    title: string;
    content?: string;
    tags?: string[];
    top?: number;
    category: string;
    hidden?: boolean;
    private?: boolean;
    password?: string;
    updatedAt?: Date;
    createdAt?: Date;
    author?: string;
    copyright?: string;
    pathname?: string;
}
export declare class UpdateArticleDto {
    title?: string;
    content?: string;
    tags?: string[];
    category?: string;
    hidden?: boolean;
    top?: number;
    private?: boolean;
    password?: string;
    deleted?: boolean;
    viewer?: number;
    visited?: number;
    updatedAt?: Date;
    author?: string;
    copyright?: string;
    pathname?: string;
}
export declare class SearchArticleOption {
    page: number;
    pageSize: number;
    regMatch: boolean;
    category?: string;
    tags?: string;
    title?: string;
    sortCreatedAt?: SortOrder;
    sortTop?: SortOrder;
    startTime?: string;
    endTime?: string;
    sortViewer?: string;
    toListView?: boolean;
    withWordCount?: boolean;
    author?: string;
}
