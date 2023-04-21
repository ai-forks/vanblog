import { Strategy } from 'passport-jwt';
import { MetaProvider } from '../meta/meta.provider';
import { UserProvider } from '../user/user.provider';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userProvider;
    private readonly metaProvider;
    constructor(userProvider: UserProvider, metaProvider: MetaProvider);
    validate(payload: any): Promise<any>;
}
export {};
