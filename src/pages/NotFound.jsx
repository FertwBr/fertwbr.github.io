import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { getSurfaceColor } from '../theme/themeUtils';
import { useLanguage } from '../context/LanguageContext';
import { config } from '../config';
import { SiteConfig } from '../utils/siteConstants';

import Footer from '../components/layout/Footer';
import PageBackground from '../components/layout/PageBackground';
import PageTransition from '../components/layout/PageTransition';
import AppLayout from '../components/layout/AppLayout';

const SITE_MAP = [
    { keywords: ['pixelmeasure/changelog', 'measure/changelog'], path: '/pixelmeasure/changelog', name: 'Pixel Measure Updates' },
    { keywords: ['pixelmeasure/privacy', 'measure/privacy'], path: '/pixelmeasure/privacy', name: 'Pixel Measure Privacy' },
    { keywords: ['pixelmeasure/terms', 'measure/terms'], path: '/pixelmeasure/terms', name: 'Pixel Measure Terms' },
    { keywords: ['pixelmeasure/help', 'measure/help'], path: '/pixelmeasure/help', name: 'Pixel Measure Help' },
    { keywords: ['pixelmeasure', 'measure', 'ar', 'ruler'], path: '/pixelmeasure', name: 'Pixel Measure' },
    { keywords: ['geminiexpressive/changelog', 'gemini/changelog'], path: '/geminiexpressive/changelog', name: 'Gemini Expressive Updates' },
    { keywords: ['geminiexpressive/privacy', 'gemini/privacy'], path: '/geminiexpressive/privacy', name: 'Gemini Expressive Privacy' },
    { keywords: ['geminiexpressive/terms', 'gemini/terms'], path: '/geminiexpressive/terms', name: 'Gemini Expressive Terms' },
    { keywords: ['geminiexpressive/help', 'gemini/help'], path: '/geminiexpressive/help', name: 'Gemini Expressive Help' },
    { keywords: ['geminiexpressive', 'gemini', 'expressive', 'extension'], path: '/geminiexpressive', name: 'Gemini Expressive' },
    { keywords: ['pixelpulse/changelog', 'pulse/changelog'], path: '/pixelpulse/changelog', name: 'Pixel Pulse Updates' },
    { keywords: ['pixelpulse/privacy', 'pulse/privacy'], path: '/pixelpulse/privacy', name: 'Pixel Pulse Privacy' },
    { keywords: ['pixelpulse/help', 'pulse/help'], path: '/pixelpulse/help', name: 'Pulse Help Center' },
    { keywords: ['pulse', 'sound', 'meter', 'decibel'], path: '/pixelpulse', name: 'Pixel Pulse' },
    { keywords: ['pixelcompass/changelog', 'compass/changelog'], path: '/pixelcompass/changelog', name: 'Compass Updates' },
    { keywords: ['compass', 'gps', 'north', 'sensor'], path: '/pixelcompass', name: 'Pixel Compass' },
    { keywords: ['site/changelog', 'portfolio/update', 'changelog'], path: '/changelog', name: 'Portfolio Changelog' },
    { keywords: ['site/overview', 'site/docs', 'architecture', 'overview'], path: '/overview', name: 'Technical Overview' },
    { keywords: ['privacy', 'policy', 'legal'], path: '/pixelpulse/privacy', name: 'Privacy Policy' },
    { keywords: ['help', 'faq', 'support'], path: '/pixelpulse/help', name: 'Help Center' },
    { keywords: ['change', 'log', 'update', 'version'], path: '/changelog', name: 'Version History' },
    { keywords: ['plus', 'pro', 'buy'], path: '/pixelpulse/plus', name: 'Pixel Pulse+' },
    { keywords: ['about', 'fernando', 'contact', 'mail'], path: '/', name: 'Portfolio Home' }
];

/**
 * 404 Not Found Page Component.
 * Displays a friendly error message when a route is not matched,
 * and attempts to intelligently suggest a valid route based on the URL keywords.
 * Utilizes an asymmetric M3 Expressive grid layout.
 *
 * @returns {JSX.Element} The rendered Not Found page.
 */
export default function NotFound() {
    const location = useLocation();
    const { content } = useLanguage();
    const [suggestion, setSuggestion] = useState(null);

    const t = content.not_found || {};
    const tFooter = content.footer || {};

    const surfaceColor = getSurfaceColor(config.seedColor);

    usePageMetadata({
        title: `404 - ${t.page_title || "Not Found"}`,
        description: "Page not found.",
        themeColor: surfaceColor,
        favicon: SiteConfig.assets.avatar,
        type: 'website'
    });

    useEffect(() => {
        const path = location.pathname.toLowerCase();
        const found = SITE_MAP.find(item =>
            item.keywords.some(keyword => path.includes(keyword))
        );
        if (found) setSuggestion(found);
    }, [location]);

    return (
        <AppLayout
            background={<PageBackground />}
            footer={<Footer t={tFooter} />}
        >
            <PageTransition className="page-transition-wrapper">
                <main className="not-found-main">
                    <div className="not-found-grid">

                        <motion.div
                            className="not-found-header"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="not-found-icon">
                                <span className="material-symbols-outlined" style={{ fontSize: 'inherit' }}>
                                    broken_image
                                </span>
                            </div>
                            <h1 className="not-found-title">
                                {t.title || "404"}
                            </h1>
                            <p className="not-found-desc">
                                {t.message || "Oops! Into the void."}
                            </p>
                            <div className="not-found-path">
                                <span className="material-symbols-outlined" style={{ fontSize: '18px', opacity: 0.7 }}>link_off</span>
                                {location.pathname}
                            </div>
                        </motion.div>

                        <motion.div
                            className="not-found-body"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            {suggestion && (
                                <div className="not-found-suggestion-card">
                                    <div className="not-found-suggestion-header">
                                        <span className="material-symbols-outlined">auto_awesome</span>
                                        {t.suggestion_title}
                                    </div>
                                    <p className="not-found-suggestion-desc">
                                        {t.suggestion_desc} <strong>{suggestion.name}</strong>.
                                    </p>
                                    <Link to={suggestion.path} className="not-found-suggestion-btn">
                                        {t.suggestion_btn}
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
                                    </Link>
                                </div>
                            )}

                            <div className="not-found-links-grid">
                                <Link to="/" className="not-found-link-card">
                                    <span className="material-symbols-outlined not-found-link-icon">home</span>
                                    <span className="not-found-link-title">{t.home_btn || "Home"}</span>
                                </Link>
                                <Link to="/pixelpulse" className="not-found-link-card">
                                    <span className="material-symbols-outlined not-found-link-icon">graphic_eq</span>
                                    <span className="not-found-link-title">Pixel Pulse</span>
                                </Link>
                                <Link to="/pixelmeasure" className="not-found-link-card">
                                    <span className="material-symbols-outlined not-found-link-icon">architecture</span>
                                    <span className="not-found-link-title">Pixel Measure</span>
                                </Link>
                                <Link to="/pixelcompass" className="not-found-link-card">
                                    <span className="material-symbols-outlined not-found-link-icon">explore</span>
                                    <span className="not-found-link-title">Pixel Compass</span>
                                </Link>
                            </div>
                        </motion.div>

                    </div>
                </main>
            </PageTransition>
        </AppLayout>
    );
}