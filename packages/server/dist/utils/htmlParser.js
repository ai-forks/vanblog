"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHtmlToHeadTagArr = void 0;
const cheerio_1 = require("cheerio");
const parseHtmlToHeadTagArr = (html) => {
    var _a;
    const h = (0, cheerio_1.load)(`<div>${html}</div>`);
    const tags = h('div').first().children();
    const result = [];
    for (const t of tags) {
        //@ts-ignore
        let content = ((_a = t === null || t === void 0 ? void 0 : t.next) === null || _a === void 0 ? void 0 : _a.data) || undefined;
        if (content) {
            content = content.trim();
            content = content.replace(/\n/g, '');
            if (content == '')
                content = undefined;
        }
        const item = {
            name: t.name,
            props: t.attribs,
            content: content,
        };
        result.push(item);
    }
    return result;
};
exports.parseHtmlToHeadTagArr = parseHtmlToHeadTagArr;
