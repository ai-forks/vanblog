/// <reference types="passport" />
import { Request } from 'express';
import { MetaProvider } from 'src/provider/meta/meta.provider';
export declare class MetaController {
    private readonly metaProvider;
    constructor(metaProvider: MetaProvider);
    getAllMeta(req: Request): Promise<{
        statusCode: number;
        data: {
            version: string;
            latestVersion: any;
            updatedAt: any;
            user: Express.User;
            baseUrl: string;
            enableComment: "true" | "false";
            allowDomains: string;
        };
    }>;
}
