import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';

import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { applyMaterialTheme, getSurfaceColor } from './utils/themeUtils';
import { usePageMetadata } from './hooks/usePageMetadata';
import { config } from './config';

import ErrorBoundary from './components/common/ErrorBoundary';
import OfflineNotice from './components/common/OfflineNotice';
import Footer from './components/layout/Footer';
import PageBackground from './components/layout/PageBackground'; // 

import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import TechStack from './components/sections/TechStack';
import GitHubStats from './components/sections/GitHubStats';

import NotFound from './pages/NotFound';
import PixelCompassPage from './pages/pixel-compass/PixelCompassPage';
import PixelPulsePage from './pages/pixel-pulse/PixelPulsePage';
import RedirectToStore from './pages/RedirectToStore';

import PageTransition from './components/layout/PageTransition';

function PortfolioHome() {
  const { content } = useLanguage();
  const location = useLocation();

  const [activeColor, setActiveColor] = useState(() => {
    const params = new URLSearchParams(location.search);
    const colorParam = params.get('color');
    return colorParam ? `#${colorParam.replace('#', '')}` : config.seedColor;
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('color')) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const surfaceColor = getSurfaceColor(activeColor, true);

  useEffect(() => {
    applyMaterialTheme(activeColor, true);
  }, [activeColor]);

  usePageMetadata({
    title: "Fernando Vaz | Software Engineer",
    themeColor: surfaceColor,
    favicon: "https://github.com/fertwbr.png"
  });

  return (
    <PageTransition>
      <PageBackground />

      <main>
        <Hero t={content.hero} />
        <About t={content.about} />
        <Projects t={content.projects} />
        <TechStack t={content.tech} />
        <GitHubStats t={content.github} />

        <section style={{ textAlign: 'center', padding: '100px 24px', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '32px' }}>{content.contact.title}</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '48px' }}>
            {content.contact.desc}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:fertwbr@gmail.com" className="btn-glow">{content.contact.email}</a>
            <a href="https://linkedin.com/in/fernando-bela" target="_blank" rel="noreferrer" className="btn-outline">{content.contact.linkedin}</a>
          </div>
        </section>

        <Footer t={content.footer} />
      </main>
    </PageTransition>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PortfolioHome />} />

        <Route path="/pixelpulse" element={<PixelPulsePage />} />
        <Route path="/PixelPulse" element={<PixelPulsePage />} />
        <Route path="/pixelpulse/open" element={<RedirectToStore type="open" appKey="pixelpulse" />} />
        <Route path="/pixelpulse/open/buy" element={<RedirectToStore type="buy" appKey="pixelpulse" />} />

        <Route path="/pixelcompass" element={<PixelCompassPage />} />
        <Route path="/PixelCompass" element={<PixelCompassPage />} />
        <Route path="/pixelcompass/open" element={<RedirectToStore type="open" appKey="pixelcompass" />} />
        <Route path="/pixelcompass/open/buy" element={<RedirectToStore type="buy" appKey="pixelcompass" />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <LanguageProvider>
          <OfflineNotice />
          <AnimatedRoutes />
        </LanguageProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}