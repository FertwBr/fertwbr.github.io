import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {AnimatePresence} from 'framer-motion';
import GeometricSpinner from '../components/common/GeometricSpinner.jsx';
import ErrorDisplay from '../components/common/ErrorDisplay';
import {useLanguage} from '../context/LanguageContext';
import {applyMaterialTheme, getSurfaceColor, getSeedColor} from '../theme/themeUtils';
import {usePageMetadata} from '../hooks/usePageMetadata';
import {useMarkdownLoader} from '../hooks/useMarkdownLoader';
import {useTabState} from '../hooks/useTabState';
import AppNavbar from '../components/layout/AppNavbar';
import AppFooter from '../components/layout/AppFooter';
import PageBackground from '../components/layout/PageBackground';
import ChangelogViewer from '../components/viewers/ChangelogViewer';
import PrivacyViewer from '../components/viewers/PrivacyViewer';
import HelpViewer from '../components/viewers/HelpViewer';
import RoadmapViewer from '../components/viewers/RoadmapViewer';
import OverviewViewer from '../components/viewers/OverviewViewer';
import PlusViewer from "../components/viewers/PlusViewer";
import PageTransition from '../components/layout/PageTransition';
import {handleContactSupport} from "../utils/navigationUtils.js";

/**
 * ProductPage React component.
 *
 * Loads and renders product-related pages (overview, changelog, help, privacy, roadmap, plus)
 * based on the active tab from `useTabState`. Handles:
 *  - Markdown loading via `useMarkdownLoader`
 *  - theme application (`applyMaterialTheme`, `getSeedColor`, `getSurfaceColor`)
 *  - page metadata (`usePageMetadata`)
 *  - in-page hash scrolling
 *  - navigation including special "feedback" handling via `handleContactSupport`
 *
 * Props:
 *  - {Object} config - application configuration (appId, appName, faviconUrl, etc.)
 *  - {React.Component} HomeComponent - component to render for the home/index tab
 *  - {string} translationKey - key used to retrieve localized strings from the language context
 */
export default function ProductPage({config, HomeComponent, translationKey}) {
    const {content} = useLanguage();
    const t = content[translationKey];
    const location = useLocation();
    const navigate = useNavigate();

    const routeBasePath = config.appId.includes('pixelpulse') ? '/pixelpulse' : '/pixelcompass';
    const configWithRoute = {...config, routeBasePath};

    const {activeTab, handleNavigation: internalNav} = useTabState(configWithRoute);
    const [activeColor] = useState(() => getSeedColor());

    const {markdownContent, isLoading, error} = useMarkdownLoader(activeTab, config);

    useEffect(() => {
        if (location.hash) {
            const targetHash = location.hash;
            setTimeout(() => {
                const id = targetHash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({behavior: 'smooth', block: 'start'});
                }
            }, 500);
        }
    }, [location.hash]);

    const surfaceColor = getSurfaceColor(activeColor, true);

    usePageMetadata({
        title: `${config.appName} - ${activeTab === 'index' ? 'Home' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`,
        themeColor: surfaceColor,
        favicon: config.faviconUrl
    });

    /**
     * Unified navigation handler.
     */
    const onNavigate = (id) => {
        if (id === 'feedback') {
            const source = config.appId.includes('pixelpulse') ? 'pixelpulse' : 'pixelcompass';
            handleContactSupport('feedback', navigate, { source: source, platform: 'android' });
        } else {
            internalNav(id);
        }
    };

    useEffect(() => {
        applyMaterialTheme(activeColor, true);
    }, [activeColor]);

    const renderContent = () => {
        if (activeTab === 'index') return null;

        if (isLoading) {
            return <GeometricSpinner />;
        }

        if (error) {
            return <ErrorDisplay error={error} onRetry={() => window.location.reload()} />;
        }

        if (!markdownContent) {
            return <div style={{height: '60vh', flex: 1}}></div>;
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
            case 'help':
                return <HelpViewer {...commonProps} />;
            case 'roadmap':
                return <RoadmapViewer {...commonProps} />;
            case 'overview':
                return <OverviewViewer {...commonProps} />;
            case 'plus':
                return <PlusViewer {...commonProps} />;
            default:
                return (
                    <div style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        paddingBottom: '60px',
                        width: '100%',
                        boxSizing: 'border-box',
                        flex: 1,
                        paddingLeft: '20px',
                        paddingRight: '20px'
                    }}>
                        <div className="glass-card" style={{padding: 'clamp(24px, 5vw, 40px)', borderRadius: '24px'}}>
                            <div className="markdown-body">
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdownContent}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    const isHome = activeTab === 'index';

    return (
        <div className="page-wrapper">
            <PageBackground/>

            <AppNavbar
                config={config}
                activePage={activeTab}
                onNavigate={onNavigate}
                strings={t.nav}
            />

            <main className="page-content-wrapper">
                <AnimatePresence mode="wait">
                    <PageTransition key={`${config.appId}_${activeTab}`}>
                        <div className={!isHome ? "page-content-padding" : ""} style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            maxWidth: ['changelog', 'privacy', 'help', 'roadmap', 'overview', 'plus'].includes(activeTab) ? '1600px' : '100%',
                            margin: '0 auto',
                            paddingLeft: isHome ? '0' : '16px',
                            paddingRight: isHome ? '0' : '16px'
                        }}>
                            {isHome ? (
                                <HomeComponent onNavigate={onNavigate} strings={t}/>
                            ) : renderContent()}
                        </div>
                    </PageTransition>
                </AnimatePresence>
            </main>

            <AppFooter
                strings={t}
                onNavigate={onNavigate}
                activePage={activeTab}
            />
        </div>
    );
}