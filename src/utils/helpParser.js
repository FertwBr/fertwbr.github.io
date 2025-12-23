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
 * Parses Help/FAQ Markdown content.
 * Splits by H2 for sections and processes internal H3/H4 tags to apply IDs.
 *
 * @param {string} markdown - The raw Markdown content.
 * @returns {Object} Object containing an array of sections.
 */
export function parseHelpFAQ(markdown) {
    if (!markdown) return {sections: []};

    const rawSections = markdown.split(/^##\s+/gm);

    if (rawSections[0].trim() === '') {
        rawSections.shift();
    }

    const sections = rawSections.map(sectionRaw => {
        const firstLineEnd = sectionRaw.indexOf('\n');
        let titleLine = firstLineEnd === -1 ? sectionRaw : sectionRaw.substring(0, firstLineEnd);
        let rawContent = firstLineEnd === -1 ? '' : sectionRaw.substring(firstLineEnd + 1);

        let sectionId = '';
        let sectionTitle = titleLine.trim();
        const sectionAttrMatch = sectionTitle.match(/\{:\s*data-toc-key="([^"]+)"\s*\}/);

        if (sectionAttrMatch) {
            sectionId = sectionAttrMatch[1];
            sectionTitle = sectionTitle.replace(sectionAttrMatch[0], '').trim();
        } else {
            sectionId = slugify(sectionTitle);
        }

        const processedContent = rawContent.replace(/^(#{3,6})\s+(.*?)\s+\{:\s*data-toc-key="([^"]+)"\s*\}/gm,
            (match, hashes, title, id) => {
                const level = hashes.length; // 3 for ###, 4 for ####
                return `<h${level} id="${id}">${title.trim()}</h${level}>`;
            }
        );

        return {
            id: sectionId,
            title: sectionTitle,
            content: processedContent.trim()
        };
    });

    return {sections};
}