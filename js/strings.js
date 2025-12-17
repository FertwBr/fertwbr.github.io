/**
 * A module to handle dynamic loading and retrieval of language strings.
 */

let strings = {};

/**
 * Loads the string module for a given language.
 * Falls back to English if the requested language is not found or fails to load.
 * @param {string} lang - The language code (e.g., 'en', 'pt').
 */
export async function loadStrings(lang) {
    try {
        const langModule = await import(`./strings/strings.${lang}.js`);
        strings[lang] = langModule[lang];
    } catch (error) {
        console.warn(`Strings for language '${lang}' not found. It will fall back to English.`);
    }

    if (!strings.en) {
        try {

            const enModule = await import('./strings/strings.en.js');
            strings.en = enModule.en;
        } catch (error) {
            console.error("Fatal Error: English strings (strings.en.js or example) could not be loaded.");
            strings.en = {};
        }
    }
}

/**
 * Retrieves the strings for a given language, defaulting to English if not found.
 * @param {string} lang - The language code.
 * @returns {object} The strings object for the language.
 */
export function getStringsForLang(lang) {
    return strings[lang] || strings.en;
}