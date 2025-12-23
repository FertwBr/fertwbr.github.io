import {useEffect, useCallback, useMemo} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

/**
 * React hook to manage tab state via URL path segments.
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

        if (queryPage && config.routeBasePath && config.pages[queryPage]) {

            const basePath = config.routeBasePath.endsWith('/')
                ? config.routeBasePath.slice(0, -1)
                : config.routeBasePath;

            const targetPath = `${basePath}/${queryPage}`;

            params.delete('page');
            const searchStr = params.toString();
            const newSearch = searchStr ? `?${searchStr}` : '';

            navigate(`${targetPath}${newSearch}${location.hash}`, {replace: true});
        }
    }, [location.search, config, navigate]);

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
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [config, navigate, activeTab]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const paramsToRemove = ['color', 'theme', 't', 'fbclid', 'source', 'page'];
        let needsCleanup = false;

        paramsToRemove.forEach(key => {
            if (params.has(key)) {
                params.delete(key);
                needsCleanup = true;
            }
        });

        if (needsCleanup) {
            const newSearch = params.toString();
            const newUrl = `${location.pathname}${newSearch ? '?' + newSearch : ''}${location.hash}`;

            window.history.replaceState(
                window.history.state,
                '',
                newUrl
            );
        }
    }, [location.search, location.pathname, location.hash]);

    return {
        activeTab,
        handleNavigation
    };
}