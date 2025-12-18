import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { motion, AnimatePresence } from 'framer-motion';

import { loadPageContent } from '../../utils/contentLoader';
import { useLanguage } from '../../context/LanguageContext';
import { applyMaterialTheme } from '../../utils/themeUtils';

import AppNavbar from '../../components/AppNavbar';
import AppFooter from '../../components/AppFooter';
import ChangelogViewer from '../../components/ChangelogViewer';
import { pixelPulseConfig } from './PixelPulseConfig';
import PixelPulseHome from './PixelPulseHome';
import PrivacyViewer from '../../components/PrivacyViewer';

export default function PixelPulsePage() {
  const [activeTab, setActiveTab] = useState(pixelPulseConfig.defaultPage);
  const [markdownContent, setMarkdownContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const { content } = useLanguage();
  const t = content.pixel_pulse;

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
          <span className="material-symbols-outlined spin-anim" style={{ fontSize: '48px' }}>sync</span>
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
            seedColor={pixelPulseConfig.seedColor} 
            strings={t}
        />
      );
    }

    return (
      <div className="glass-card" style={{ padding: '40px' }}>
        <div className="markdown-body">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdownContent}</ReactMarkdown>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      '--md-sys-color-primary': pixelPulseConfig.seedColor,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <div className="bg-fixed"></div>
      <div className="grid-overlay"></div>

      <AppNavbar
        config={pixelPulseConfig}
        activePage={activeTab}
        onNavigate={handleNavigation}
        strings={t.nav}
      />

      <main style={{ flex: 1 }}>
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
                maxWidth: activeTab === 'changelog' ? '1100px' : '800px',
                margin: '0 auto',
                padding: '120px 24px 60px 24px',
                width: '100%'
              }}
            >
              {renderContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AppFooter strings={t} onNavigate={handleNavigation} />
    </div>
  );
}