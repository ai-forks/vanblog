"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeQuerystring = exports.washUrl = void 0;
function washUrl(s) {
    let url = s;
    if (!s.includes('http')) {
        url = `https://${s}`;
    }
    try {
        const u = new URL(url);
        return u.toString();
    }
    catch (err) {
        return url;
    }
}
exports.washUrl = washUrl;
const encodeQuerystring = (s) => {
    return s.replace(/#/g, '%23').replace(/\//g, '%2F');
};
exports.encodeQuerystring = encodeQuerystring;
