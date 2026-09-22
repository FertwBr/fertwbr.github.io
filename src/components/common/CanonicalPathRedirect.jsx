import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MAP = {
    '/PixelPulse': '/pixelpulse',
    '/PixelCompass': '/pixelcompass',
    '/PixelMeasure': '/pixelmeasure',
    '/GeminiExpressive': '/geminiexpressive',
    '/Site': '/overview'
};

/**
 * Redirects legacy or uppercase paths to their canonical lowercase path equivalents.
 *
 * @returns {null} Renders no UI elements.
 */
export default function CanonicalPathRedirect() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const targetPath = MAP[location.pathname];
        if (targetPath) {
            navigate(`${targetPath}${location.search}`, { replace: true });
        }
    }, [location.pathname, location.search, navigate]);

    return null;
}