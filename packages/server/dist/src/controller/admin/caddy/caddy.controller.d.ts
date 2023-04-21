import { SettingProvider } from 'src/provider/setting/setting.provider';
import { HttpsSetting } from 'src/types/setting.dto';
import { CaddyProvider } from 'src/provider/caddy/caddy.provider';
export declare class CaddyController {
    private readonly settingProvider;
    private readonly caddyProvider;
    private readonly logger;
    constructor(settingProvider: SettingProvider, caddyProvider: CaddyProvider);
    getHttpsConfig(): Promise<{
        statusCode: number;
        data: HttpsSetting;
    }>;
    askOnDemand(domain: string): Promise<string>;
    clearLog(): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        data: string;
        message?: undefined;
    }>;
    getCaddyLog(): Promise<{
        statusCode: number;
        data: string;
    }>;
    getCaddyConfig(): Promise<{
        statusCode: number;
        data: string;
    }>;
    updateHttpsConfig(dto: HttpsSetting): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        data: string;
        message?: undefined;
    }>;
}
