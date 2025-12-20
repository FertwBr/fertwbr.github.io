const cleanText = (text) => {
  return text ? text.replace(/\{:.*?\}/g, '').trim() : '';
};

const cleanBold = (text) => {
  return text ? text.replace(/\*\*/g, '') : '';
};

export const parsePlusMarkdown = (markdown) => {
  if (!markdown) return null;

  const sections = markdown.split(/^## /m);

  const data = {
    intro: '',
    featuresGroups: [],
    toolsSection: null,
    licensingSection: null,
    comparison: [],
    whySection: { intro: '', items: [] },
  };

  let introRaw = sections[0].replace(/^# .*$/m, '').trim();
  data.intro = cleanText(introRaw);

  const parseFeatureTable = (lines) => {
    const features = [];
    lines.forEach(line => {
      const match = line.match(/\|\s*<md-icon>(.*?)<\/md-icon>\s*\*\*(.*?)\*\*\s*\|\s*(.*?)\s*\|/);
      if (match) {
        features.push({
          icon: match[1],
          title: match[2],
          desc: cleanBold(match[3])
        });
      }
    });
    return features;
  };

  sections.forEach(section => {
    const lines = section.split('\n');
    const titleLine = lines[0];
    const sectionTitle = cleanText(titleLine);

    if (titleLine.includes('data-toc-key="unlock"') || titleLine.includes('data-toc-key="features"')) {
      const subSections = section.split(/^### /m);
      subSections.forEach((sub, index) => {
        if (index === 0) return;
        const subLines = sub.split('\n');
        const subTitle = cleanText(subLines[0]);
        const items = parseFeatureTable(subLines);
        if (items.length > 0) {
          data.featuresGroups.push({ category: subTitle, items: items });
        }
      });
      if (data.featuresGroups.length === 0) {
        const items = parseFeatureTable(lines);
        if (items.length > 0) data.featuresGroups.push({ category: '', items });
      }
    }

    else if (titleLine.includes('data-toc-key="tools"')) {
      const tools = [];
      const subTools = section.split(/^### /m);
      subTools.forEach((t, i) => {
        if (i === 0) return;
        const tLines = t.split('\n');
        let tTitle = cleanText(tLines[0]).replace(/<md-icon>.*?<\/md-icon>/g, '').trim();
        const iconMatch = tLines[0].match(/<md-icon>(.*?)<\/md-icon>/);
        const icon = iconMatch ? iconMatch[1] : null;

        const tDesc = tLines.slice(1).join('\n').trim();
        tools.push({ title: tTitle, content: tDesc, icon: icon });
      });
      data.toolsSection = { title: sectionTitle, items: tools };
    }

    else if (titleLine.includes('data-toc-key="licensing"')) {
      const licenses = [];
      const subLic = section.split(/^### /m);
      subLic.forEach((l, i) => {
        if (i === 0) return;
        const lLines = l.split('\n');
        let lTitle = cleanText(lLines[0]).replace(/<md-icon>.*?<\/md-icon>/g, '').trim();
        const iconMatch = lLines[0].match(/<md-icon>(.*?)<\/md-icon>/);
        const icon = iconMatch ? iconMatch[1] : 'verified';

        const lDesc = lLines.slice(1).join('\n').trim();
        licenses.push({ title: lTitle, content: lDesc, icon: icon });
      });
      data.licensingSection = { title: sectionTitle, items: licenses };
    }

    else if (titleLine.includes('data-toc-key="comparison"') || titleLine.includes('Compare Editions')) {
      const compLines = lines.filter(l => l.trim().startsWith('|') && !l.includes('---') && !l.includes('Feature |'));
      compLines.forEach(l => {
        const cols = l.split('|').filter(c => c.trim() !== '');
        if (cols.length >= 2) {
          const row = { feature: cleanBold(cols[0].trim()), col1: cleanBold(cols[1].trim()), col2: cleanBold(cols[2].trim()) };
          if (cols[3]) row.col3 = cleanBold(cols[3].trim());
          data.comparison.push(row);
        }
      });
    }

    else if (titleLine.includes('data-toc-key="why"')) {
      const whyItems = [];
      const introText = lines.slice(1).filter(l => !l.startsWith('|') && !l.startsWith('#')).join('\n').trim();
      data.whySection.intro = cleanText(introText);

      const gridLines = lines.filter(l => l.trim().startsWith('|') && !l.includes('---') && !l.includes('Reason |'));
      gridLines.forEach(l => {
        const cols = l.split('|').filter(c => c.trim() !== '');
        const titleMatch = cols[0].match(/<md-icon>(.*?)<\/md-icon>\s*\*\*(.*?)\*\*/);
        if (titleMatch && cols[1]) {
          whyItems.push({ icon: titleMatch[1], title: titleMatch[2], desc: cols[1].trim() });
        }
      });
      data.whySection.items = whyItems;
      data.whySection.title = sectionTitle;
    }
  });

  return data;
};