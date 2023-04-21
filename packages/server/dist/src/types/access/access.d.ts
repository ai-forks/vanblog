export type LimitPermission = 'article:create' | 'article:delete' | 'article:update' | 'draft:publish' | 'draft:create' | 'draft:delete' | 'draft:update' | 'img:delete';
export type Permission = LimitPermission | 'all';
export declare const permissionPathMap: Record<LimitPermission, string>;
export declare const pathPermissionMap: Record<string, LimitPermission>;
export declare const permissionRoutes: string[];
export declare const publicRoutes: string[];
