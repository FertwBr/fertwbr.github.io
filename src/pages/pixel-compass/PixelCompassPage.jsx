import React from 'react';
import ProductPage from '../ProductPage';
import { pixelCompassConfig } from './PixelCompassConfig';
import PixelCompassHome from './PixelCompassHome';

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