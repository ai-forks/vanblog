"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = exports.loadConfig = void 0;
const yaml = __importStar(require("yaml"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const _ = __importStar(require("lodash"));
let rawConfigs = [];
if (process.env.VAN_BLOG_CONFIG_FILE) {
    rawConfigs = [path.resolve(process.env.VAN_BLOG_CONFIG_FILE)];
}
else {
    rawConfigs = [
        path.resolve('/etc/van-blog/config.yaml'),
        path.resolve('./config.yaml'),
    ];
}
rawConfigs = rawConfigs
    .filter(Boolean)
    .filter(fs.existsSync)
    .map((file) => fs.readFileSync(file, 'utf-8'))
    .map((content) => yaml.parse(content));
if (rawConfigs.length === 0) {
    console.log('未检测到 Vanblog 配置文件, 即将从环境变量中读取, 或采用默认配置');
    rawConfigs.push([]);
}
const config = [...rawConfigs].reduce((prev, curr) => {
    return _.merge(prev, curr);
});
const loadConfig = (key, defaultValue) => {
    const envKey = 'VAN_BLOG_' +
        key
            .split('.')
            .map((x) => x.toUpperCase())
            .join('_');
    if (typeof defaultValue !== 'function') {
        return process.env[envKey] || _.get(config, key, defaultValue);
    }
    else {
        return process.env[envKey] || _.get(config, key, false) || defaultValue();
    }
};
exports.loadConfig = loadConfig;
exports.version = process.env['VAN_BLOG_VERSION'] || 'dev';
