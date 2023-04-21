import { MetaProvider } from 'src/provider/meta/meta.provider';
export declare class CountTask {
    private readonly metaProvider;
    private readonly logger;
    constructor(metaProvider: MetaProvider);
    handleCron(): Promise<void>;
}
