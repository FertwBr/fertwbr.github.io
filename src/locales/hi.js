import portfolio from './modules/portfolio/hi';
import pixel_pulse from './modules/pixel_pulse/hi';
import pixel_compass from './modules/pixel_compass/hi';

/**
 * Aggregator for Hindi localization resources.
 * Combines core portfolio strings with app-specific modules.
 */
export default {
  ...portfolio,
  pixel_pulse,
  pixel_compass
};