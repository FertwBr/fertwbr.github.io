/**
 * Processes raw Markdown sections into structured objects.
 * Assumes the first line of each section is the title and the rest is content.
 * Generates an ID based on the title (slugify).
 *
 * @param {string[]} rawSections - Array of raw Markdown strings to process.
 * @returns {Array<{id: string, title: string, content: string}>}
 */
export const parseMarkdownSections = (rawSections) => {
    const sections = [];

    rawSections.forEach((rawSection) => {
        const sectionLines = rawSection.split('\n');
        const title = sectionLines[0].trim();
        const content = sectionLines.slice(1).join('\n').trim();

        if (title && content) {
            sections.push({
                id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                title,
                content
            });
        }
    });

    return sections;
};