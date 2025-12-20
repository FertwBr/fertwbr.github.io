import { useState, useEffect } from 'react';
import { loadPageContent } from '../utils/contentLoader';

export function useMarkdownLoader(activeTab, config) {
  const [markdownContent, setMarkdownContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const pageConfig = config.pages[activeTab];

    if (!pageConfig || pageConfig.type === 'react') {
      setMarkdownContent(null);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setMarkdownContent(null);

    loadPageContent(activeTab, config)
      .then((text) => {
        if (isMounted) {
          setMarkdownContent(text);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, [activeTab, config]);

  return { markdownContent, isLoading };
}