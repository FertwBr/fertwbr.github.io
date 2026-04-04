import portfolio from './modules/portfolio/pt';
import pixel_pulse from './modules/pixel_pulse/pt';
import pixel_compass from './modules/pixel_compass/pt';
import apps_home from "./modules/apps_home/pt.js";
import shared from "./modules/shared/pt.js";
import gemini_expressive from "./modules/gemini_expressive/pt.js";

/**
 * Aggregator for Portuguese localization resources.
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