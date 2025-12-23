import React from 'react';
import ProductPage from '../ProductPage';
import { pixelCompassConfig } from './PixelCompassConfig';
import PixelCompassHome from './PixelCompassHome';

/**
 * PixelCompassPage
 *
 * Top-level page component for the Pixel Compass product.
 * Merges the shared product configuration from `pixelCompassConfig` with a
 * custom `faviconUrl` and passes the resulting `config` to `ProductPage`.
 *
 * Renders `ProductPage` with:
 *  - config: merged pixelCompassConfig + faviconUrl override
 *  - HomeComponent: PixelCompassHome
 *  - translationKey: "pixel_compass"
 *
 * @returns {JSX.Element} React element for the Pixel Compass product page.
 */
export default function PixelCompassPage() {
  const config = {
    ...pixelCompassConfig,
    faviconUrl: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/favicon/favicon.ico"
  };

  return (
    <ProductPage 
      config={config} 
      HomeComponent={PixelCompassHome} 
      translationKey="pixel_compass" 
    />
  );
}