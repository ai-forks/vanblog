import { ISRProvider } from 'src/provider/isr/isr.provider';
import { TagProvider } from 'src/provider/tag/tag.provider';
export declare class TagController {
    private readonly tagProvider;
    private readonly isrProvider;
    constructor(tagProvider: TagProvider, isrProvider: ISRProvider);
    getAllTags(): Promise<{
        statusCode: number;
        data: string[];
    }>;
    getArticlesByTagName(name: string): Promise<{
        statusCode: number;
        data: any;
    }>;
    updateTagByName(name: string, newName: string): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        data: {
            message: string;
            total: number;
        };
        message?: undefined;
    }>;
    deleteTagByName(name: string): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        data: {
            message: string;
            total: any;
        };
        message?: undefined;
    }>;
}
