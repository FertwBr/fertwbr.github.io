import portfolio from './modules/portfolio/ja';
import pixel_pulse from './modules/pixel_pulse/ja';
import pixel_compass from './modules/pixel_compass/ja';
import apps_home from "./modules/apps_home/ja.js";

/**
 * Aggregator for Japanese localization resources.
 * Combines core portfolio strings with app-specific modules.
 */
export default {
  ...portfolio,
  pixel_pulse,
  pixel_compass,
  apps_home
};