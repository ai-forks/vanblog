"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var MarkdownProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownProvider = void 0;
const common_1 = require("@nestjs/common");
const markdown_it_1 = __importDefault(require("markdown-it"));
const highlight_js_1 = __importDefault(require("highlight.js"));
const markdown_it_task_lists_1 = __importDefault(require("markdown-it-task-lists"));
const markdown_it_katex_1 = __importDefault(require("markdown-it-katex"));
let MarkdownProvider = MarkdownProvider_1 = class MarkdownProvider {
    constructor() {
        this.logger = new common_1.Logger(MarkdownProvider_1.name);
        this.md = null;
        this.md = new markdown_it_1.default({
            html: true,
            breaks: true,
            linkify: false,
            highlight: (str, lang) => {
                if (lang == 'mermaid') {
                    return `<div class="mermaid">${str}</div>`;
                }
                if (lang && highlight_js_1.default.getLanguage(lang)) {
                    try {
                        return ('<pre class="hljs" style="background: #f3f3f3; padding: 8px;><code>' +
                            highlight_js_1.default.highlight(str, { language: lang, ignoreIllegals: true })
                                .value +
                            '</code></pre>');
                    }
                    catch (e) {
                        console.log(e);
                    }
                    return ('<pre class="hljs" style="background: #f3f3f3;padding: 8px;"><code>' +
                        this.md.utils.escapeHtml(str) +
                        '</code></pre>');
                }
            },
        })
            .use(markdown_it_task_lists_1.default)
            .use(markdown_it_katex_1.default);
    }
    renderMarkdown(content) {
        return this.md.render(content);
    }
    getDescription(content) {
        return content.split('<!-- more -->')[0];
    }
};
MarkdownProvider = MarkdownProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MarkdownProvider);
exports.MarkdownProvider = MarkdownProvider;
