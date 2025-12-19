import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { motion, AnimatePresence } from 'framer-motion';

import { loadPageContent } from '../../utils/contentLoader';
import { useLanguage } from '../../context/LanguageContext';
import { applyMaterialTheme, getSurfaceColor } from '../../utils/themeUtils';
import { usePageMetadata } from '../../hooks/usePageMetadata';

import AppNavbar from '../../components/AppNavbar';
import AppFooter from '../../components/AppFooter';
import ChangelogViewer from '../../components/ChangelogViewer';
import PrivacyViewer from '../../components/PrivacyViewer';
import HelpViewer from '../../components/HelpViewer';
import RoadmapViewer from '../../components/RoadmapViewer';
import OverviewViewer from '../../components/OverviewViewer';
import PlusViewer from '../../components/PlusViewer';

import { pixelPulseConfig } from './PixelPulseConfig';
import PixelPulseHome from './PixelPulseHome';

export default function PixelPulsePage() {
  const [activeTab, setActiveTab] = useState(pixelPulseConfig.defaultPage);
  const [markdownContent, setMarkdownContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const surfaceColor = getSurfaceColor(pixelPulseConfig.seedColor, true);
  
  const location = useLocation();
  const { content } = useLanguage();
  const t = content.pixel_pulse;

  const getPageTitle = (tab) => {
    const baseTitle = pixelPulseConfig.appName;

    const tabNames = {
      index: 'Home',
      plus: 'Plus',
      changelog: 'Version History',
      roadmap: 'Roadmap',
      privacy: 'Privacy Policy',
      help: 'Help & FAQ',
      overview: 'Overview'
    };

    const subPage = tabNames[tab] || 'Home';
    return `${baseTitle} - ${subPage}`;
  };

usePageMetadata({
    title: getPageTitle(activeTab),
    themeColor: surfaceColor, 
    favicon: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Pulse/art/favicon/favicon.ico"
  });

  useEffect(() => {
    applyMaterialTheme(pixelPulseConfig.seedColor, true); 
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    if (page && pixelPulseConfig.pages[page]) {
      setActiveTab(page);
    } else {
      setActiveTab('index');
    }
  }, [location]);

  useEffect(() => {
    const pageConfig = pixelPulseConfig.pages[activeTab];
    if (pageConfig.type === 'react') return;

    let isMounted = true;
    setIsLoading(true);
    setMarkdownContent(null);

    loadPageContent(activeTab, pixelPulseConfig)
      .then((text) => {
        if (isMounted) {
          setMarkdownContent(text);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, [activeTab]);

  const handleNavigation = (pageId) => {
    setActiveTab(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const newUrl = new URL(window.location);
    newUrl.searchParams.set('page', pageId);
    window.history.pushState({}, '', newUrl);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div style={{ textAlign: 'center', padding: '100px' }}>
          <span className="material-symbols-outlined spin-anim" style={{ fontSize: '48px', color: 'var(--md-sys-color-primary)' }}>sync</span>
        </div>
      );
    }

    if (activeTab === 'changelog') {
      return (
        <ChangelogViewer
          markdownContent={markdownContent}
          seedColor={pixelPulseConfig.seedColor}
          appConfig={pixelPulseConfig}
          strings={t}
          onNavigate={handleNavigation}
        />
      );
    }

    if (activeTab === 'privacy') {
      return (
        <PrivacyViewer
          markdownContent={markdownContent}
          appConfig={pixelPulseConfig}
          seedColor={pixelPulseConfig.seedColor}
          strings={t}
        />
      );
    }

    if (activeTab === 'help') {
      return (
        <HelpViewer
          markdownContent={markdownContent}
          appConfig={pixelPulseConfig}
          seedColor={pixelPulseConfig.seedColor}
          strings={t}
        />
      );
    }

    if (activeTab === 'roadmap') {
      return (
        <RoadmapViewer
          markdownContent={markdownContent}
          seedColor={pixelPulseConfig.seedColor}
          appConfig={pixelPulseConfig}
          strings={t}
        />
      );
    }

    if (activeTab === 'overview') {
      return (
        <OverviewViewer
          markdownContent={markdownContent}
          seedColor={pixelPulseConfig.seedColor}
          appConfig={pixelPulseConfig}
          strings={t}
        />
      );
    }

    if (activeTab === 'plus') {
      return (
        <PlusViewer
          markdownContent={markdownContent}
          appConfig={pixelPulseConfig}
          strings={t}
        />
      );
    }

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px 60px 20px', boxSizing: 'border-box' }}>
        <div className="glass-card" style={{ padding: 'clamp(24px, 5vw, 40px)', borderRadius: '24px' }}>
          <div className="markdown-body">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdownContent}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      <div className="bg-fixed"></div>
      <div className="grid-overlay"></div>

      <AppNavbar
        config={pixelPulseConfig}
        activePage={activeTab}
        onNavigate={handleNavigation}
        strings={t.nav}
      />

      <main style={{ flex: 1, width: '100%', overflowX: 'hidden' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'index' ? (
            <PixelPulseHome key="home" onNavigate={handleNavigation} strings={t} />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                maxWidth: ['changelog', 'privacy', 'help', 'roadmap', 'overview'].includes(activeTab) ? '1600px' : '100%',
                margin: '0 auto',
                padding: 'clamp(100px, 15vh, 140px) 20px 0 20px',
                width: '100%',
                height: 'auto',
                boxSizing: 'border-box'
              }}
            >
              {renderContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AppFooter strings={t} onNavigate={handleNavigation} activePage={activeTab} />
    </div>
  );
}