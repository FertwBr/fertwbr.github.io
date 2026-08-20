import React from 'react';
import {pixelMeasureConfig} from './PixelMeasureConfig';
import HomeHero from '../../components/sections/HomeHero';
import HomeNewFeatures from '../../components/sections/HomeNewFeatures';
import HomeFeaturesGrid from '../../components/sections/HomeFeaturesGrid';
import HomePlusTeaser from '../../components/sections/HomePlusTeaser';
import HomePrivacy from '../../components/sections/HomePrivacy';
import HomeStoreFooter from "../../components/layout/HomeStoreFooter.jsx";

/**
 * Main landing page component for the Pixel Measure application.
 *
 * This function orchestrates the assembly of the product's home page by composing
 * multiple section components, including the hero, new features, privacy overview,
 * and the Google Play Store footer.
 *
 * @param {Object} props Component properties.
 * @param {Function} props.onNavigate Navigation callback triggered when a child component requests a route change.
 * @param {Object} props.strings Localized strings payload containing translation data for each section.
 * @returns {JSX.Element} The complete rendered structure of the Pixel Measure landing page.
 */
export default function PixelMeasureHome({onNavigate, strings}) {
    return (
        <div className="home-wrapper">

            <HomeHero
                appConfig={pixelMeasureConfig}
                strings={strings.hero}
                onNavigate={onNavigate}
            />

            <div className="home-sections-container">

                <HomeNewFeatures
                    appConfig={pixelMeasureConfig}
                    strings={strings.new_features}
                    onNavigate={onNavigate}
                />

                <HomeFeaturesGrid
                    strings={strings.features}
                    onNavigate={onNavigate}
                />

                <HomePlusTeaser
                    appConfig={pixelMeasureConfig}
                    strings={strings.plus_teaser}
                    onNavigate={onNavigate}
                />

                <HomePrivacy
                    strings={strings.privacy_section}
                    onNavigate={onNavigate}
                />

                <HomeStoreFooter
                    appConfig={pixelMeasureConfig}
                    strings={strings.store_footer}
                />

            </div>
        </div>
    );
}