export const parseOverview = (markdown) => {
  if (!markdown) return { sections: [] };

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

    const cleanTitle = titleLine.replace(/🛠️|📐|🌐|🔮/g, '').trim();
    const id = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (id.includes('tech-stack')) {
      const techItems = [];
      let isTable = false;

      lines.slice(1).forEach(line => {
        if (line.trim().startsWith('|') && line.includes('---')) {
          isTable = true;
          return;
        }

        if (line.trim().startsWith('|')) {
          const parts = line.split('|').filter(p => p.trim() !== '');
          if (parts.length >= 2) {
            const category = parts[0].trim().replace(/\*\*/g, '');
            const stack = parts[1].trim();

            if (category.toLowerCase() !== 'category') {
              techItems.push({ category, stack });
            }
          }
        }
      });

      const introText = lines.slice(1).filter(l => !l.trim().startsWith('|')).join('\n').trim();

      sections.push({
        id,
        title: cleanTitle,
        type: 'tech-stack',
        intro: introText,
        items: techItems
      });

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

  return { sections };
};