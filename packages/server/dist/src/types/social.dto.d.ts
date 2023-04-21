export type SocialType = 'bilibili' | 'email' | 'github' | 'gitee' | 'wechat' | 'wechat-dark';
export declare class SocialItem {
    updatedAt: Date;
    value: string;
    type: SocialType;
}
export declare class SocialDto {
    value: string;
    type: SocialType;
}
