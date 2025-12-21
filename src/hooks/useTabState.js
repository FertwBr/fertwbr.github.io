import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

 /**
  * Custom hook to manage tab state synchronized with the URL `page` query parameter.
  *
  * @param {Object} config - Configuration object for the hook.
  * @param {string} config.defaultPage - Default tab id used when no `page` param is present.
  * @param {Object} config.pages - Map/object of valid page ids to their metadata/components.
  *
  * Behavior:
  * - Initializes `activeTab` from the `page` query parameter if it matches `config.pages`.
  *   Otherwise, falls back to `config.defaultPage` or `'index'`.
  * - Provides `handleNavigation(tabId)` to change tabs: updates state, replaces history entry
  *   to include or remove the `page` param, and smooth-scrolls to top.
  * - On mount/effect it cleans up unwanted tracking/query params (`color`, `t`, `fbclid`, `source`)
  *   by replacing the current history entry without those params and syncs `activeTab` with the URL.
  *
  * @returns {{ activeTab: string, handleNavigation: function }} - Current active tab id and a navigation handler.
  */
export function useTabState(config) {
    const location = useLocation();
    const navigate = useNavigate();

    const getInitialTab = () => {
        const params = new URLSearchParams(location.search);
        const pageParam = params.get('page');

        if (pageParam && config.pages[pageParam]) {
            return pageParam;
        }
        return config.defaultPage || 'index';
    };

    const [activeTab, setActiveTab] = useState(getInitialTab);

    const handleNavigation = useCallback((tabId) => {
        if (!config.pages[tabId]) return;

        setActiveTab(tabId);

        if (tabId === config.defaultPage) {
            navigate(location.pathname, { replace: true });
        } else {
            navigate(`${location.pathname}?page=${tabId}`, { replace: true });
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [config, location.pathname, navigate]);

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

        const currentTabInUrl = params.get('page') || config.defaultPage;
        if (currentTabInUrl !== activeTab && config.pages[currentTabInUrl]) {
            setActiveTab(currentTabInUrl);
        }

    }, [location.search, location.pathname, activeTab, config]);

    return {
        activeTab,
        handleNavigation
    };
}