import { Logger } from '@nestjs/common';
import { SettingProvider } from '../setting/setting.provider';
export declare class CaddyProvider {
    private readonly settingProvider;
    subjects: string[];
    logger: Logger;
    constructor(settingProvider: SettingProvider);
    init(): Promise<void>;
    clearLog(): void;
    addSubject(domain: string): Promise<void>;
    setRedirect(redirect: boolean): Promise<false | "关闭成功！" | "开启成功！">;
    getSubjects(): Promise<any>;
    getAutomaticDomains(): Promise<any>;
    updateSubjects(domains: string[]): Promise<boolean>;
    applyHttpsChange(domains: string[]): Promise<boolean>;
    updateHttpsDomains(domains: string[]): Promise<boolean>;
    getConfig(): Promise<any>;
    getLog(): Promise<string>;
}
