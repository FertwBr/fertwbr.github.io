import React from 'react';
import {pixelCompassConfig} from './PixelCompassConfig';

import HomeHero from '../../components/sections/HomeHero';
import HomeNewFeatures from '../../components/sections/HomeNewFeatures';
import HomeFeaturesGrid from '../../components/sections/HomeFeaturesGrid';
import HomePlusTeaser from '../../components/sections/HomePlusTeaser';
import HomePrivacy from '../../components/sections/HomePrivacy';

/**
 * PixelCompassHome component
 *
 * Renders the home page for the Pixel Compass app by composing section components:
 * HomeHero, HomeNewFeatures, HomeFeaturesGrid, HomePlusTeaser, and HomePrivacy.
 *
 * Props:
 * @param {Function} onNavigate - Callback invoked to navigate from child sections.
 * @param {Object} strings - Localized string sets for each section (hero, new_features, features, plus_teaser, privacy_section).
 *
 * Notes:
 * - `pixelCompassConfig` is passed to sections that require app configuration.
 * - This is a presentational functional component; it delegates behavior to children via props.
 */
export default function PixelCompassHome({onNavigate, strings}) {
    return (
        <div style={{width: '100%', overflowX: 'hidden', boxSizing: 'border-box'}}>

            <HomeHero
                appConfig={pixelCompassConfig}
                strings={strings.hero}
                onNavigate={onNavigate}
            />

            <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box'}}>

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