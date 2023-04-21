import { ISRProvider } from 'src/provider/isr/isr.provider';
import { SettingProvider } from 'src/provider/setting/setting.provider';
import { MenuSetting } from 'src/types/setting.dto';
export declare class MenuMetaController {
    private readonly settingProvider;
    private readonly isrProvider;
    constructor(settingProvider: SettingProvider, isrProvider: ISRProvider);
    get(): Promise<{
        statusCode: number;
        data: any;
    }>;
    update(dto: MenuSetting): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        data: void;
        message?: undefined;
    }>;
}
