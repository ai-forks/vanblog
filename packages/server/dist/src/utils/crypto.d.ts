/// <reference types="node" />
export declare function makeSalt(): string;
export declare function encryptPassword(username: string, password: string, salt: string): string;
export declare function washPassword(username: string, password: string, salt: string): string;
export declare function encryptFileMD5(buffer: Buffer): string;
