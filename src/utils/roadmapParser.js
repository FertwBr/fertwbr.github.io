/**
 * @param {string} markdown
 * @returns {Object}
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
        if (/✅|🚀|Current|Launched/i.test(titleLine)) status = 'launched';
        if (/🧭|📅|Future|Priorities/i.test(titleLine)) status = 'future';
        if (/🛠️/i.test(titleLine)) status = 'active';

        const cleanTitle = titleLine.replace(/[✅🧭🚀🛠️📅💎🎨⚙️🐛📜]/g, '').trim();
        const isVersionHistory = cleanTitle.toLowerCase().includes('version history');

        let tableData = null;

        if (isVersionHistory) {
            const tableLines = lines.filter(line => line.trim().startsWith('|'));
            if (tableLines.length > 2) {
                const headers = tableLines[0].split('|').map(s => s.trim()).filter(s => s);
                const rows = tableLines.slice(2).map(row =>
                    row.split('|').map(s => s.trim()).filter(s => s)
                );
                tableData = {headers, rows};
            }
        }

        const hasSubsections = sectionText.includes('\n### ');
        const groups = [];
        let sectionTextContent = [];

        if (hasSubsections) {
            const rawGroups = sectionText.split(/^### /m);
            sectionTextContent = rawGroups[0].split('\n').slice(1)
                .filter(l => l.trim() && !l.trim().startsWith('|') && !l.trim().startsWith('>'))
                .join('\n').trim();

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
                            items.push({title: boldMatch[1].trim(), desc: boldMatch[2].trim()});
                        } else {
                            items.push({title: '', desc: content.trim()});
                        }
                    }
                });

                if (groupTitle && items.length > 0) {
                    groups.push({title: groupTitle, items});
                }
            });
        } else {
            const items = [];
            const paragraphs = [];

            lines.slice(1).forEach(line => {
                const trimmed = line.trim();
                if (!trimmed || trimmed.startsWith('|') || trimmed.startsWith('>')) return;

                const itemMatch = line.match(/^[\*\-]\s*(.*)/);
                if (itemMatch) {
                    const content = itemMatch[1];
                    const boldMatch = content.match(/^\*\*(.*?)\*\*:?\s*(.*)/);
                    if (boldMatch) {
                        items.push({title: boldMatch[1].trim(), desc: boldMatch[2].trim()});
                    } else {
                        items.push({title: '', desc: content.trim()});
                    }
                } else {
                    paragraphs.push(trimmed);
                }
            });

            if (items.length > 0) {
                groups.push({title: "General", items});
            }
            sectionTextContent = paragraphs.join('\n').trim();
        }

        sections.push({
            type: isVersionHistory ? 'history' : 'phase',
            id: cleanTitle.toLowerCase().replace(/\s+/g, '-'),
            title: cleanTitle,
            status,
            groups,
            textContent: sectionTextContent,
            table: tableData
        });
    });

    return {sections};
};