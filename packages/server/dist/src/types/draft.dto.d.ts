import { SortOrder } from './sort';
export declare class CreateDraftDto {
    title: string;
    content?: string;
    tags?: string[];
    category: string;
    author?: string;
    draft?: string;
}
export declare class UpdateDraftDto {
    title?: string;
    content?: string;
    tags?: string[];
    category?: string;
    deleted?: boolean;
    author?: string;
    draft?: string;
}
export declare class PublishDraftDto {
    hidden?: boolean;
    pathname?: string;
    private?: boolean;
    password?: string;
    copyright?: string;
}
export declare class SearchDraftOption {
    page: number;
    pageSize: number;
    category?: string;
    tags?: string;
    title?: string;
    sortCreatedAt?: SortOrder;
    startTime?: string;
    endTime?: string;
    toListView?: boolean;
}
