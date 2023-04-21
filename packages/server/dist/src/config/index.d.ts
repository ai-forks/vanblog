export interface Config {
    mongoUrl: string;
    staticPath: string;
    codeRunnerPath: string;
    pluginRunnerPath: string;
    walineDB: string;
    demo: boolean | string;
    log: string;
}
export declare const loadMongoUrl: () => any;
export declare const config: Config;
