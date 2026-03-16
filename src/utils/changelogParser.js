export const parseChangelog = (markdown) => {
    if (!markdown) return [];

    const sections = markdown.split(/^## /m).slice(1);

    return sections.map((section) => {
        const lines = section.split('\n');
        const versionLine = lines[0].trim();

        const versionMatch = versionLine.match(/^Version (.+)$/i) || [null, versionLine];
        const version = versionMatch[1];

        const vLower = version.toLowerCase();
        let type = 'stable';
        if (vLower.includes('alpha')) type = 'alpha';
        else if (vLower.includes('beta')) type = 'beta';
        else if (vLower.includes('rc') || vLower.includes('release candidate')) type = 'rc';
        else if (vLower.includes('pre-release')) type = 'pre-release';

        const dateRegex = /\*\((?:Released )?(.+?)\)\*/;
        let date = "Pending";
        const dateMatch = section.match(dateRegex);
        if (dateMatch) {
            date = dateMatch[1];
        }

        let contentStartIndex = 1;
        if (lines[1] && lines[1].trim().startsWith('*(')) contentStartIndex = 2;

        while (lines[contentStartIndex] && lines[contentStartIndex].trim() === '') {
            contentStartIndex++;
        }

        let rawContent = lines.slice(contentStartIndex).join('\n').trim();

        const tags = new Set();
        const platformMap = {
            '📱': 'Phone',
            '⌚': 'Wear OS',
            '🖥️': 'Website',
            '🌐': 'Web',
            '👓': 'Android XR',
            '💊': 'Tablet'
        };

        const headerRegex = /^####\s+(.*)$/gm;
        let match;
        while ((match = headerRegex.exec(rawContent)) !== null) {
            const headerText = match[1];
            if (headerText.includes('Phone')) tags.add('Phone');
            if (headerText.includes('Wear OS')) tags.add('Wear OS');

            Object.keys(platformMap).forEach((emoji) => {
                if (headerText.includes(emoji)) tags.add(platformMap[emoji]);
            });
        }

        if (type !== 'stable') {
            const typeLabel = type === 'rc' ? 'RC' : type.charAt(0).toUpperCase() + type.slice(1);
            tags.add(typeLabel);
        }

        return {
            id: version.replace(/[^a-z0-9]/gi, '-').toLowerCase(),
            version,
            date,
            tags: Array.from(tags),
            content: rawContent,
            type
        };
    });
};