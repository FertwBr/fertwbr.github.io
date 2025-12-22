/**
 * Helper function to try fetching a URL.
 * Returns text if 200 OK, null if 404, throws on other errors.
 * * @param {string} url
 * @returns {Promise<string|null>}
 */
const tryFetch = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Network error (${response.status}) for ${url}`);
    }
    const text = await response.text();
    if (text.trim().startsWith("<!DOCTYPE") || text.includes("<html")) {
        return null;
    }
    return text;
};

/**
 * Fetches the raw text content (Markdown) for a specific page with smart language fallback.
 * * Logic:
 * 1. Try specific language (e.g., pt-BR)
 * 2. Try base language (e.g., pt)
 * 3. Try fallback English (en)
 * 4. Throw error if none exist.
 *
 * @param {string} pageId - The ID of the page to load.
 * @param {Object} config - The application configuration object.
 * @param {string} language - The current language code (e.g., 'en', 'pt', 'pt-BR').
 * @returns {Promise<string>} - The raw Markdown text.
 * @throws {Error} - Throws if the file cannot be found in any language.
 */
export const loadPageContent = async (pageId, config, language) => {
    const pageConfig = config.pages[pageId];

    if (!pageConfig) {
        throw new Error(`Page ID '${pageId}' is not defined in the application configuration.`);
    }

    if (pageConfig.type === 'react') return null;

    const fileName = pageConfig.fileName;
    const basePath = config.basePath.endsWith('/') ? config.basePath : `${config.basePath}/`;

    const pathsToTry = [];

    pathsToTry.push(`${basePath}${language}/${fileName}`);

    if (language.includes('-')) {
        const baseLang = language.split('-')[0];
        pathsToTry.push(`${basePath}${baseLang}/${fileName}`);
    }

    if (!language.startsWith('en')) {
        pathsToTry.push(`${basePath}en/${fileName}`);
    }

    for (const url of pathsToTry) {
        try {
            const content = await tryFetch(url);
            if (content) return content;
        } catch (e) {
            console.warn(`Failed to fetch optional path: ${url}`, e);
        }
    }

    throw new Error(`File not found: ${fileName} (Checked paths: ${pathsToTry.join(', ')})`);
};