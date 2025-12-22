/**
 * Fetches the raw text content (Markdown) for a specific page.
 *
 * @param {string} pageId - The ID of the page to load (e.g., 'changelog', 'privacy').
 * @param {Object} config - The application configuration object containing paths and page definitions.
 * @returns {Promise<string>} - The raw Markdown text.
 * @throws {Error} - Throws detailed errors if the file cannot be fetched or processed.
 */
export const loadPageContent = async (pageId, config) => {
    const pageConfig = config.pages[pageId];

    if (!pageConfig) {
        throw new Error(`Page ID '${pageId}' is not defined in the application configuration.`);
    }

    if (pageConfig.type === 'react') return null;

    try {
        const url = `${config.basePath}${pageConfig.fileName}`;

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`File not found: ${pageConfig.fileName}`);
            }
            throw new Error(`Network error (${response.status})`);
        }

        const text = await response.text();

        if (text.trim().startsWith("<!DOCTYPE") || text.includes("<html")) {
            throw new Error("Invalid content type. Server returned HTML instead of Markdown.");
        }

        return text;
    } catch (error) {
        throw error;
    }
};