import React from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import PageBackground from '../../components/layout/PageBackground';
import {usePageMetadata} from '../../hooks/usePageMetadata';
import {useLanguage} from '../../context/LanguageContext';

import {appsHomeConfig} from './AppsHomeConfig';
import {pixelPulseConfig} from '../pixel-pulse/PixelPulseConfig';
import {pixelCompassConfig} from '../pixel-compass/PixelCompassConfig';

/**
 * Apps Portal Home Component.
 * Displayed when accessing the root domain 'apps.fertwbr.com'.
 */
export default function AppsHome() {
    const navigate = useNavigate();
    const {content} = useLanguage();

    const t = content.apps_home || {};

    const apps = [pixelPulseConfig, pixelCompassConfig];

    usePageMetadata({
        title: t.meta_title || appsHomeConfig.appName,
        themeColor: appsHomeConfig.themeColor,
        favicon: appsHomeConfig.faviconUrl
    });

    return (
        <div style={{
            minHeight: '100dvh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <PageBackground/>

            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                style={{zIndex: 1, textAlign: 'center', padding: '20px'}}
            >
                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: 800,
                    marginBottom: '40px',
                    background: appsHomeConfig.heroGradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    {t.hero_title}
                </h1>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '24px',
                    justifyContent: 'center',
                    maxWidth: '800px'
                }}>
                    {apps.map((app) => (
                        <motion.div
                            key={app.appId}
                            whileHover={{scale: 1.05, y: -5}}
                            whileTap={{scale: 0.95}}
                            onClick={() => navigate(app.scheme === 'pixelpulse' ? '/pixelpulse' : '/pixelcompass')}
                            className="glass-card"
                            style={{
                                width: '280px',
                                padding: '32px',
                                borderRadius: '24px',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '16px',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                        >
                            <img
                                src={app.appIcon}
                                alt={app.appName}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '22px',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                                }}
                            />
                            <h2 style={{fontSize: '1.25rem', fontWeight: 600, margin: 0}}>{app.appName}</h2>
                            <span style={{
                                fontSize: '0.9rem',
                                color: 'var(--md-sys-color-primary)',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                {t.open_app} <span className="material-symbols-outlined"
                                                   style={{fontSize: '16px'}}>arrow_forward</span>
                            </span>
                        </motion.div>
                    ))}
                </div>

                <div style={{marginTop: '60px'}}>
                    <a
                        href={appsHomeConfig.portfolioUrl}
                        style={{
                            color: 'rgba(255,255,255,0.5)',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        <span className="material-symbols-outlined">person</span>
                        {t.visit_portfolio}
                    </a>
                </div>
            </motion.div>
        </div>
    );
}