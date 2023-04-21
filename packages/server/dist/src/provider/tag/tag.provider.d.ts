import { ArticleProvider } from '../article/article.provider';
export declare class TagProvider {
    private readonly articleProvider;
    constructor(articleProvider: ArticleProvider);
    getTagsWithArticle(includeHidden: boolean): Promise<{}>;
    getAllTags(includeHidden: boolean): Promise<string[]>;
    getColumnData(topNum: number, includeHidden: boolean): Promise<any[]>;
    getArticlesByTag(tagName: string, includeHidden: boolean): Promise<any>;
    updateTagByName(oldName: string, newName: string): Promise<{
        message: string;
        total: number;
    }>;
    deleteOne(name: string): Promise<{
        message: string;
        total: any;
    }>;
}
