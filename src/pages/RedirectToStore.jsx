import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {pixelPulseConfig} from './pixel-pulse/PixelPulseConfig';
import {pixelCompassConfig} from './pixel-compass/PixelCompassConfig';
import {useLanguage} from '../context/LanguageContext';
import PageBackground from '../components/layout/PageBackground';

const configs = {
    'pixelpulse': pixelPulseConfig,
    'pixelcompass': pixelCompassConfig
};

/**
 * RedirectToStore React component.
 *
 * Attempts to open the native app via a platform-specific URL (Android intent or custom scheme)
 * and falls back to the Play Store web page if the app isn't available. Also updates the
 * application's primary color CSS variable based on the selected app configuration.
 *
 * Props:
 * @param {Object} props
 * @param {'open'|'buy'} [props.type='open'] - Determines the host path used for the deep link (`open` or `open/buy`).
 * @param {string} [props.appKey='pixelpulse'] - Key selecting the app configuration (e.g. 'pixelpulse', 'pixelcompass').
 *
 * Side effects:
 * - Sets `--md-sys-color-primary` from the selected config on mount.
 * - On Android, attempts an `intent://` redirect and updates `status` to `'manual'` if the app does not open.
 * - On non-Android platforms, redirects to the Play Store web page shortly after mount.
 *
 * Returns:
 * @returns {JSX.Element} UI shown while attempting the redirect and fallback actions.
 */
export default function RedirectToStore({type = 'open', appKey = 'pixelpulse'}) {
    const config = configs[appKey] || pixelPulseConfig;
    const [status, setStatus] = useState('attempting');
    const {content} = useLanguage();

    useEffect(() => {
        document.documentElement.style.setProperty('--md-sys-color-primary', config.seedColor);

        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isAndroid = /android/i.test(userAgent);
        const appId = config?.appId;
        const scheme = config?.scheme;

        const fallbackUrl = `market://details?id=${appId}`;
        const encodedFallback = encodeURIComponent(fallbackUrl);

        const hostPath = type === 'buy' ? 'open/buy' : 'open';
        const androidIntent = `intent://${hostPath}#Intent;scheme=${scheme};package=${appId};S.browser_fallback_url=${encodedFallback};end`;
        const playStoreWeb = `https://play.google.com/store/apps/details?id=${appId}`;

        if (isAndroid) {
            window.location.href = androidIntent;
            setTimeout(() => {
                if (!document.hidden) {
                    setStatus('manual');
                }
            }, 1000);
        } else {
            setTimeout(() => window.location.href = playStoreWeb, 1000);
        }
    }, [type, config]);

    return (
        <main className="redirect-main">
            <PageBackground opacity={0.5}/>

            <motion.div
                initial={{scale: 0.9, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{type: "spring", duration: 0.8}}
                className="glass-card redirect-card"
            >
                <img
                    src={config.appIcon}
                    alt={config.appName}
                    className="redirect-app-icon"
                />

                <div>
                    <h1 className="redirect-title">{config.appName}</h1>
                    <p className="redirect-desc">
                        {status === 'attempting' ? content.redirect.launching : content.redirect.did_open}
                    </p>
                </div>

                {status === 'attempting' ? (
                    <span className="material-symbols-outlined redirect-spinner spin-anim">sync</span>
                ) : (
                    <div className="redirect-actions">
                        <a href={type === 'buy' ? `${config.scheme}://open/buy` : `${config.scheme}://open`}
                           className="btn-glow redirect-btn">
                            {content.redirect.open_again}
                        </a>
                        <a href={config.playStoreLink} target="_blank" rel="noreferrer" className="btn-outline redirect-btn">
                            {content.redirect.get_on_store}
                        </a>
                    </div>
                )}
            </motion.div>
        </main>
    );
}