import { useState, useEffect } from 'react';
import { loadPageContent } from '../utils/contentLoader';

const markdownCache = {};

/**
 * Custom React hook that loads Markdown content for the currently active page.
 *
 * - Skips loading if the page is not configured or is a React page.
 * - Uses an in-memory cache (`markdownCache`) keyed by `${config.appId || config.appName}_${activeTab}`.
 * - Manages loading and error state and ensures state updates do not occur after unmount.
 *
 * @param {string} activeTab - The identifier/key of the currently active page/tab.
 * @param {Object} config - Application configuration containing `pages` and identifying values.
 * @returns {{ markdownContent: string|null, isLoading: boolean, error: Error|null }}
 */
export function useMarkdownLoader(activeTab, config) {
  const [markdownContent, setMarkdownContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const pageConfig = config.pages[activeTab];

    setError(null);
    setIsLoading(true);

    if (!pageConfig || pageConfig.type === 'react') {
      setMarkdownContent(null);
      setIsLoading(false);
      return;
    }

    const cacheKey = `${config.appId || config.appName}_${activeTab}`;

    if (markdownCache[cacheKey]) {
      setMarkdownContent(markdownCache[cacheKey]);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setMarkdownContent(null);

    loadPageContent(activeTab, config)
        .then((text) => {
          if (isMounted) {
            markdownCache[cacheKey] = text;
            setMarkdownContent(text);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          if (isMounted) {
            console.error(`[MarkdownLoader] Failed to load ${activeTab}:`, err);
            setError(err);
            setIsLoading(false);
          }
        });

    return () => {
      isMounted = false;
    };
  }, [activeTab, config]);

  return { markdownContent, isLoading, error };
}