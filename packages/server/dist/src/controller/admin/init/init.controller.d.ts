import { InitDto } from 'src/types/init.dto';
import { InitProvider } from 'src/provider/init/init.provider';
import { ISRProvider } from 'src/provider/isr/isr.provider';
import { StaticProvider } from 'src/provider/static/static.provider';
export declare class InitController {
    private readonly initProvider;
    private readonly staticProvider;
    private readonly isrProvider;
    constructor(initProvider: InitProvider, staticProvider: StaticProvider, isrProvider: ISRProvider);
    initSystem(initDto: InitDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    uploadImg(file: any, favicon: string): Promise<{
        statusCode: number;
        data: {
            src: any;
            isNew: boolean;
        };
    }>;
}
