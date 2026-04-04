import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {geminiExpressiveConfig} from './GeminiExpressiveConfig';
import GeminiExpressiveHome from './GeminiExpressiveHome';
import AppLayout from '../../components/layout/AppLayout';
import ToolsPageBackground from '../../components/layout/ToolsPageBackground';
import OverviewViewer from '../../components/viewers/OverviewViewer';
import ChangelogViewer from '../../components/viewers/ChangelogViewer';
import PrivacyViewer from '../../components/viewers/PrivacyViewer';
import TermsViewer from '../../components/viewers/TermsViewer';
import HelpViewer from '../../components/viewers/HelpViewer';
import {useLanguage} from '../../context/LanguageContext';

export default function GeminiExpressivePage({forcedTab}) {
    const {pageId} = useParams();
    const navigate = useNavigate();
    const {content} = useLanguage();
    const [currentTab, setCurrentTab] = useState('index');

    const localizedStrings = content?.gemini_expressive || {};

    useEffect(() => {
        if (forcedTab) {
            setCurrentTab(forcedTab);
        } else if (pageId && geminiExpressiveConfig.pages[pageId]) {
            setCurrentTab(pageId);
        } else {
            setCurrentTab('index');
        }
    }, [pageId, forcedTab]);

    const handleNavigate = (path) => {
        if (path === 'index') {
            navigate('/geminiexpressive');
        } else {
            navigate(`/geminiexpressive/${path}`);
        }
    };

    const renderContent = () => {
        const pageConfig = geminiExpressiveConfig.pages[currentTab];

        if (currentTab === 'index') {
            return <GeminiExpressiveHome onNavigate={handleNavigate} strings={localizedStrings} />;
        }

        if (!pageConfig) return null;

        switch (currentTab) {
            case 'changelog':
                return <ChangelogViewer appConfig={geminiExpressiveConfig} pageConfig={pageConfig} />;
            case 'overview':
                return <OverviewViewer appConfig={geminiExpressiveConfig} pageConfig={pageConfig} />;
            case 'privacy':
                return <PrivacyViewer appConfig={geminiExpressiveConfig} pageConfig={pageConfig} />;
            case 'terms':
                return <TermsViewer appConfig={geminiExpressiveConfig} pageConfig={pageConfig} />;
            case 'help':
                return <HelpViewer appConfig={geminiExpressiveConfig} pageConfig={pageConfig} />;
            default:
                return null;
        }
    };

    return (
        <AppLayout
            background={<ToolsPageBackground opacity={currentTab === 'index' ? 1 : 0.4} />}
            appConfig={geminiExpressiveConfig}
            currentTab={currentTab}
            onNavigate={handleNavigate}
        >
            {renderContent()}
        </AppLayout>
    );
}