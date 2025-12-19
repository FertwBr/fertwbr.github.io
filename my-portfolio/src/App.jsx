import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { setupTheme, getSurfaceColor } from './utils/themeUtils';
import { usePageMetadata } from './hooks/usePageMetadata';
import { config } from './config';

import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import GitHubStats from './components/GitHubStats';
import Footer from './components/Footer';

import PixelPulsePage from './pages/pixel-pulse/PixelPulsePage'; 
import RedirectToStore from './pages/RedirectToStore';

function PortfolioHome() {
  const { content } = useLanguage();

  const surfaceColor = getSurfaceColor(config.seedColor, true);

  usePageMetadata({
    title: "Fernando Vaz | Software Engineer",
    themeColor: surfaceColor,
    favicon: "https://github.com/fertwbr.png"
  });

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
      <div className="bg-fixed"></div>
      <div className="grid-overlay"></div>

      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, 
        padding: '20px 24px', display: 'flex', justifyContent: 'center',
        background: 'transparent', pointerEvents: 'none'
      }}>
        <div style={{ 
          backdropFilter: 'blur(10px)', 
          background: 'rgba(var(--md-sys-color-surface-container-rgb), 0.6)',
          padding: '12px 24px',
          borderRadius: '100px',
          border: '1px solid rgba(255,255,255,0.1)',
          pointerEvents: 'auto',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
           <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.5px' }}>FV.</span>
        </div>
      </nav>

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
            <a href="https://linkedin.com/in/fernando-bela" target="_blank" className="btn-outline">{content.contact.linkedin}</a>
          </div>
        </section>

        <Footer t={content.footer} />
      </main>
    </div>
  );
}

function AppContent() {
  useEffect(() => {
    setupTheme();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<PortfolioHome />} />

      <Route path="/pixelpulse" element={<PixelPulsePage />} />
      <Route path="/PixelPulse" element={<PixelPulsePage />} />

      <Route path="/pixelpulse/open" element={<RedirectToStore type="open" appKey="pixelpulse" />} />
      <Route path="/pixelpulse/open/buy" element={<RedirectToStore type="buy" appKey="pixelpulse" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </BrowserRouter>
  );
}