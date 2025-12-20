export const parsePrivacyPolicy = (markdown) => {
  if (!markdown) return { lastUpdated: '', sections: [] };

  let lines = markdown.split('\n');
  let lastUpdated = '';
  
  const dateRegex = /Last Updated:\s*(.+)/i;
  
  for (let i = 0; i < 10 && i < lines.length; i++) {
    const match = lines[i].match(dateRegex);
    if (match) {
      lastUpdated = match[1].replace(/[*_]/g, '').trim();
      break;
    }
  }

  lines = lines.filter(line => !line.match(dateRegex));
  const cleanMarkdown = lines.join('\n');

  const sections = [];
  const rawSections = cleanMarkdown.split(/^## /m);

  const introContent = rawSections[0];
  
  const cleanIntro = introContent.replace(/^# .+$/m, '').trim();
  
  if (cleanIntro) {
    sections.push({
      id: 'introduction',
      title: 'Introduction',
      content: cleanIntro
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

  return { lastUpdated, sections };
};