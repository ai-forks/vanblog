import { AccessGuard } from '../access/access.guard';
import { TokenGuard } from './token.guard';
export declare const AdminGuard: (typeof AccessGuard | typeof TokenGuard | import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>)[];
