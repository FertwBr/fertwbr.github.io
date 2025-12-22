/**
 * Parses the raw Markdown content for the Project Overview page.
 * Separates the content into logical sections: Introduction, Tech Stack (parsed from tables), and standard text sections.
 *
 * @param {string} markdown - The raw Markdown string to parse.
 * @returns {{ sections: Array<{
 * id: string,
 * title: string,
 * type: 'intro' | 'tech-stack' | 'text-section',
 * content?: string,
 * intro?: string,
 * items?: Array<{category: string, stack: string}>
 * }> }} The structured data object containing parsed sections.
 */
export const parseOverview = (markdown) => {
    if (!markdown) return {sections: []};

    const cleanMarkdown = markdown.replace(/\{:.*?\}/g, '');

    const rawSections = cleanMarkdown.split(/^## /m);
    const sections = [];

    const introContent = rawSections[0].replace(/^# .+$/m, '').trim();
    if (introContent) {
        sections.push({
            id: 'overview',
            title: 'Introduction',
            content: introContent,
            type: 'intro'
        });
    }

    rawSections.slice(1).forEach(rawSection => {
        const lines = rawSection.split('\n');
        const titleLine = lines[0].trim();

        const cleanTitle = titleLine.replace(/🛠️|📐|🌐|🔮|🚀|🤖|💡|⚖️/g, '').trim();
        const id = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        if (id.includes('tech-stack') || id.includes('architecture')) {
            const techItems = [];
            let isTable = false;
            let tableStartIndex = -1;

            lines.slice(1).forEach((line, index) => {
                const trimmed = line.trim();
                if (trimmed.startsWith('|') && trimmed.includes('---')) {
                    isTable = true;
                    tableStartIndex = index;
                    return;
                }

                if (trimmed.startsWith('|')) {
                    const parts = line.split('|').filter(p => p.trim() !== '');
                    if (parts.length >= 2) {
                        const category = parts[0].trim().replace(/\*\*/g, ''); // Remove bold markdown
                        const stack = parts[1].trim();

                        if (!['category', 'technologies & approach', 'stack'].includes(category.toLowerCase())) {
                            techItems.push({category, stack});
                        }
                    }
                }
            });

            const introLines = [];
            if (tableStartIndex !== -1) {
                for (let i = 1; i <= tableStartIndex; i++) {
                    if (!lines[i].trim().startsWith('|')) {
                        introLines.push(lines[i]);
                    }
                }
            }

            const introText = introLines.join('\n').trim();

            if (techItems.length > 0) {
                sections.push({
                    id,
                    title: cleanTitle,
                    type: 'tech-stack',
                    intro: introText,
                    items: techItems
                });
            } else {
                const content = lines.slice(1).join('\n').trim();
                sections.push({
                    id,
                    title: cleanTitle,
                    content,
                    type: 'text-section'
                });
            }

        } else {
            let content = lines.slice(1).join('\n').trim();

            content = content.replace(/<div id="roadmap-summary-container">[\s\S]*?<\/div>/g, '');
            content = content.replace(/<a href="#"[\s\S]*?<\/a>/g, '');

            if (cleanTitle && content) {
                sections.push({
                    id,
                    title: cleanTitle,
                    content,
                    type: 'text-section'
                });
            }
        }
    });

    return {sections};
};