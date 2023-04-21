/// <reference types="node" />
import { Logger } from '@nestjs/common';
import { StaticType } from 'src/types/setting.dto';
import { PicGo } from 'picgo';
import { ImgMeta } from 'src/types/img';
import { Model } from 'mongoose';
import { SettingDocument } from 'src/scheme/setting.schema';
export declare class PicgoProvider {
    private settingModel;
    picgo: PicGo;
    logger: Logger;
    constructor(settingModel: Model<SettingDocument>);
    getSetting(): Promise<any>;
    initDriver(): Promise<void>;
    installPlugins(plugins: string[]): Promise<void>;
    saveFile(fileName: string, buffer: Buffer, type: StaticType): Promise<{
        meta: ImgMeta;
        realPath: any;
    }>;
    deleteFile(fileName: string, type: StaticType): Promise<void>;
}
