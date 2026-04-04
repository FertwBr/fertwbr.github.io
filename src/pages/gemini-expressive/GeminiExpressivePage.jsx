import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';
import {geminiExpressiveConfig} from './GeminiExpressiveConfig';
import GeminiExpressiveHome from './GeminiExpressiveHome';
import AppLayout from '../../components/layout/AppLayout';
import AppNavbar from '../../components/layout/AppNavbar';
import AppFooter from '../../components/layout/AppFooter';
import ToolsPageBackground from '../../components/layout/ToolsPageBackground';
import OverviewViewer from '../../components/viewers/OverviewViewer';
import ChangelogViewer from '../../components/viewers/ChangelogViewer';
import PrivacyViewer from '../../components/viewers/PrivacyViewer';
import TermsViewer from '../../components/viewers/TermsViewer';
import HelpViewer from '../../components/viewers/HelpViewer';
import GeometricSpinner from '../../components/common/GeometricSpinner';
import ErrorDisplay from '../../components/common/ErrorDisplay';
import PageTransition from '../../components/layout/PageTransition';
import {useLanguage} from '../../context/LanguageContext';
import {usePageMetadata} from '../../hooks/usePageMetadata';
import {useMarkdownLoader} from '../../hooks/useMarkdownLoader';

/**
 * Main container page for Gemini Expressive.
 * Handles tab navigation, metadata injection, and component rendering.
 *
 * @param {Object} props
 * @param {string} [props.forcedTab]
 * @returns {JSX.Element}
 */
export default function GeminiExpressivePage({forcedTab}) {
    const {pageId} = useParams();
    const navigate = useNavigate();
    const {content} = useLanguage();
    const [currentTab, setCurrentTab] = useState('index');

    const localizedStrings = content?.gemini_expressive || {};
    const combinedStrings = {...content, ...localizedStrings};

    useEffect(() => {
        if (forcedTab) {
            setCurrentTab(forcedTab);
        } else if (pageId && geminiExpressiveConfig.pages[pageId]) {
            setCurrentTab(pageId);
        } else {
            setCurrentTab('index');
        }
    }, [pageId, forcedTab]);

    const {markdownContent, isLoading, error} = useMarkdownLoader(currentTab, geminiExpressiveConfig);

    const pageConfig = geminiExpressiveConfig.pages[currentTab];
    const pageTitle = pageConfig?.title && currentTab !== 'index'
        ? `${geminiExpressiveConfig.appName} - ${pageConfig.title}`
        : geminiExpressiveConfig.appName;

    usePageMetadata({
        title: pageTitle,
        description: localizedStrings?.hero_subtitle || "Enhance your Gemini web UI with persistent timeline navigation, intelligent code collapsing, and dynamic Material You theming.",
        themeColor: geminiExpressiveConfig.seedColor,
        favicon: geminiExpressiveConfig.appIcon,
        type: 'extension',
        product: {
            appName: geminiExpressiveConfig.appName
        }
    });

    /**
     * @param {string} path
     */
    const handleNavigate = (path) => {
        if (path === 'index') {
            navigate('/geminiexpressive');
        } else {
            navigate(`/geminiexpressive/${path}`);
        }
    };

    /**
     * @returns {JSX.Element|null}
     */
    const renderContent = () => {
        if (currentTab === 'index') {
            return <GeminiExpressiveHome onNavigate={handleNavigate} strings={localizedStrings}/>;
        }

        if (isLoading) return <GeometricSpinner/>;
        if (error) return <ErrorDisplay error={error} onRetry={() => window.location.reload()}/>;
        if (!markdownContent) return <div className="markdown-placeholder"></div>;

        const commonProps = {
            markdownContent,
            appConfig: geminiExpressiveConfig,
            pageConfig,
            strings: combinedStrings,
            onNavigate: handleNavigate
        };

        switch (currentTab) {
            case 'changelog':
                return <ChangelogViewer {...commonProps} />;
            case 'overview':
                return <OverviewViewer {...commonProps} />;
            case 'privacy':
                return <PrivacyViewer {...commonProps} />;
            case 'terms':
                return <TermsViewer {...commonProps} />;
            case 'help':
                return <HelpViewer {...commonProps} />;
            default:
                return null;
        }
    };

    const navStrings = combinedStrings.nav || {
        overview: combinedStrings.overview_page?.title || 'Overview',
        changelog: combinedStrings.changelog?.title || 'Changelog',
        roadmap: combinedStrings.roadmap_page?.title || 'Roadmap',
        privacy: combinedStrings.privacy_page?.page_title || 'Privacy Policy',
        terms: combinedStrings.terms_page?.page_title || 'Terms of Use',
        help: combinedStrings.help_page?.page_title || 'Help & FAQ'
    };

    const footerStrings = {
        ...combinedStrings,
        footer: combinedStrings.footer,
        nav: navStrings
    };

    return (
        <AppLayout
            hasRightSidebarPortal={currentTab !== 'index'}
            background={<ToolsPageBackground opacity={currentTab === 'index' ? 1 : 0.4}/>}
            navbar={<AppNavbar config={geminiExpressiveConfig} activePage={currentTab} onNavigate={handleNavigate}
                               strings={navStrings}/>}
            footer={<AppFooter strings={footerStrings} onNavigate={handleNavigate} activePage={currentTab}/>}
        >
            <AnimatePresence mode="wait">
                <PageTransition key={currentTab}>
                    {currentTab === 'index' ? (
                        renderContent()
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