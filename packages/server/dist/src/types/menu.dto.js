"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultMenu = void 0;
const openapi = require("@nestjs/swagger");
exports.defaultMenu = [
    {
        id: 0,
        name: '首页',
        value: '/',
        level: 0,
    },
    {
        id: 1,
        name: '标签',
        value: '/tag',
        level: 0,
    },
    {
        id: 2,
        name: '分类',
        value: '/category',
        level: 0,
    },
    {
        id: 3,
        name: '时间线',
        value: '/timeline',
        level: 0,
    },
    {
        id: 4,
        name: '友链',
        value: '/link',
        level: 0,
    },
    {
        id: 5,
        name: '关于',
        value: '/about',
        level: 0,
    },
];
//# sourceMappingURL=menu.dto.js.map