/// <reference types="node" />
import { StaticType } from 'src/types/setting.dto';
import { ImgMeta } from 'src/types/img';
export declare class LocalProvider {
    saveFile(fileName: string, buffer: Buffer, type: StaticType, toRootPath?: boolean): Promise<{
        meta: {
            size: string;
        };
        realPath: string;
    }>;
    getFolderFiles(p: string): Promise<any>;
    createFile(p: string, subPath: string): Promise<void>;
    createFolder(p: string, subPath: string): Promise<void>;
    getFileContent(p: string, subPath: string): Promise<string>;
    updateCustomPageFileContent(pathname: string, filePath: string, content: string): Promise<void>;
    saveImg(fileName: string, buffer: Buffer, type: StaticType, toRootPath?: boolean): Promise<{
        meta: ImgMeta;
        realPath: string;
    }>;
    deleteCustomPageFolder(name: string): Promise<void>;
    deleteFile(fileName: string, type: StaticType): Promise<void>;
    exportAllImg(): Promise<{
        success: boolean;
        path: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        path?: undefined;
    }>;
}
