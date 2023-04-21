/// <reference types="node" />
import { Logger } from '@nestjs/common';
import { ChildProcess } from 'node:child_process';
import { MetaProvider } from '../meta/meta.provider';
import { SettingProvider } from '../setting/setting.provider';
export declare class WebsiteProvider {
    private metaProvider;
    private settingProvider;
    ctx: ChildProcess;
    logger: Logger;
    constructor(metaProvider: MetaProvider, settingProvider: SettingProvider);
    init(): Promise<void>;
    loadEnv(): Promise<{
        VAN_BLOG_REVALIDATE: string;
        VAN_BLOG_REVALIDATE_TIME: any;
    } | {
        VAN_BLOG_REVALIDATE: string;
        VAN_BLOG_REVALIDATE_TIME?: undefined;
    } | {
        VAN_BLOG_REVALIDATE: string;
        VAN_BLOG_REVALIDATE_TIME: any;
        VAN_BLOG_ALLOW_DOMAINS: string;
    } | {
        VAN_BLOG_REVALIDATE: string;
        VAN_BLOG_REVALIDATE_TIME?: undefined;
        VAN_BLOG_ALLOW_DOMAINS: string;
    }>;
    restart(reason: string): Promise<void>;
    restore(reason: string): Promise<void>;
    stop(noMessage?: boolean): Promise<void>;
    run(): Promise<any>;
}
