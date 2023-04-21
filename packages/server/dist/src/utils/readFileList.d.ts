interface IFile {
    title: string;
    key: string;
    type: 'directory' | 'file';
    parent: string;
    mtime: number;
    children?: IFile[];
}
export declare function dirSort(a: IFile, b: IFile): 1 | -1;
export declare function readDirs(dir: string, baseDir?: string, blacklist?: string[]): any;
export declare function readDir(dir: string, baseDir?: string, blacklist?: string[]): any;
export {};
