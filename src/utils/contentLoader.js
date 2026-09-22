/**
 * Helper function to try fetching a URL.
 * Returns text if 200 OK, null if 404 or SPA fallback HTML, throws on other errors.
 *
 * @param {string} url - Target file URL to fetch.
 * @returns {Promise<string|null>} The raw text content or null.
 */
const tryFetch = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Network error (${response.status}) for ${url}`);
    }
    const text = await response.text();
    if (text.trim().startsWith('<!DOCTYPE') || text.includes('<html')) {
        return null;
    }
    return text;
};

/**
 * Fetches the raw text content (Markdown) for a specific page with language fallback.
 *
 * @param {string} pageId - The ID of the page to load.
 * @param {Object} config - The application configuration object.
 * @param {string} language - The current language code.
 * @returns {Promise<string>} The raw Markdown text.
 * @throws {Error} Throws if the file cannot be found in any language.
 */
export const loadPageContent = async (pageId, config, language) => {
    const pageConfig = config.pages[pageId];

    if (!pageConfig) {
        throw new Error(`Page ID '${pageId}' is not defined in the application configuration.`);
    }

    if (pageConfig.type === 'react') return null;

    const fileName = pageConfig.fileName;
    const basePath = config.basePath.endsWith('/') ? config.basePath : `${config.basePath}/`;

    const candidateLangs = [];
    if (language) candidateLangs.push(language);
    if (language && language.includes('-')) {
        candidateLangs.push(language.split('-')[0]);
    }
    if (!candidateLangs.includes('en')) {
        candidateLangs.push('en');
    }

    const uniqueLangs = [...new Set(candidateLangs)];
    const pathsToTry = uniqueLangs.map((lang) => `${basePath}${lang}/${fileName}`);

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