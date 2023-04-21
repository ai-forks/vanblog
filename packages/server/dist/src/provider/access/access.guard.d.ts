import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
export declare class AccessGuard implements CanActivate {
    logger: Logger;
    canActivate(context: ExecutionContext): Promise<any>;
    validateRequest(request: any): Promise<any>;
}
