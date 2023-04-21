import { Logger } from '@nestjs/common';
import { ArticleProvider } from '../article/article.provider';
import { MetaProvider } from '../meta/meta.provider';
import { SettingProvider } from '../setting/setting.provider';
import { MarkdownProvider } from '../markdown/markdown.provider';
export declare class RssProvider {
    private readonly articleProvider;
    private readonly metaProvider;
    private readonly settingProvider;
    private readonly markdownProvider;
    logger: Logger;
    timer: any;
    constructor(articleProvider: ArticleProvider, metaProvider: MetaProvider, settingProvider: SettingProvider, markdownProvider: MarkdownProvider);
    generateRssFeed(info?: string, delay?: number): Promise<void>;
    generateRssFeedFn(info?: string): Promise<void>;
}
