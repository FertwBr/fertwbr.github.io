import React, {useEffect, useState} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useLocation} from 'react-router-dom';
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
import AppLayout from '../components/layout/AppLayout.jsx';

export default function SiteProjectPage({forcedTab}) {
    const {content} = useLanguage();
    const location = useLocation();

    const forceLoading = new URLSearchParams(location.search).get('testLoading') === 'true';

    const configWithRoute = {
        ...siteProjectConfig,
        routeBasePath: '',
        defaultPage: forcedTab || siteProjectConfig.defaultPage
    };

    const {activeTab, handleNavigation} = useTabState(configWithRoute);

    const [activeColor] = useState(() => getSeedColor());
    const surfaceColor = getSurfaceColor(activeColor);

    const {markdownContent, isLoading, error} = useMarkdownLoader(activeTab, siteProjectConfig);

    usePageMetadata({
        title: `${siteProjectConfig.appName} - ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`,
        description: "Documentation and Changelogs for the Portfolio Website.",
        themeColor: surfaceColor,
        favicon: SiteConfig.assets.avatar,
        type: 'website'
    });

    useEffect(() => {
        applyMaterialTheme(activeColor);
    }, [activeColor]);

    const t = {
        nav: {
            overview: content.site_project?.nav?.overview || content.overview_page?.title || "Docs",
            changelog: content.site_project?.nav?.changelog || content.changelog?.title || "Changelog",
            back: content.site_project?.nav?.back || "Back to Portfolio"
        },
        footer: {
            links: content.site_project?.footer?.links || content.footer?.useful_links || "Documentation",
            rights: content.site_project?.footer?.rights || content.footer?.rights || "Portfolio Source Code"
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
        if (isLoading || forceLoading) return <GeometricSpinner/>;
        if (error) return <ErrorDisplay error={error} onRetry={() => window.location.reload()}/>;
        if (!markdownContent) return <div style={{height: '60vh', flex: 1}}></div>;

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
            default:
                return <OverviewViewer {...commonProps} />;
        }
    };

    return (
        <AppLayout
            background={<><HashScrollHandler/><PageBackground/></>}
            navbar={<AppNavbar config={navbarConfig} activePage={activeTab} onNavigate={handleNavigation}
                               strings={t.nav}/>}
            footer={<AppFooter strings={t} onNavigate={handleNavigation} activePage={activeTab} isPortfolio={true}/>}
        >
            <AnimatePresence mode="wait">
                <PageTransition key={activeTab}>
                    <div className="app-layout-container">
                        {renderContent()}
                    </div>
                </PageTransition>
            </AnimatePresence>
        </AppLayout>
    );
}