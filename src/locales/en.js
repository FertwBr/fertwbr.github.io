import portfolio from './modules/portfolio/en';
import pixel_pulse from './modules/pixel_pulse/en';
import pixel_compass from './modules/pixel_compass/en';
import apps_home from "./modules/apps_home/en.js";

/**
 * Aggregator for English localization resources.
 * Combines core portfolio strings with app-specific modules.
 */
export default {
    ...portfolio,
    pixel_pulse,
    pixel_compass,
    apps_home
};