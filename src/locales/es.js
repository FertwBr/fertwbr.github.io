import portfolio from './modules/portfolio/es';
import pixel_pulse from './modules/pixel_pulse/es';
import pixel_compass from './modules/pixel_compass/es';
import apps_home from "./modules/apps_home/es.js";
import shared from "./modules/shared/es.js";
import gemini_expressive from "./modules/gemini_expressive/es.js";

/**
 * Aggregator for Spanish localization resources.
 * Combines core portfolio strings with app-specific modules.
 */
export default {
  shared,
  portfolio,
  pixel_pulse,
  pixel_compass,
  apps_home,
  gemini_expressive
};