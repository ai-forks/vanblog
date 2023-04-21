import { Logger } from '@nestjs/common';
import { ArticleProvider } from '../article/article.provider';
import { CustomPageProvider } from '../customPage/customPage.provider';
import { CategoryProvider } from '../category/category.provider';
import { TagProvider } from '../tag/tag.provider';
import { MetaProvider } from '../meta/meta.provider';
export declare class SiteMapProvider {
    private readonly articleProvider;
    private readonly categoryProvider;
    private readonly tagProvider;
    private readonly customPageProvider;
    private readonly metaProvider;
    logger: Logger;
    timer: any;
    constructor(articleProvider: ArticleProvider, categoryProvider: CategoryProvider, tagProvider: TagProvider, customPageProvider: CustomPageProvider, metaProvider: MetaProvider);
    generateSiteMap(info?: string, delay?: number): Promise<void>;
    generateSiteMapFn(info?: string): Promise<void>;
    getArticleUrls(): Promise<string[]>;
    getCategoryUrls(): Promise<string[]>;
    getPageUrls(): Promise<any[]>;
    getCustomUrls(): Promise<string[]>;
    getTagUrls(): Promise<string[]>;
    getSiteUrls(): Promise<string[]>;
}
