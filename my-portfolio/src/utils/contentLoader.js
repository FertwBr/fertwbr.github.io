export const loadPageContent = async (pageId, config) => {
  const pageConfig = config.pages[pageId];
  
  if (!pageConfig) {
    console.error(`Page ID '${pageId}' not found in config.`);
    return "# Page not found";
  }

  if (pageConfig.type === 'react') return null;

  try {
    const url = `${config.basePath}${pageConfig.fileName}`;
    
    const response = await fetch(`${url}?t=${new Date().getTime()}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    const text = await response.text();
    
    if (text.trim().startsWith("<!") || text.includes("<html")) {
       throw new Error("File not found (Server returned HTML instead of Markdown)");
    }

    return text;
  } catch (error) {
    console.error("Error loading markdown:", error);
    return `# Error loading content\n\nCould not load the file **${pageConfig.fileName}**.\n\nPlease check if the file exists in the \`public${config.basePath}\` folder.\n\n*Error details: ${error.message}*`;
  }
};