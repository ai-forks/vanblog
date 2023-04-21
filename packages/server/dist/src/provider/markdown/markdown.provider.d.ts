import { Logger } from '@nestjs/common';
import MarkdownIt from 'markdown-it';
export declare class MarkdownProvider {
    logger: Logger;
    md: MarkdownIt;
    constructor();
    renderMarkdown(content: string): string;
    getDescription(content: string): string;
}
