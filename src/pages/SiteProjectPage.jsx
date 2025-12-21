import React, {useState, useEffect} from 'react';
import {AnimatePresence} from 'framer-motion';
import LoadingSpinner from '../components/common/LoadingSpinner';

import {useLanguage} from '../context/LanguageContext';
import {applyMaterialTheme, getSurfaceColor} from '../theme/themeUtils';
import {usePageMetadata} from '../hooks/usePageMetadata';
import {useMarkdownLoader} from '../hooks/useMarkdownLoader';
import {siteProjectConfig} from '../config';
import {useTabState} from '../hooks/useTabState';

import AppNavbar from '../components/layout/AppNavbar';
import AppFooter from '../components/layout/AppFooter';
import PageBackground from '../components/layout/PageBackground';
import PageTransition from '../components/layout/PageTransition';

import ChangelogViewer from '../components/viewers/ChangelogViewer';
import OverviewViewer from '../components/viewers/OverviewViewer';

/**
 * SiteProjectPage component
 *
 * Renders the project documentation pages (overview, changelog) and overall
 * layout (navbar, footer, background). Integrates theme, page metadata and
 * Markdown loading hooks to provide a cohesive documentation experience.
 *
 * Uses:
 *  - useLanguage: localized content
 *  - useTabState: active tab + navigation handler
 *  - useMarkdownLoader: fetches Markdown for the active tab
 *  - usePageMetadata: updates document title, theme color, favicon
 *  - applyMaterialTheme (via useEffect): applies material color theming
 *
 * @returns {JSX.Element} The page wrapper containing viewers and layout
 */
export default function SiteProjectPage() {
    const {content} = useLanguage();

    const { activeTab, handleNavigation } = useTabState(siteProjectConfig);

    const activeColor = siteProjectConfig.seedColor;
    const surfaceColor = getSurfaceColor(activeColor, true);

    const {markdownContent, isLoading} = useMarkdownLoader(activeTab, siteProjectConfig);

    usePageMetadata({
        title: `${siteProjectConfig.appName} - ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`,
        themeColor: surfaceColor,
        favicon: "https://github.com/fertwbr.png"
    });

    useEffect(() => {
        applyMaterialTheme(activeColor, true);
    }, [activeColor]);

    const t = {
        nav: {
            overview: "Docs",
            changelog: "Changelog",
            back: "Back to Portfolio"
        },
        footer: {
            links: "Documentation",
            rights: "Portfolio Source Code"
        },
        changelog: content.pixel_pulse.changelog,
        overview_page: {
            title: "Technical Overview",
            subtitle: "How this portfolio was built.",
            toc_title: "On this page",
            github_btn: "View Source"
        }
    };

    const navbarConfig = {
        ...siteProjectConfig,
        defaultPage: 'overview',
        enableDocs: true,
        materialIcon: "code"
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50vh'
                }}>
                    <LoadingSpinner size={64}/>
                </div>
            );
        }

        if (!markdownContent) return <div style={{height: '60vh'}}></div>;

        const commonProps = {
            markdownContent,
            appConfig: siteProjectConfig,
            strings: t,
            onNavigate: handleNavigation
        };

        switch (activeTab) {
            case 'changelog':
                return <ChangelogViewer {...commonProps} />;
            case 'overview':
                return <OverviewViewer {...commonProps} />;
            default:
                return <OverviewViewer {...commonProps} />;
        }
    };

    return (
        <div className="page-wrapper">
            <PageBackground/>

            <AppNavbar
                config={navbarConfig}
                activePage={activeTab}
                onNavigate={handleNavigation}
                strings={t.nav}
            />

            <main className="page-content-wrapper">
                <AnimatePresence mode="wait">
                    <PageTransition key={activeTab}>
                        <div className="page-content-padding" style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            maxWidth: '1600px',
                            margin: '0 auto',
                            paddingLeft: '16px',
                            paddingRight: '16px'
                        }}>
                            {renderContent()}
                        </div>
                    </PageTransition>
                </AnimatePresence>
            </main>

            <AppFooter strings={t} onNavigate={handleNavigation} activePage={activeTab} isPortfolio={true}/>
        </div>
    );
}