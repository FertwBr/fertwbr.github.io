import {useEffect, useCallback, useMemo} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

/**
 * React hook to manage tab state via URL path segments.
 * Handles legacy query params redirection and URL cleanup.
 *
 * NOW INCLUDES:
 * 1. Auto-redirect from legacy query params (?page=x) to path (/x).
 * 2. Visual cleanup of parameters like 'theme', 'color', 'page'.
 *
 * @param {Object} config - Configuration object.
 * @param {Object} config.pages - Map of valid page definitions.
 * @param {string} [config.defaultPage] - Default page ID.
 * @param {string} [config.routeBasePath] - The base route (e.g., '/pixelpulse').
 */
export function useTabState(config) {
    const location = useLocation();
    const navigate = useNavigate();
    const {pageId} = useParams();

    const activeTab = useMemo(() => {
        if (pageId && config.pages[pageId]) {
            return pageId;
        }
        const params = new URLSearchParams(location.search);
        const queryPage = params.get('page');
        if (queryPage && config.pages[queryPage]) {
            return queryPage;
        }
        return config.defaultPage || 'index';
    }, [pageId, location.search, config]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryPage = params.get('page');
        const paramsToRemove = ['color', 'theme', 't', 'fbclid', 'source', 'page'];

        let shouldRedirect = false;
        let targetPath = location.pathname;

        if (queryPage && config.routeBasePath && config.pages[queryPage]) {
            const basePath = config.routeBasePath.endsWith('/')
                ? config.routeBasePath.slice(0, -1)
                : config.routeBasePath;
            targetPath = `${basePath}/${queryPage}`;
            shouldRedirect = true;
        }

        const hasTrash = paramsToRemove.some(key => params.has(key));

        if (shouldRedirect || hasTrash) {
            paramsToRemove.forEach(key => params.delete(key));

            const newSearch = params.toString();
            const searchStr = newSearch ? `?${newSearch}` : '';
            const finalHash = location.hash;

            if (shouldRedirect) {
                navigate(`${targetPath}${searchStr}${finalHash}`, {replace: true});
            } else {
                const newUrl = `${targetPath}${searchStr}${finalHash}`;
                window.history.replaceState(window.history.state, '', newUrl);
            }
        }
    }, [location.search, location.pathname, location.hash, config, navigate]);

    const handleNavigation = useCallback((tabId) => {
        if (!config.pages[tabId]) return;
        if (tabId === activeTab) return;

        let targetPath;
        if (tabId === config.defaultPage) {
            targetPath = config.routeBasePath || '/';
        } else {
            const basePath = config.routeBasePath?.endsWith('/')
                ? config.routeBasePath.slice(0, -1)
                : (config.routeBasePath || '');
            targetPath = `${basePath}/${tabId}`;
        }

        navigate(targetPath);
        window.scrollTo({top: 0, behavior: 'instant'});
    }, [config, navigate, activeTab]);

    return {
        activeTab,
        handleNavigation
    };
}