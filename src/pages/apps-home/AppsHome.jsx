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

/**
 * AppsHome page component.
 *
 * Sets page metadata (title, theme color, favicon) via `usePageMetadata`,
 * reads localized content from `useLanguage` and renders the apps home
 * sections: hero, device scroll sections, wear section, split choice, extra info, and footer.
 *
 * @component
 * @returns {JSX.Element} The AppsHome page layout.
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

    return (
        <div style={{
            minHeight: '100dvh',
            width: '100%',
            position: 'relative',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <PageBackground/>

            <main style={{flex: 1}}>
                <div style={{paddingTop: '140px', paddingBottom: '0'}}>
                    <AppsHero
                        title={t.hero_title}
                        subtitle={t.hero_subtitle}
                    />

                    <ScrollDeviceSection
                        config={pixelPulseConfig}
                        title={t.pulse_section?.title}
                        points={t.pulse_section?.points || []}
                        reversed={false}
                    />

                    <ScrollDeviceSection
                        config={pixelCompassConfig}
                        title={t.compass_section?.title}
                        points={t.compass_section?.points || []}
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

            <Footer/>
        </div>
    );
}