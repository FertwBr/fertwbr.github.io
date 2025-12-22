/**
 * Parses a Roadmap Markdown file into a structured object.
 * Supports multiple formats (Pixel Pulse nested style vs Pixel Compass flat lists).
 *
 * @param {string} markdown - The raw Markdown content.
 * @returns {Object} Structured data { sections: [...] }
 */
export const parseRoadmap = (markdown) => {
    if (!markdown) return {sections: []};

    const cleanMarkdown = markdown.replace(/\{:.*?\}/g, '');

    const rawSections = cleanMarkdown.split(/^## /m);
    const sections = [];

    const introContent = rawSections[0].replace(/^# .+$/m, '').trim();
    if (introContent) {
        sections.push({type: 'intro', content: introContent});
    }

    rawSections.slice(1).forEach(sectionText => {
        const lines = sectionText.split('\n');
        const titleLine = lines[0].trim();

        let status = 'neutral';
        if (titleLine.includes('✅') || titleLine.includes('🚀') || titleLine.includes('Current') || titleLine.includes('Launched')) status = 'launched';
        if (titleLine.includes('🧭') || titleLine.includes('📅') || titleLine.includes('Future') || titleLine.includes('Priorities')) status = 'future';
        if (titleLine.includes('🛠️')) status = 'active';

        const cleanTitle = titleLine.replace(/[✅🧭🚀🛠️📅💎🎨⚙️🐛]/g, '').trim();

        const hasSubsections = sectionText.includes('\n### ');
        const groups = [];

        if (hasSubsections) {
            const rawGroups = sectionText.split(/^### /m);

            const sectionDesc = rawGroups[0].split('\n').slice(1).join('\n').trim();

            rawGroups.slice(1).forEach(groupText => {
                const groupLines = groupText.split('\n');
                const groupTitle = groupLines[0].replace(/\*\*/g, '').trim();
                const items = [];

                groupLines.slice(1).forEach(line => {
                    const itemMatch = line.match(/^[\*\-]\s*(.*)/);
                    if (itemMatch) {
                        const content = itemMatch[1];
                        const boldMatch = content.match(/^\*\*(.*?)\*\*:?\s*(.*)/);

                        if (boldMatch) {
                            items.push({
                                title: boldMatch[1].trim(),
                                desc: boldMatch[2].trim()
                            });
                        } else {
                            items.push({title: '', desc: content.replace(/\*\*/g, '')});
                        }
                    }
                });

                if (groupTitle && items.length > 0) {
                    groups.push({title: groupTitle, items});
                }
            });
        } else {
            const items = [];
            lines.slice(1).forEach(line => {
                const itemMatch = line.match(/^[\*\-]\s*(.*)/);
                if (itemMatch) {
                    const content = itemMatch[1];
                    const boldMatch = content.match(/^\*\*(.*?)\*\*:?\s*(.*)/);
                    if (boldMatch) {
                        items.push({title: boldMatch[1].trim(), desc: boldMatch[2].trim()});
                    } else {
                        items.push({title: '', desc: content});
                    }
                }
            });
            if (items.length > 0) {
                groups.push({title: "General", items});
            }
        }

        if (groups.length > 0) {
            sections.push({
                type: 'phase',
                id: cleanTitle.toLowerCase().replace(/\s+/g, '-'),
                title: cleanTitle,
                status,
                groups
            });
        }
    });

    return {sections};
};