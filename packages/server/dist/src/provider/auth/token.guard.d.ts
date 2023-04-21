import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { TokenProvider } from '../token/token.provider';
export declare class TokenGuard implements CanActivate {
    private readonly tokenProvider;
    logger: Logger;
    constructor(tokenProvider: TokenProvider);
    canActivate(context: ExecutionContext): Promise<boolean>;
    validateRequest(request: Request): Promise<boolean>;
}
