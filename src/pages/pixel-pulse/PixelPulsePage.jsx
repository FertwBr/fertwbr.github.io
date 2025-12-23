import React from 'react';
import ProductPage from '../ProductPage';
import { pixelPulseConfig } from './PixelPulseConfig';
import PixelPulseHome from './PixelPulseHome';

/**
 * PixelPulsePage component.
 *
 * Combines the base `pixelPulseConfig` with a custom `faviconUrl` and renders
 * the generic `ProductPage` with `PixelPulseHome` as the home component.
 *
 * @component
 * @returns {JSX.Element} The rendered ProductPage for Pixel Pulse.
 */
export default function PixelPulsePage() {
  const config = {
    ...pixelPulseConfig,
    faviconUrl: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Pulse/art/favicon/favicon.ico"
  };

  return (
    <ProductPage 
      config={config} 
      HomeComponent={PixelPulseHome} 
      translationKey="pixel_pulse" 
    />
  );
}