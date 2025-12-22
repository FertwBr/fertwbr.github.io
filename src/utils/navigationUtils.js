/**
 * Handles complex navigation logic for support and feedback actions.
 * Centralizes the logic for redirecting to the feedback form or external links.
 *
 * @param {string} actionId - The ID of the action (e.g., 'feedback', 'contact', 'help', 'email').
 * @param {Function} navigate - The React Router navigate function.
 * @param {Object} context - Context data (appName, platform, etc.).
 * @param {string} [context.source] - The source app identifier (e.g., 'pixelpulse').
 * @param {string} [context.platform='web'] - The platform (android, wearos, web).
 */
export const handleContactSupport = (actionId, navigate, context = {}) => {
    const { source = 'portfolio', platform = 'web' } = context;

    switch (actionId) {
        case 'feedback':
        case 'support':
            navigate(`/feedback?source=${source}&platform=${platform}`);
            break;

        case 'contact':
        case 'email':
            window.location.href = "mailto:fertwbr@gmail.com";
            break;

        default:
            if (['help', 'privacy', 'changelog', 'roadmap', 'plus', 'overview'].includes(actionId)) {
                if (source === 'portfolio' || !source) {
                    navigate(`/site?page=${actionId}`);
                } else {
                    navigate(`/${source}?page=${actionId}`);
                }
            } else {
                console.warn(`Unknown navigation action: ${actionId}`);
            }
            break;
    }
};