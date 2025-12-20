export const parseRoadmap = (markdown) => {
  if (!markdown) return { sections: [] };

  const cleanMarkdown = markdown.replace(/\{:.*?\}/g, '');
  
  const rawSections = cleanMarkdown.split(/^## /m);
  const sections = [];

  const introContent = rawSections[0].replace(/^# .+$/m, '').trim();
  
  if (introContent) {
    sections.push({ type: 'intro', content: introContent });
  }

  rawSections.slice(1).forEach(sectionText => {
    const lines = sectionText.split('\n');
    const titleLine = lines[0].trim(); 
    
    let status = 'neutral';
    if (titleLine.includes('✅') || titleLine.includes('Launched')) status = 'launched';
    if (titleLine.includes('🧭') || titleLine.includes('Future')) status = 'future';

    const cleanTitle = titleLine.replace(/[✅🧭]/g, '').trim();

    const rawGroups = sectionText.split(/^### /m);
    const groups = [];

    const sectionDesc = rawGroups[0].split('\n').slice(1).join('\n').trim();

    rawGroups.slice(1).forEach(groupText => {
      const groupLines = groupText.split('\n');
      const groupTitle = groupLines[0].replace(/\*\*/g, '').trim();
      
      const items = [];
      groupLines.slice(1).forEach(line => {
        const itemMatch = line.match(/^-\s*(.*)/);
        if (itemMatch) {
          const content = itemMatch[1];
          const parts = content.split('**');
          if (parts.length >= 3) {
             items.push({
               title: parts[1].replace(':', '').trim(),
               desc: parts.slice(2).join('**').trim()
             });
          } else {
             items.push({ title: '', desc: content.replace(/\*\*/g, '') });
          }
        }
      });

      if (groupTitle && items.length > 0) {
        groups.push({ title: groupTitle, items });
      }
    });

    sections.push({
      type: 'phase',
      id: cleanTitle.toLowerCase().replace(/\s+/g, '-'),
      title: cleanTitle,
      status,
      description: sectionDesc,
      groups
    });
  });

  return { sections };
};