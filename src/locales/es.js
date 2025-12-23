import portfolio from './modules/portfolio/es';
import pixel_pulse from './modules/pixel_pulse/es';
import pixel_compass from './modules/pixel_compass/es';
import apps_home from "./modules/apps_home/es.js";

/**
 * Aggregator for Spanish localization resources.
 * Combines core portfolio strings with app-specific modules.
 */
export default {
  ...portfolio,
  pixel_pulse,
  pixel_compass,
  apps_home
};