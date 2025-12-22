import portfolio from './modules/portfolio/ja';
import pixel_pulse from './modules/pixel_pulse/ja';
import pixel_compass from './modules/pixel_compass/ja';

/**
 * Aggregator for Japanese localization resources.
 * Combines core portfolio strings with app-specific modules.
 */
export default {
  ...portfolio,
  pixel_pulse,
  pixel_compass
};