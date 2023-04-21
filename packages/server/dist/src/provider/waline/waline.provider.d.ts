/// <reference types="node" />
import { Logger } from '@nestjs/common';
import { ChildProcess } from 'node:child_process';
import { WalineSetting } from 'src/types/setting.dto';
import { MetaProvider } from '../meta/meta.provider';
import { SettingProvider } from '../setting/setting.provider';
export declare class WalineProvider {
    private metaProvider;
    private readonly settingProvider;
    ctx: ChildProcess;
    logger: Logger;
    env: {};
    constructor(metaProvider: MetaProvider, settingProvider: SettingProvider);
    mapConfig2Env(config: WalineSetting): {};
    loadEnv(): Promise<void>;
    init(): Promise<void>;
    restart(reason: string): Promise<void>;
    stop(): Promise<void>;
    run(): Promise<any>;
}
