import { parseMarkdownSections } from './markdownUtils';

/**
 * Parses the Terms of Use Markdown content.
 * Extracts the "Last Updated" date, Introduction, and Sections.
 *
 * @param {string} markdown - The raw Markdown string.
 * @returns {{
 * lastUpdated: string,
 * intro: {title: string, content: string}|null,
 * sections: Array<{id: string, title: string, content: string}>
 * }}
 */
export const parseTermsOfUse = (markdown) => {
    if (!markdown) return { lastUpdated: '', intro: null, sections: [] };

    let lines = markdown.split('\n');
    let lastUpdated = '';

    const dateRegex = /(?:Last Updated|Effective Date):\s*(.+)/i;

    for (let i = 0; i < 15 && i < lines.length; i++) {
        const match = lines[i].match(dateRegex);
        if (match) {
            lastUpdated = match[1].replace(/[*_]/g, '').trim();
            break;
        }
    }

    lines = lines.filter(line => !line.match(dateRegex));
    const cleanMarkdown = lines.join('\n');

    const rawSections = cleanMarkdown.split(/^## /m);
    let intro = null;

    const introRaw = rawSections[0];
    const cleanIntroContent = introRaw.replace(/^# .+$/m, '').trim();

    if (cleanIntroContent) {
        intro = {
            id: 'introduction',
            title: 'Introduction',
            content: cleanIntroContent
        };
    }

    const sections = parseMarkdownSections(rawSections.slice(1));

    return { lastUpdated, intro, sections };
};