/**
 * Generates a URL-friendly slug from a string.
 * @param {string} text - The text to slugify.
 * @returns {string} The slug.
 */
const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
};

/**
 * Parses Help/FAQ Markdown content into sections.
 * Handles custom syntax: ## Title {: data-toc-key="custom-id" }
 *
 * @param {string} markdown - The raw Markdown content.
 * @returns {Object} Object containing an array of sections.
 */
export function parseHelpFAQ(markdown) {
    if (!markdown) return { sections: [] };

    const rawSections = markdown.split(/^##\s+/gm);

    if (rawSections[0].trim() === '') {
        rawSections.shift();
    }

    const sections = rawSections.map(sectionRaw => {
        const firstLineEnd = sectionRaw.indexOf('\n');
        let titleLine = firstLineEnd === -1 ? sectionRaw : sectionRaw.substring(0, firstLineEnd);
        let content = firstLineEnd === -1 ? '' : sectionRaw.substring(firstLineEnd + 1);

        let id = '';
        let title = titleLine.trim();

        const attrMatch = title.match(/\{:\s*data-toc-key="([^"]+)"\s*\}/);

        if (attrMatch) {
            id = attrMatch[1];
            title = title.replace(attrMatch[0], '').trim();
        } else {
            id = slugify(title);
        }

        return {
            id,
            title,
            content: content.trim()
        };
    });

    return { sections };
}