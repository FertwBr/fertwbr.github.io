import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { motion, AnimatePresence } from 'framer-motion';

import { loadPageContent } from '../../utils/contentLoader';
import { useLanguage } from '../../context/LanguageContext';
import { applyMaterialTheme } from '../../utils/themeUtils';

import AppLayout from '../../components/AppLayout';
import { pixelPulseConfig } from './PixelPulseConfig';
import PixelPulseHome from './PixelPulseHome';

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

  return (
    <div style={{ '--md-sys-color-primary': pixelPulseConfig.seedColor }}>
      <div className="bg-fixed"></div>
      <div className="grid-overlay"></div>

      <AppLayout 
        config={pixelPulseConfig}
        activePage={activeTab}
        onNavigate={handleNavigation}
        strings={t}
      >
        <AnimatePresence mode="wait">
          {activeTab === 'index' ? (
             <PixelPulseHome key="home" onNavigate={handleNavigation} strings={t} />
          ) : (
            <motion.div 
              key="md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', width: '100%' }}
            >
               {isLoading ? (
                 <div style={{ textAlign: 'center', padding: '100px' }}>
                   <span className="material-symbols-outlined spin-anim" style={{ fontSize: '48px'}}>sync</span>
                 </div>
               ) : (
                 <div className="glass-card" style={{ padding: '40px', marginTop: '20px' }}>
                    <div className="markdown-body">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdownContent}</ReactMarkdown>
                    </div>
                 </div>
               )}
            </motion.div>
          )}
        </AnimatePresence>
      </AppLayout>
    </div>
  );
}