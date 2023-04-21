import { ArticleProvider } from '../article/article.provider';
import { ViewerProvider } from '../viewer/viewer.provider';
import { MetaProvider } from '../meta/meta.provider';
import { ArticleTabData, ViewerTabData } from 'src/types/analysis';
import { VisitProvider } from '../visit/visit.provider';
import { TagProvider } from '../tag/tag.provider';
import { CategoryProvider } from '../category/category.provider';
export type WelcomeTab = 'overview' | 'viewer' | 'article';
export declare class AnalysisProvider {
    private readonly metaProvider;
    private readonly articleProvider;
    private readonly viewProvider;
    private readonly visitProvider;
    private readonly tagProvider;
    private readonly categoryProvider;
    constructor(metaProvider: MetaProvider, articleProvider: ArticleProvider, viewProvider: ViewerProvider, visitProvider: VisitProvider, tagProvider: TagProvider, categoryProvider: CategoryProvider);
    getOverViewTabData(num: number): Promise<{
        total: {
            wordCount: number;
            articleNum: number;
        };
        viewer: {
            grid: {
                total: any[];
                each: any[];
            };
            add: {
                viewer: number;
                visited: number;
            };
            now: {
                viewer: number;
                visited: number;
            };
        };
        link: {
            baseUrl: string;
            enableComment: "true" | "false";
        };
    }>;
    getViewerTabData(num: number): Promise<ViewerTabData>;
    getArticleTabData(num: number): Promise<ArticleTabData>;
    getWelcomePageData(tab: WelcomeTab, overviewDataNum: number, viewerDataNum: number, articleTabDataNum: number): Promise<ViewerTabData | ArticleTabData | {
        total: {
            wordCount: number;
            articleNum: number;
        };
        viewer: {
            grid: {
                total: any[];
                each: any[];
            };
            add: {
                viewer: number;
                visited: number;
            };
            now: {
                viewer: number;
                visited: number;
            };
        };
        link: {
            baseUrl: string;
            enableComment: "true" | "false";
        };
    }>;
}
