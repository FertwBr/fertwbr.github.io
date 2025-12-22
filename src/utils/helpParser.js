import {parseMarkdownSections} from './markdownUtils';

/**
 * Parses the Help & FAQ Markdown content.
 * Removes custom metadata tags (like {:...}) and structures the content.
 *
 * @param {string} markdown - The raw Markdown string.
 * @returns {{
 * sections: Array<{id: string, title: string, content: string}>
 * }}
 */
export const parseHelpFAQ = (markdown) => {
    if (!markdown) return {sections: []};

    const cleanMarkdown = markdown.replace(/\{:.*?\}/g, '');

    const sections = [];
    const rawSections = cleanMarkdown.split(/^## /m);

    const introContent = rawSections[0].replace(/^# .+$/m, '').trim();

    if (introContent) {
        sections.push({
            id: 'introduction',
            title: 'Introduction',
            content: introContent
        });
    }

    const bodySections = parseMarkdownSections(rawSections.slice(1));

    return {sections: [...sections, ...bodySections]};
};