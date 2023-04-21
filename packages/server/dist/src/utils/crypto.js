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
exports.encryptFileMD5 = exports.washPassword = exports.encryptPassword = exports.makeSalt = void 0;
const crypto = __importStar(require("crypto"));
const js_sha256_1 = require("js-sha256");
function makeSalt() {
    return crypto.randomBytes(32).toString('base64');
}
exports.makeSalt = makeSalt;
function encryptPassword(username, password, salt) {
    if (!username || !password || !salt) {
        return '';
    }
    return (0, js_sha256_1.sha256)((0, js_sha256_1.sha256)(username + (0, js_sha256_1.sha256)(password + salt)) + salt + (0, js_sha256_1.sha256)(username + salt));
}
exports.encryptPassword = encryptPassword;
function washPassword(username, password, salt) {
    username = username.toLowerCase();
    const browserPassword = (0, js_sha256_1.sha256)(username + (0, js_sha256_1.sha256)((0, js_sha256_1.sha256)((0, js_sha256_1.sha256)((0, js_sha256_1.sha256)(password))) + (0, js_sha256_1.sha256)(username)));
    return encryptPassword(username, browserPassword, salt);
}
exports.washPassword = washPassword;
function encryptFileMD5(buffer) {
    const md5 = crypto.createHash('md5');
    return md5.update(buffer).digest('hex');
}
exports.encryptFileMD5 = encryptFileMD5;
