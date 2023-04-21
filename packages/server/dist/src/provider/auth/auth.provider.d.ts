import { TokenProvider } from '../token/token.provider';
import { UserProvider } from '../user/user.provider';
export declare class AuthProvider {
    private readonly usersService;
    private readonly tokenProvider;
    constructor(usersService: UserProvider, tokenProvider: TokenProvider);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        token: string;
        user: {
            name: any;
            id: any;
            type: any;
            nickname: any;
            permissions: any;
        };
    }>;
}
