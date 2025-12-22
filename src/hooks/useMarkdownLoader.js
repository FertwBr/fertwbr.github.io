import { useState, useEffect } from 'react';
import { loadPageContent } from '../utils/contentLoader';
import { useLanguage } from '../context/LanguageContext';

const markdownCache = {};

/**
 * Custom React hook that loads Markdown content for the currently active page.
 * Intellegently handles language switching and caching.
 *
 * @param {string} activeTab - The identifier/key of the currently active page/tab.
 * @param {Object} config - Application configuration containing `pages` and identifying values.
 * @returns {{ markdownContent: string|null, isLoading: boolean, error: Error|null }}
 */
export function useMarkdownLoader(activeTab, config) {
    const [markdownContent, setMarkdownContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { language } = useLanguage();

    useEffect(() => {
        const pageConfig = config.pages[activeTab];

        setError(null);
        setIsLoading(true);

        if (!pageConfig || pageConfig.type === 'react') {
            setMarkdownContent(null);
            setIsLoading(false);
            return;
        }

        const cacheKey = `${config.appId || config.appName}_${activeTab}_${language}`;

        if (markdownCache[cacheKey]) {
            setMarkdownContent(markdownCache[cacheKey]);
            setIsLoading(false);
            return;
        }

        let isMounted = true;
        setMarkdownContent(null);

        loadPageContent(activeTab, config, language)
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
    }, [activeTab, config, language]);

    return { markdownContent, isLoading, error };
}