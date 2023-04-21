import { ISRProvider } from 'src/provider/isr/isr.provider';
import { SettingProvider } from 'src/provider/setting/setting.provider';
import { WebsiteProvider } from 'src/provider/website/website.provider';
import { ISRSetting } from 'src/types/setting.dto';
export declare class ISRController {
    private readonly isrProvider;
    private readonly settingProvider;
    private readonly websiteProvider;
    constructor(isrProvider: ISRProvider, settingProvider: SettingProvider, websiteProvider: WebsiteProvider);
    activeISR(): Promise<{
        statusCode: number;
        data: string;
    }>;
    updateISRSetting(dto: ISRSetting): Promise<{
        statusCode: number;
        data: string;
    }>;
    getISRSetting(): Promise<{
        statusCode: number;
        data: any;
    }>;
}
