"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseImgLinksOfMarkdown = void 0;
const parseImgLinksOfMarkdown = (content) => {
    const regexp = /!\[(.*?)\]\((.*?)\)/gm;
    const res = [];
    let matcher;
    while ((matcher = regexp.exec(content)) !== null) {
        for (const e of matcher) {
            if (!e.includes('![') && e.includes('http')) {
                if (!res.includes(e)) {
                    res.push(e);
                }
            }
        }
    }
    return res;
};
exports.parseImgLinksOfMarkdown = parseImgLinksOfMarkdown;
