export const parseHelpFAQ = (markdown) => {
  if (!markdown) return { sections: [] };

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

  rawSections.slice(1).forEach((rawSection) => {
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

  return { sections };
};