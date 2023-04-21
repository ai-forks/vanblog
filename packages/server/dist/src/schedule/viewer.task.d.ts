import { MetaProvider } from 'src/provider/meta/meta.provider';
import { ViewerProvider } from 'src/provider/viewer/viewer.provider';
export declare class ViewerTask {
    private readonly metaProvider;
    private readonly viewerProvider;
    private readonly logger;
    constructor(metaProvider: MetaProvider, viewerProvider: ViewerProvider);
    handleCron(): Promise<void>;
}
