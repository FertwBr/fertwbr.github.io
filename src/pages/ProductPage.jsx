/**
 * @description Generic layout container for product pages with dynamic theme and markdown loading.
 */

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { AnimatePresence } from 'framer-motion';
import GeometricSpinner from '../components/common/GeometricSpinner.jsx';
import ErrorDisplay from '../components/common/ErrorDisplay';
import { useLanguage } from '../context/LanguageContext';
import { applyMaterialTheme, getSurfaceColor, getSeedColor } from '../theme/themeUtils';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useMarkdownLoader } from '../hooks/useMarkdownLoader';
import { useTabState } from '../hooks/useTabState';
import AppNavbar from '../components/layout/AppNavbar';
import AppFooter from '../components/layout/AppFooter';
import PageBackground from '../components/layout/PageBackground';
import ChangelogViewer from '../components/viewers/ChangelogViewer';
import PrivacyViewer from '../components/viewers/PrivacyViewer';
import HelpViewer from '../components/viewers/HelpViewer';
import RoadmapViewer from '../components/viewers/RoadmapViewer';
import OverviewViewer from '../components/viewers/OverviewViewer';
import PlusViewer from '../components/viewers/PlusViewer';
import BetaViewer from '../components/viewers/BetaViewer';
import PageTransition from '../components/layout/PageTransition';
import { handleContactSupport } from '../utils/navigationUtils.js';
import HashScrollHandler from '../components/common/HashScrollHandler';
import TermsViewer from '../components/viewers/TermsViewer.jsx';
import AppLayout from '../components/layout/AppLayout.jsx';

/**
 * @param {Object} props - Component properties.
 * @param {Object} props.config - Product configuration object.
 * @param {React.ComponentType} props.HomeComponent - Main home component for the product.
 * @param {string} props.translationKey - Key used for localized strings.
 * @param {string} [props.forcedTab] - Forced active tab override.
 * @returns {JSX.Element} The rendered product page container.
 */
export default function ProductPage({ config, HomeComponent, translationKey, forcedTab }) {
    const { content } = useLanguage();
    const t = content[translationKey] || {};
    const navigate = useNavigate();
    const location = useLocation();

    const forceLoading = new URLSearchParams(location.search).get('testLoading') === 'true';

    let routeBasePath = '/pixelcompass';
    if (config.appId.includes('pixelpulse')) {
        routeBasePath = '/pixelpulse';
    } else if (config.appId.includes('pixelmeasure')) {
        routeBasePath = '/pixelmeasure';
    } else if (config.appId.includes('geminiexpressive')) {
        routeBasePath = '/geminiexpressive';
    }

    const configWithRoute = { ...config, routeBasePath, defaultPage: forcedTab || config.defaultPage };

    const { activeTab, handleNavigation: internalNav } = useTabState(configWithRoute);
    const [activeColor] = useState(() => getSeedColor());

    const fileToLoad = activeTab === 'beta' ? 'changelog' : activeTab;
    const { markdownContent, isLoading, error } = useMarkdownLoader(fileToLoad, config);

    const surfaceColor = getSurfaceColor(activeColor);

    usePageMetadata({
        title: `${config.appName} - ${activeTab === 'index' ? 'Home' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`,
        description: `Official page for ${config.appName}. ${activeTab === 'index' ? 'Download for Android.' : ''}`,
        themeColor: surfaceColor,
        favicon: config.faviconUrl,
        type: 'product',
        product: { appName: config.appName }
    });

    const onNavigate = (id) => {
        if (id === 'feedback') {
            const source = config.appId.includes('pixelpulse')
                ? 'pixelpulse'
                : config.appId.includes('pixelmeasure')
                    ? 'pixelmeasure'
                    : 'pixelcompass';
            handleContactSupport('feedback', navigate, { source: source, platform: 'android' });
        } else {
            internalNav(id);
        }
    };

    useEffect(() => {
        applyMaterialTheme(activeColor);
    }, [activeColor]);

    const renderContent = () => {
        if (activeTab === 'index') return null;

        if (isLoading || forceLoading) return <GeometricSpinner />;
        if (error) return <ErrorDisplay error={error} onRetry={() => window.location.reload()} />;
        if (!markdownContent) {
            return (
                <main className="app-main-content">
                    <article className="glass-card" style={{ padding: 'clamp(24px, 5vw, 40px)', borderRadius: '24px' }}>
                        <h2>{t.not_found_title || 'Content Unavailable'}</h2>
                        <p>{t.not_found_desc || 'The requested documentation could not be loaded at this time.'}</p>
                    </article>
                </main>
            );
        }

        const commonProps = {
            markdownContent,
            appConfig: config,
            seedColor: activeColor,
            strings: t,
            onNavigate: onNavigate
        };

        switch (activeTab) {
            case 'changelog':
                return <ChangelogViewer {...commonProps} />;
            case 'privacy':
                return <PrivacyViewer {...commonProps} />;
            case 'terms':
                return <TermsViewer markdownContent={markdownContent} appConfig={config} strings={t} />;
            case 'help':
                return <HelpViewer {...commonProps} />;
            case 'roadmap':
                return <RoadmapViewer {...commonProps} />;
            case 'overview':
                return <OverviewViewer {...commonProps} />;
            case 'plus':
                return <PlusViewer {...commonProps} />;
            case 'beta':
                return <BetaViewer {...commonProps} />;
            default:
                return (
                    <main className="app-main-content">
                        <div className="glass-card" style={{ padding: 'clamp(24px, 5vw, 40px)', borderRadius: '24px' }}>
                            <div className="markdown-body">
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdownContent}</ReactMarkdown>
                            </div>
                        </div>
                    </main>
                );
        }
    };

    const isHome = activeTab === 'index';

    return (
        <AppLayout
            hasRightSidebarPortal={!isHome && !['beta', 'roadmap', 'plus'].includes(activeTab)}
            background={<><HashScrollHandler /><PageBackground /></>}
            navbar={<AppNavbar config={config} activePage={activeTab} onNavigate={onNavigate} strings={t.nav} />}
            footer={
                <AppFooter
                    strings={{
                        ...t,
                        footer: t?.footer || content.footer,
                        nav: t?.nav || content.nav || {
                            overview: content.overview_page?.title || 'Overview',
                            changelog: content.changelog?.title || 'Changelog',
                            roadmap: content.roadmap_page?.title || 'Roadmap',
                            privacy: content.privacy_page?.page_title || 'Privacy Policy',
                            terms: content.terms_page?.page_title || 'Terms of Use',
                            help: content.help_page?.page_title || 'Help & FAQ'
                        }
                    }}
                    onNavigate={onNavigate}
                    activePage={activeTab}
                />
            }
        >
            <AnimatePresence mode="wait">
                <PageTransition key={`${config.appId}_${activeTab}`}>
                    {isHome ? (
                        <main className="app-main-content" style={{ padding: 0 }}>
                            <HomeComponent onNavigate={onNavigate} strings={t} />
                        </main>
                    ) : (
                        <div className="app-layout-container">
                            {renderContent()}
                        </div>
                    )}
                </PageTransition>
            </AnimatePresence>
        </AppLayout>
    );
}