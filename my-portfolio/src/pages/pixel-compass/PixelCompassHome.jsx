import React from 'react';
import { pixelCompassConfig } from './PixelCompassConfig';

import HomeHero from '../../components/sections/HomeHero';
import HomeNewFeatures from '../../components/sections/HomeNewFeatures';
import HomeFeaturesGrid from '../../components/sections/HomeFeaturesGrid';
import HomePlusTeaser from '../../components/sections/HomePlusTeaser';
import HomePrivacy from '../../components/sections/HomePrivacy';

export default function PixelCompassHome({ onNavigate, strings }) {
  return (
    <div style={{ width: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
      
      <HomeHero 
        appConfig={pixelCompassConfig} 
        strings={strings.hero} 
        onNavigate={onNavigate} 
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>
        
        <HomeNewFeatures 
          appConfig={pixelCompassConfig}
          strings={strings.new_features}
          onNavigate={onNavigate}
        />

        <HomeFeaturesGrid 
          strings={strings.features}
          onNavigate={onNavigate}
        />

        <HomePlusTeaser 
          appConfig={pixelCompassConfig}
          strings={strings.plus}
          onNavigate={onNavigate}
        />

        <HomePrivacy 
          strings={strings.privacy_section}
          onNavigate={onNavigate}
        />

      </div>
    </div>
  );
}