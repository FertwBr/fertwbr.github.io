import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

/**
 * Normalizes legacy routes, query parameters, and duplicate index subpaths.
 *
 * @param {Object} props - The component props.
 * @param {string} props.basePath - The canonical base route path (e.g. '/pixelcompass').
 * @param {string[]} validIds - Array of allowed subpage IDs.
 * @param {React.ReactNode} children - Active page element to render when valid.
 * @param {React.ReactNode} [fallback] - Component to render if route is invalid.
 * @returns {React.ReactNode} The rendered children or fallback component.
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
            params.delete('page');
            const remainingParams = params.toString();
            const queryPart = remainingParams ? `?${remainingParams}` : '';

            if (legacyPage === 'index') {
                navigate(`${basePath}${queryPart}${location.hash}`, { replace: true });
                return;
            }

            if (validIds.includes(legacyPage)) {
                navigate(`${basePath}/${legacyPage}${queryPart}${location.hash}`, { replace: true });
                return;
            }
        }

        if (pageId === 'index') {
            navigate(`${basePath}${location.search}${location.hash}`, { replace: true });
        }
    }, [location, navigate, basePath, validIds, pageId]);

    if (pageId) {
        if (pageId === 'index') {
            return null;
        }

        if (!validIds.includes(pageId)) {
            return fallback || null;
        }
    }

    return children;
};

export default RouteNormalizer;