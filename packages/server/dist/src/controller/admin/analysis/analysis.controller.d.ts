import { AnalysisProvider, WelcomeTab } from 'src/provider/analysis/analysis.provider';
export declare class AnalysisController {
    private readonly analysisProvider;
    constructor(analysisProvider: AnalysisProvider);
    getWelcomePageData(tab: WelcomeTab, viewerDataNum?: number, overviewDataNum?: number, articleTabDataNum?: number): Promise<{
        statusCode: number;
        data: import("../../../types/analysis").ViewerTabData | import("../../../types/analysis").ArticleTabData | {
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
        };
    }>;
}
