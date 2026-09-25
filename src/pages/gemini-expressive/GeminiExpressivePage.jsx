import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { geminiExpressiveConfig } from './GeminiExpressiveConfig';
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
import Spinner from '../../components/common/Spinner.jsx';
import ErrorDisplay from '../../components/common/ErrorDisplay';
import PageTransition from '../../components/layout/PageTransition';
import { useLanguage } from '../../context/LanguageContext';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { useMarkdownLoader } from '../../hooks/useMarkdownLoader';

/**
 * @param {Object} props
 * @param {string} [props.forcedTab]
 * @returns {JSX.Element}
 */
export default function GeminiExpressivePage({ forcedTab }) {
    const { pageId } = useParams();
    const navigate = useNavigate();
    const { content } = useLanguage();
    const [currentTab, setCurrentTab] = useState('index');

    const localizedStrings = content?.gemini_expressive || {};
    const combinedStrings = { ...content, ...localizedStrings };

    useEffect(() => {
        if (forcedTab) {
            setCurrentTab(forcedTab);
        } else if (pageId && geminiExpressiveConfig.pages[pageId]) {
            setCurrentTab(pageId);
        } else {
            setCurrentTab('index');
        }
    }, [pageId, forcedTab]);

    const { markdownContent, isLoading, error } = useMarkdownLoader(currentTab, geminiExpressiveConfig);

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
            background={<ToolsPageBackground opacity={currentTab === 'index' ? 1 : 0.4} />}
            navbar={<AppNavbar config={geminiExpressiveConfig} activePage={currentTab} onNavigate={handleNavigate} strings={navStrings} />}
            footer={<AppFooter strings={footerStrings} onNavigate={handleNavigate} activePage={currentTab} config={geminiExpressiveConfig} />}
        >
            <AnimatePresence mode="wait">
                <PageTransition key={currentTab}>
                    {currentTab === 'index' ? (
                        <GeminiExpressiveHome onNavigate={handleNavigate} strings={localizedStrings} />
                    ) : (
                        <div className="app-layout-container">
                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <motion.div key="spinner" className="fade-transition-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                                        <Spinner />
                                    </motion.div>
                                ) : error ? (
                                    <motion.div key="error" className="fade-transition-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                                        <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
                                    </motion.div>
                                ) : !markdownContent ? (
                                    <motion.div key="empty" className="markdown-placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
                                ) : (
                                    <motion.div key="content" className="fade-transition-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                                        {renderContent()}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </PageTransition>
            </AnimatePresence>
        </AppLayout>
    );
}