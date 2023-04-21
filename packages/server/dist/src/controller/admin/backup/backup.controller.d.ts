/// <reference types="multer" />
import { Response } from 'express';
import { ArticleProvider } from 'src/provider/article/article.provider';
import { CategoryProvider } from 'src/provider/category/category.provider';
import { DraftProvider } from 'src/provider/draft/draft.provider';
import { MetaProvider } from 'src/provider/meta/meta.provider';
import { TagProvider } from 'src/provider/tag/tag.provider';
import { UserProvider } from 'src/provider/user/user.provider';
import { ViewerProvider } from 'src/provider/viewer/viewer.provider';
import { VisitProvider } from 'src/provider/visit/visit.provider';
import { StaticProvider } from 'src/provider/static/static.provider';
import { SettingProvider } from 'src/provider/setting/setting.provider';
export declare class BackupController {
    private readonly articleProvider;
    private readonly categoryProvider;
    private readonly tagProvider;
    private readonly metaProvider;
    private readonly draftProvider;
    private readonly userProvider;
    private readonly viewerProvider;
    private readonly visitProvider;
    private readonly settingProvider;
    private readonly staticProvider;
    private readonly logger;
    constructor(articleProvider: ArticleProvider, categoryProvider: CategoryProvider, tagProvider: TagProvider, metaProvider: MetaProvider, draftProvider: DraftProvider, userProvider: UserProvider, viewerProvider: ViewerProvider, visitProvider: VisitProvider, settingProvider: SettingProvider, staticProvider: StaticProvider);
    getAll(res: Response): Promise<void>;
    importAll(file: Express.Multer.File): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        data: string;
        message?: undefined;
    }>;
}
