import {useEffect, useCallback, useMemo} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

/**
 * React hook to manage tab state via the `page` URL query parameter.
 *
 * - Determines the current active tab from `location.search` (falls back to `config.defaultPage` or `'index'`).
 * - Returns a `handleNavigation(tabId)` function that updates the URL using `navigate` (replacing history) and scrolls to top.
 * - Cleans common tracking/query parameters (`color`, `t`, `fbclid`, `source`) from the URL when the location changes.
 *
 * @param {Object} config - Configuration for the hook.
 * @param {Object<string, any>} config.pages - Map of valid page ids to page definitions.
 * @param {string} [config.defaultPage] - Default page id to use when `page` param is missing or invalid.
 * @returns {{ activeTab: string, handleNavigation: (tabId: string) => void }} Object containing the current active tab id and a navigation handler.
 */
export function useTabState(config) {
    const location = useLocation();
    const navigate = useNavigate();

    const activeTab = useMemo(() => {
        const params = new URLSearchParams(location.search);
        const pageParam = params.get('page');

        if (pageParam && config.pages[pageParam]) {
            return pageParam;
        }
        return config.defaultPage || 'index';
    }, [location.search, config]);

    const handleNavigation = useCallback((tabId) => {
        if (!config.pages[tabId]) return;

        if (tabId === activeTab) return;

        if (tabId === config.defaultPage) {
            navigate(location.pathname, {replace: true});
        } else {
            navigate(`${location.pathname}?page=${tabId}`, {replace: true});
        }

        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [config, location.pathname, navigate, activeTab]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        let needsCleanup = false;
        const paramsToRemove = ['color', 't', 'fbclid', 'source'];

        paramsToRemove.forEach(key => {
            if (params.has(key)) {
                params.delete(key);
                needsCleanup = true;
            }
        });

        if (needsCleanup) {
            const newSearch = params.toString();
            const newUrl = newSearch ? `${location.pathname}?${newSearch}` : location.pathname;
            window.history.replaceState({}, '', newUrl);
        }
    }, [location.search, location.pathname]);

    return {
        activeTab,
        handleNavigation
    };
}