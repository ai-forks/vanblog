"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRoutes = exports.permissionRoutes = exports.pathPermissionMap = exports.permissionPathMap = void 0;
exports.permissionPathMap = {
    'article:create': 'post-/api/admin/article',
    'article:delete': 'delete-/api/admin/article/:id',
    'article:update': 'put-/api/admin/article/:id',
    'draft:create': 'post-/api/admin/draft',
    'draft:publish': 'post-/api/admin/draft/publish',
    'draft:delete': 'delete-/api/admin/draft/:id',
    'draft:update': 'put-/api/admin/draft/:id',
    'img:delete': 'delete-/api/admin/img/:sign',
};
exports.pathPermissionMap = {
    'post-/api/admin/article': 'article:create',
    'delete-/api/admin/article/:id': 'article:delete',
    'put-/api/admin/article/:id': 'article:update',
    'post-/api/admin/draft/publish': 'draft:publish',
    'post-/api/admin/draft': 'draft:create',
    'delete-/api/admin/draft/:id': 'draft:delete',
    'put-/api/admin/draft/:id': 'draft:update',
    'delete-/api/admin/img/:sign': 'img:delete',
};
exports.permissionRoutes = Object.values(exports.permissionPathMap);
exports.publicRoutes = [
    'get-/api/admin/meta',
    'post-/api/admin/auth/login',
    'post-/api/admin/auth/logout',
    'get-/api/admin/article',
    'get-/api/admin/draft',
    'get-/api/admin/category/all',
    'get-/api/admin/tag/all',
    'get-/api/admin/article/:id',
    'get-/api/admin/draft/:id',
    'get-/api/admin/img/all',
    'get-/api/admin/img',
    'get-/api/admin/collaborator/list',
    'post-/api/admin/img/upload',
    'post-/api/admin/article/searchByLink',
];
