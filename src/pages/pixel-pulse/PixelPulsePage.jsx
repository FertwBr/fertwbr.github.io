import React from 'react';
import ProductPage from '../ProductPage';
import { pixelPulseConfig } from './PixelPulseConfig';
import PixelPulseHome from './PixelPulseHome';

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