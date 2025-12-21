import React from 'react';
import {pixelPulseConfig} from './PixelPulseConfig';
import HomeHero from '../../components/sections/HomeHero';
import HomeNewFeatures from '../../components/sections/HomeNewFeatures';
import HomeFeaturesGrid from '../../components/sections/HomeFeaturesGrid';
import HomePlusTeaser from '../../components/sections/HomePlusTeaser';
import HomePrivacy from '../../components/sections/HomePrivacy';

export default function PixelPulseHome({onNavigate, strings}) {
    return (
        <div style={{width: '100%', overflowX: 'hidden', boxSizing: 'border-box'}}>

            <HomeHero
                appConfig={pixelPulseConfig}
                strings={strings.hero}
                onNavigate={onNavigate}
            />

            <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box'}}>

                <HomeNewFeatures
                    appConfig={pixelPulseConfig}
                    strings={strings.new_features}
                    onNavigate={onNavigate}
                />

                <HomeFeaturesGrid
                    strings={strings.features}
                    onNavigate={onNavigate}
                />

                <HomePlusTeaser
                    appConfig={pixelPulseConfig}
                    strings={strings.plus_teaser}
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