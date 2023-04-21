import { ISRProvider } from 'src/provider/isr/isr.provider';
export declare class ISRTask {
    private readonly isrProvider;
    constructor(isrProvider: ISRProvider);
    handleCron(): Promise<void>;
}
