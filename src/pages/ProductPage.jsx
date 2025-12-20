import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../components/common/LoadingSpinner';

import { useLanguage } from '../context/LanguageContext';
import { applyMaterialTheme, getSurfaceColor } from '../utils/themeUtils';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useMarkdownLoader } from '../hooks/useMarkdownLoader';

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

export default function ProductPage({ config, HomeComponent, translationKey }) {
  const location = useLocation();
  const { content } = useLanguage();
  const t = content[translationKey];

  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('page') && config.pages[params.get('page')]
      ? params.get('page')
      : config.defaultPage;
  });

  const [activeColor, setActiveColor] = useState(() => {
    const params = new URLSearchParams(location.search);
    const colorParam = params.get('color');
    return colorParam ? `#${colorParam.replace('#', '')}` : config.seedColor;
  });

  const { markdownContent, isLoading } = useMarkdownLoader(activeTab, config);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('page') || params.has('color') || location.hash) {
      const targetHash = location.hash;
      window.history.replaceState({}, '', window.location.pathname);

      if (targetHash) {
        setTimeout(() => {
          const id = targetHash.replace('#', '');
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      }
    }
  }, []);

  const surfaceColor = getSurfaceColor(activeColor, true);

  usePageMetadata({
    title: `${config.appName} - ${activeTab === 'index' ? 'Home' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`,
    themeColor: surfaceColor,
    favicon: config.faviconUrl || `https://raw.githubusercontent.com/FertwBr/PixelAssets/main/${config.appName === 'Pixel Pulse' ? 'Pulse' : 'Compass'}/art/favicon/favicon.ico`
  });

  useEffect(() => {
    applyMaterialTheme(activeColor, true);
  }, [activeColor]);

  useEffect(() => {
    if (location.hash && !isLoading && markdownContent) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.replaceState({}, '', window.location.pathname);
        }
      }, 300);
    }
  }, [location.hash, isLoading, markdownContent]);

  const handleNavigation = (pageId) => {
    setActiveTab(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LoadingSpinner size={64} />
        </div>
      );
    }
    if (!markdownContent && activeTab !== 'index') {
      return <div style={{ height: '60vh' }}></div>;
    }

    const commonProps = {
      markdownContent,
      appConfig: config,
      seedColor: activeColor,
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
      width: '100%',
      position: 'relative'
    }}>
      <PageBackground />

      <AppNavbar
        config={config}
        activePage={activeTab}
        onNavigate={handleNavigation}
        strings={t.nav}
      />

      <main style={{
        flex: 1,
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <AnimatePresence mode="wait">
          <PageTransition key={activeTab}>
            <div style={{
              maxWidth: ['changelog', 'privacy', 'help', 'roadmap', 'overview'].includes(activeTab) ? '1600px' : '100%',
              margin: '0 auto',
              padding: 'clamp(80px, 12vh, 120px) 16px 0 16px',
              width: '100%',
              boxSizing: 'border-box',
              flex: 1
            }}>
              {activeTab === 'index' ? (
                <HomeComponent onNavigate={handleNavigation} strings={t} />
              ) : renderContent()}
            </div>
          </PageTransition>
        </AnimatePresence>
      </main>

      <AppFooter strings={t} onNavigate={handleNavigation} activePage={activeTab} />
    </div>
  );
}