import React from 'react';
import ExtensionHero from '../../components/sections/tools/ExtensionHero';
import ExtensionFeatures from '../../components/sections/tools/ExtensionFeatures';
import ExtensionHowTo from '../../components/sections/tools/ExtensionHowTo';
import ExtensionDev from '../../components/sections/tools/ExtensionDev';
import ExtensionFaq from '../../components/sections/tools/ExtensionFaq';
import HomeNewFeatures from '../../components/sections/HomeNewFeatures';
import AppFooter from '../../components/layout/AppFooter';
import { geminiExpressiveConfig } from './GeminiExpressiveConfig';

/**
 * GeminiExpressiveHome component
 *
 * Serves as the dynamic landing page for the extension.
 * Orchestrates the sections in the proper marketing order.
 *
 * @param {Object} props
 * @param {Function} props.onNavigate
 * @param {Object} props.strings
 * @returns {JSX.Element}
 */
export default function GeminiExpressiveHome({ onNavigate, strings }) {

    const newFeaturesStrings = {
        title: strings?.cta_changelog || "Latest Updates",
        view_history: strings?.cta_changelog || "Changelog",
        label: "What's New"
    };

    return (
        <div className="home-wrapper">
            <div className="home-main-content">
                <ExtensionHero
                    config={geminiExpressiveConfig}
                    strings={strings}
                />

                <ExtensionFeatures
                    strings={strings}
                />

                <ExtensionHowTo
                    strings={strings}
                />

                <div className="new-features-wrapper">
                    <HomeNewFeatures
                        appConfig={geminiExpressiveConfig}
                        strings={newFeaturesStrings}
                        onNavigate={onNavigate}
                    />
                </div>

                <ExtensionFaq
                    strings={strings}
                />

                <ExtensionDev
                    strings={strings}
                />
            </div>

            <AppFooter
                strings={strings}
                onNavigate={onNavigate}
                activePage="index"
            />
        </div>
    );
}