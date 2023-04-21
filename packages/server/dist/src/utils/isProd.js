"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProd = void 0;
const isProd = () => {
    var _a;
    return ((_a = process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) == 'production';
};
exports.isProd = isProd;
