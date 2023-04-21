export declare class CacheProvider {
    data: Record<string, any>;
    get(key: string): any;
    set(key: string, value: any): void;
}
