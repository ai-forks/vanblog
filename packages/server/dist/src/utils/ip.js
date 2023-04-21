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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIpv4 = exports.getDefaultSubjects = exports.getPublicIp = exports.getLocalIps = void 0;
const os = __importStar(require("os"));
const axios_1 = __importDefault(require("axios"));
const getLocalIps = () => {
    const res = [];
    const interfaces = os.networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family === 'IPv4') {
                res.push(alias.address);
            }
        }
    }
    return res;
};
exports.getLocalIps = getLocalIps;
const getPublicIp = async () => {
    try {
        const res = await axios_1.default.get('http://ip.cip.cc');
        if (res.data && res.data.trim() != '') {
            return res.data.replace('\n', '');
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.log('获取公网 IP 超时');
        return null;
    }
};
exports.getPublicIp = getPublicIp;
const getDefaultSubjects = async () => {
    const localIps = await (0, exports.getLocalIps)();
    const publicIP = await (0, exports.getPublicIp)();
    const result = localIps;
    if (!localIps.includes(publicIP) && Boolean(publicIP)) {
        result.push(publicIP);
    }
    if (!result.includes('127.0.0.1')) {
        result.push('127.0.0.1');
    }
    result.push('localhost');
    return result;
};
exports.getDefaultSubjects = getDefaultSubjects;
const isIpv4 = (ip) => {
    const v4 = '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}';
    const reg = new RegExp(`^${v4}$`);
    return reg.test(ip);
};
exports.isIpv4 = isIpv4;
