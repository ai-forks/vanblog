import { AccessGuard } from '../access/access.guard';
import { TokenGuard } from './token.guard';
export declare const AdminGuard: (import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard> | typeof AccessGuard | typeof TokenGuard)[];
