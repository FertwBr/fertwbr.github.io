import pkg from '../../package.json';

/**
 * Centralized configuration for external links, metadata, and static routes.
 * Serves as a single source of truth.
 */
export const SiteConfig = {
    /** General project metadata */
    meta: {
        version: pkg.version,
        author: 'Fernando Vaz',
        startYear: 2025,
        email: 'contact@fertwbr.com',
    },
    /** External links */
    links: {
        githubProfile: 'https://github.com/fertwbr',
        linkedin: 'https://linkedin.com/in/fernando-bela',
        repo: 'https://github.com/fertwbr/fertwbr.github.io',
        mailTo: 'mailto:contact@fertwbr.com'
    },
    /** Common assets URLs */
    assets: {
        avatar: '/content/assets/avatar.png'
    },
    /** Important static internal routes */
    routes: {
        siteChangelog: '/changelog',
        feedback: '/feedback'
    },
    /**
     * Generates the dynamic copyright string.
     * @returns {string} e.g. "2025" or "2025 - 2026"
     */
    getCopyrightYear: () => {
        const currentYear = new Date().getFullYear();
        const start = 2025;
        return currentYear > start ? `${start} - ${currentYear}` : `${start}`;
    }
};