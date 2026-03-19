import React from 'react';
import PageBackground from '../../components/layout/PageBackground';
import Footer from '../../components/layout/Footer';
import {usePageMetadata} from '../../hooks/usePageMetadata';
import {useLanguage} from '../../context/LanguageContext';
import {appsHomeConfig} from './AppsHomeConfig';
import {pixelPulseConfig} from '../pixel-pulse/PixelPulseConfig';
import {pixelCompassConfig} from '../pixel-compass/PixelCompassConfig';
import AppsHero from '../../components/sections/AppsHero';
import ScrollDeviceSection from '../../components/sections/ScrollDeviceSection';
import WearSection from '../../components/sections/WearSection';
import SplitChoice from '../../components/sections/SplitChoice';
import AppsHomeExtra from '../../components/sections/AppsHomeExtra';
import AppLayout from '../../components/layout/AppLayout';

/**
 * AppsHome page component.
 *
 * Sets page metadata (title, theme color, favicon) via `usePageMetadata`,
 * reads localized content from `useLanguage` and renders the apps home
 * sections: hero, device scroll sections, wear section, split choice, extra info, and footer.
 *
 * @returns {JSX.Element}
 */
export default function AppsHome() {
    const {content} = useLanguage();
    const t = content.apps_home || {};

    usePageMetadata({
        title: t.meta_title || appsHomeConfig.appName,
        description: t.hero_subtitle || "Discover Pixel Pulse and Pixel Compass.",
        themeColor: appsHomeConfig.themeColor,
        favicon: appsHomeConfig.faviconUrl,
        type: 'website'
    });

    const exploreLabel = t.split_choice?.explore || "Explore";
    const getPlusLabel = content.footer_extra?.plus_promo?.cta || "Get Plus";

    return (
        <AppLayout
            background={<PageBackground/>}
            footer={<Footer t={content.footer}/>}
        >
            <main className="app-main-content" style={{flex: 1}}>
                <div style={{paddingTop: '120px', paddingBottom: '0'}}>
                    <AppsHero
                        title={t.hero_title}
                        subtitle={t.hero_subtitle}
                        scrollText={t.scroll_explore}
                    />

                    <ScrollDeviceSection
                        config={pixelPulseConfig}
                        title={t.pulse_section?.title}
                        points={t.pulse_section?.points || []}
                        exploreText={`${exploreLabel} Pulse`}
                        plusText={getPlusLabel}
                        reversed={false}
                    />

                    <ScrollDeviceSection
                        config={pixelCompassConfig}
                        title={t.compass_section?.title}
                        points={t.compass_section?.points || []}
                        exploreText={`${exploreLabel} Compass`}
                        plusText={getPlusLabel}
                        reversed={true}
                    />

                    <WearSection
                        pulseConfig={pixelPulseConfig}
                        compassConfig={pixelCompassConfig}
                        texts={t.wear_section || {}}
                    />

                    <SplitChoice
                        pulseConfig={pixelPulseConfig}
                        compassConfig={pixelCompassConfig}
                        texts={t.split_choice || {}}
                    />

                    <AppsHomeExtra
                        t={t.footer_extra || {}}
                    />
                </div>
            </main>
        </AppLayout>
    );
}