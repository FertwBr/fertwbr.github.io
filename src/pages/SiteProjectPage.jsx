import React, {useEffect, useState} from 'react';
import {AnimatePresence} from 'framer-motion';
import GeometricSpinner from '../components/common/GeometricSpinner.jsx';
import ErrorDisplay from '../components/common/ErrorDisplay';
import {useLanguage} from '../context/LanguageContext';
import {applyMaterialTheme, getSeedColor, getSurfaceColor} from '../theme/themeUtils';
import {usePageMetadata} from '../hooks/usePageMetadata';
import {useMarkdownLoader} from '../hooks/useMarkdownLoader';
import {siteProjectConfig} from '../config';
import {useTabState} from '../hooks/useTabState';
import {SiteConfig} from '../utils/siteConstants';

import AppNavbar from '../components/layout/AppNavbar';
import AppFooter from '../components/layout/AppFooter';
import PageBackground from '../components/layout/PageBackground';
import PageTransition from '../components/layout/PageTransition';
import ChangelogViewer from '../components/viewers/ChangelogViewer';
import OverviewViewer from '../components/viewers/OverviewViewer';
import HashScrollHandler from '../components/common/HashScrollHandler';

/**
 * SiteProjectPage React component.
 *
 * Renders documentation pages for the site project using layout components
 * and dynamic theming. Loads Markdown content for the currently active tab
 * and displays a spinner, an error display, or the appropriate viewer
 * (overview or changelog).
 *
 * Side effects:
 * - Applies a Material theme based on a generated seed color.
 * - Updates page metadata (title, theme color, favicon).
 *
 * Hooks used:
 * - useLanguage, useTabState, useMarkdownLoader, usePageMetadata.
 *
 * Returns:
 * - JSX layout including AppNavbar, PageBackground, page content and AppFooter.
 */
export default function SiteProjectPage({ forcedTab }) {
    const {content} = useLanguage();

    const configWithRoute = {
        ...siteProjectConfig,
        routeBasePath: '',
        defaultPage: forcedTab || siteProjectConfig.defaultPage
    };

    const { activeTab, handleNavigation } = useTabState(configWithRoute);

    const [activeColor] = useState(() => getSeedColor());
    const surfaceColor = getSurfaceColor(activeColor, true);

    const {markdownContent, isLoading, error} = useMarkdownLoader(activeTab, siteProjectConfig);

    usePageMetadata({
        title: `${siteProjectConfig.appName} - ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`,
        themeColor: surfaceColor,
        favicon: SiteConfig.assets.avatar
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
        changelog: content.changelog,
        overview_page: content.overview_page || {}
    };

    const navbarConfig = {
        ...siteProjectConfig,
        defaultPage: 'overview',
        enableDocs: true,
        materialIcon: "code"
    };

    const renderContent = () => {
        if (isLoading) return <GeometricSpinner />;
        if (error) return <ErrorDisplay error={error} onRetry={() => window.location.reload()} />;
        if (!markdownContent) return <div style={{height: '60vh', flex: 1}}></div>;

        const commonProps = {
            markdownContent,
            appConfig: siteProjectConfig,
            strings: t,
            onNavigate: handleNavigation
        };

        switch (activeTab) {
            case 'changelog': return <ChangelogViewer {...commonProps} />;
            case 'overview': return <OverviewViewer {...commonProps} />;
            default: return <OverviewViewer {...commonProps} />;
        }
    };

    return (
        <div className="page-wrapper">
            <HashScrollHandler />

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