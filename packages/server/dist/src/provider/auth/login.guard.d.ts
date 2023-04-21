import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Request } from 'express';
import { CacheProvider } from '../cache/cache.provider';
import { SettingProvider } from '../setting/setting.provider';
export declare class LoginGuard implements CanActivate {
    private cacheProvider;
    private settingProvider;
    logger: Logger;
    constructor(cacheProvider: CacheProvider, settingProvider: SettingProvider);
    canActivate(context: ExecutionContext): Promise<boolean>;
    validateRequest(request: Request): Promise<boolean>;
}
