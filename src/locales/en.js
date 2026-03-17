// src/locales/en.js
import shared from './modules/shared/en';
import portfolio from './modules/portfolio/en';
import pixel_pulse from './modules/pixel_pulse/en';
import pixel_compass from './modules/pixel_compass/en';
import apps_home from './modules/apps_home/en';

/**
 * Recursively merges the properties of the source object into the target object.
 * Ensures that nested overrides do not wipe out the base shared properties.
 *
 * @param {Object} target - The base object containing shared strings.
 * @param {Object} source - The override object containing app-specific strings.
 * @returns {Object} A new merged object.
 */
const mergeModules = (target, source) => {
    const output = { ...target };
    if (!source) return output;

    Object.keys(source).forEach(key => {
        if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
            output[key] = mergeModules(target[key] || {}, source[key]);
        } else {
            output[key] = source[key];
        }
    });
    return output;
};

/**
 * Aggregator for English localization resources.
 * Combines universal shared strings with app-specific overrides.
 */
export default {
    ...mergeModules(shared, portfolio),
    pixel_pulse: mergeModules(shared, pixel_pulse),
    pixel_compass: mergeModules(shared, pixel_compass),
    apps_home: apps_home
};