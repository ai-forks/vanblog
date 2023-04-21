"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersionFromServer = void 0;
const axios_1 = __importDefault(require("axios"));
const getVersionFromServer = async () => {
    try {
        let { data } = await axios_1.default.get('https://api.mereith.com/vanblog/version');
        data = (data === null || data === void 0 ? void 0 : data.data) || {};
        if (!(data === null || data === void 0 ? void 0 : data.version)) {
            return null;
        }
        return {
            version: data.version,
            updatedAt: (data === null || data === void 0 ? void 0 : data.updatedAt) || (data === null || data === void 0 ? void 0 : data.upadtedAt),
        };
    }
    catch (err) {
        return null;
    }
};
exports.getVersionFromServer = getVersionFromServer;
