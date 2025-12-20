import { useState, useEffect } from 'react';
import { loadPageContent } from '../utils/contentLoader';

export function useMarkdownLoader(activeTab, config) {
  const [markdownContent, setMarkdownContent] = useState(null);
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false); 

  useEffect(() => {
    const pageConfig = config.pages[activeTab];

    if (!pageConfig || pageConfig.type === 'react') {
      setMarkdownContent(null);
      setIsSpinnerVisible(false);
      return;
    }

    let isMounted = true;
    let timer = null;

    setMarkdownContent(null);

    timer = setTimeout(() => {
      if (isMounted) setIsSpinnerVisible(true);
    }, 200);

    loadPageContent(activeTab, config)
      .then((text) => {
        if (isMounted) {
          setMarkdownContent(text);
          setIsSpinnerVisible(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsSpinnerVisible(false);
      })
      .finally(() => {
        clearTimeout(timer);
      });

    return () => { 
      isMounted = false;
      clearTimeout(timer);
    };
  }, [activeTab, config]);

  return { markdownContent, isLoading: isSpinnerVisible };
}