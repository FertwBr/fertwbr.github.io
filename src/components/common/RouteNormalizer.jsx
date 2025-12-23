import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

/**
 * `RouteNormalizer` is a React component designed to normalize URL paths
 * by redirecting from a path parameter to a query parameter.
 *
 * It handles two main scenarios:
 * 1. If a `pageId` is provided in the URL parameters and it's not in a list of `validIds` (if provided),
 *    it renders the `NotFound` component.
 * 2. If a `pageId` is provided and is valid (or no `validIds` are specified),
 *    it redirects the user to a new URL where the `pageId` is moved from a path parameter
 *    to a query parameter, e.g., `/basePath/someId` becomes `/basePath?page=someId`.
 *
 * This component is useful for maintaining clean URLs and handling legacy routes
 * or specific routing patterns where a path segment should be treated as a query parameter.
 *
 * @param {object} props - The properties passed to the component.
 * @param {string} props.basePath - The base path to which the user should be redirected.
 *                                  The `pageId` will be appended as a query parameter to this path.
 *                                  Example: `/my-section`
 * @param {string[]} [props.validIds] - An optional array of valid `pageId` strings.
 *                                      If provided, and the `pageId` from the URL is not in this array,
 *                                      the `NotFound` component will be rendered.
 * @returns {React.Element | null} A `Navigate` component for redirection, a `NotFound` component, or `null`.
 */
const RouteNormalizer = ({ basePath, validIds, children, fallback }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pageId } = useParams();

    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath.toLowerCase() === basePath && currentPath !== basePath) {
            navigate(`${basePath}${location.search}${location.hash}`, { replace: true });
            return;
        }

        const params = new URLSearchParams(location.search);
        const legacyPage = params.get('page');

        if (legacyPage) {
            if (validIds.includes(legacyPage)) {
                params.delete('page');
                const remainingParams = params.toString();
                const queryPart = remainingParams ? `?${remainingParams}` : '';

                navigate(`${basePath}/${legacyPage}${queryPart}${location.hash}`, { replace: true });
            }
        }
    }, [location, navigate, basePath, validIds]);

    if (pageId) {
        if (!validIds.includes(pageId)) {
            return fallback || null;
        }
    }

    return children;
};

export default RouteNormalizer;