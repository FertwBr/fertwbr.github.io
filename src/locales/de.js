import portfolio from './modules/portfolio/de';
import pixel_pulse from './modules/pixel_pulse/de';
import pixel_compass from './modules/pixel_compass/de';

/**
 * Aggregator for German localization resources.
 * Combines core portfolio strings with app-specific modules.
 */
export default {
  ...portfolio,
  pixel_pulse,
  pixel_compass
};