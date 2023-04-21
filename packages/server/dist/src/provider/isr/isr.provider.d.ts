import { Logger } from '@nestjs/common';
import { Article } from 'src/scheme/article.schema';
import { ArticleProvider } from '../article/article.provider';
import { RssProvider } from '../rss/rss.provider';
import { SettingProvider } from '../setting/setting.provider';
import { SiteMapProvider } from '../sitemap/sitemap.provider';
export interface ActiveConfig {
    postId?: number;
    forceActice?: boolean;
}
export declare class ISRProvider {
    private readonly articleProvider;
    private readonly rssProvider;
    private readonly sitemapProvider;
    private readonly settingProvider;
    urlList: string[];
    base: string;
    logger: Logger;
    timer: any;
    constructor(articleProvider: ArticleProvider, rssProvider: RssProvider, sitemapProvider: SiteMapProvider, settingProvider: SettingProvider);
    activeAllFn(info?: string, activeConfig?: ActiveConfig): Promise<void>;
    activeAll(info?: string, delay?: number, activeConfig?: ActiveConfig): Promise<void>;
    testConn(): Promise<boolean>;
    activeWithRetry(fn: any, info?: string): Promise<void>;
    activeUrls(urls: string[], log: boolean): Promise<void>;
    activePath(type: 'category' | 'tag' | 'page' | 'post', postId?: number): Promise<void>;
    activeArticleById(id: number, event: 'create' | 'delete' | 'update', beforeObj?: Article): Promise<void>;
    activeAbout(info: string): Promise<void>;
    activeLink(info: string): Promise<void>;
    activeUrl(url: string, log: boolean): Promise<void>;
    getArticleUrls(): Promise<string[]>;
}
