import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InitProvider } from '../init/init.provider';
export declare class InitMiddleware implements NestMiddleware {
    private readonly initProvider;
    constructor(initProvider: InitProvider);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
