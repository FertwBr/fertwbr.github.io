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

  const location = useLocation();
  const { content } = useLanguage();
  const t = content.pixel_pulse;

  const params = new URLSearchParams(location.search);
  const urlColorParam = params.get('color');

  const effectiveSeedColor = urlColorParam ? `#${urlColorParam}` : pixelPulseConfig.seedColor;

  const surfaceColor = getSurfaceColor(effectiveSeedColor, true);

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
    applyMaterialTheme(effectiveSeedColor, true);
  }, [effectiveSeedColor]);

  useEffect(() => {
    const page = params.get('page');
    if (page && pixelPulseConfig.pages[page]) {
      setActiveTab(page);
    } else {
      if (!page) setActiveTab('index');
    }
  }, [location.search]);

  useEffect(() => {
    const pageConfig = pixelPulseConfig.pages[activeTab];

    if (pageConfig.type === 'react') {
      setMarkdownContent(null);
      return;
    }

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

  useEffect(() => {
    if (location.hash && !isLoading && markdownContent) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [location.hash, isLoading, markdownContent]);

  const handleNavigation = (pageId) => {
    setActiveTab(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const newUrl = new URL(window.location);
    newUrl.searchParams.set('page', pageId);

    if (urlColorParam) {
      newUrl.searchParams.set('color', urlColorParam);
    }

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

    const commonProps = {
      markdownContent,
      appConfig: pixelPulseConfig,
      seedColor: effectiveSeedColor,
      strings: t,
      onNavigate: handleNavigation
    };

    switch (activeTab) {
      case 'changelog': return <ChangelogViewer {...commonProps} />;
      case 'privacy': return <PrivacyViewer {...commonProps} />;
      case 'help': return <HelpViewer {...commonProps} />;
      case 'roadmap': return <RoadmapViewer {...commonProps} />;
      case 'overview': return <OverviewViewer {...commonProps} />;
      case 'plus': return <PlusViewer {...commonProps} />;
      default: return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px 60px 20px', boxSizing: 'border-box' }}>
          <div className="glass-card" style={{ padding: 'clamp(24px, 5vw, 40px)', borderRadius: '24px' }}>
            <div className="markdown-body">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdownContent}</ReactMarkdown>
            </div>
          </div>
        </div>
      );
    }
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