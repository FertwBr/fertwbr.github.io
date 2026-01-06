import React from 'react';
import {pixelPulseConfig} from './PixelPulseConfig';
import HomeHero from '../../components/sections/HomeHero';
import HomeNewFeatures from '../../components/sections/HomeNewFeatures';
import HomeFeaturesGrid from '../../components/sections/HomeFeaturesGrid';
import HomePlusTeaser from '../../components/sections/HomePlusTeaser';
import HomePrivacy from '../../components/sections/HomePrivacy';
import HomeStoreFooter from "../../components/layout/HomeStoreFooter.jsx";

/**
 * PixelPulseHome component.
 *
 * Root landing page for the Pixel Pulse app. Renders the hero, features,
 * new-features, plus teaser and privacy sections using the provided
 * configuration and localized strings.
 *
 * @param {Object} props - Component props.
 * @param {(route: string) => void} props.onNavigate - Navigation callback invoked
 *   when a child component requests navigation.
 * @param {Object} props.strings - Localized strings for each section of the page.
 * @returns {JSX.Element} The rendered PixelPulse home page.
 */
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

                <HomeStoreFooter
                    appConfig={pixelPulseConfig}
                    strings={strings.store_footer}
                />

            </div>
        </div>
    );
}