import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { getSurfaceColor } from '../theme/themeUtils';
import { useLanguage } from '../context/LanguageContext';
import { config } from '../config';

import AppNavbar from '../components/layout/AppNavbar';
import Footer from '../components/layout/Footer';
import PageBackground from '../components/layout/PageBackground';
import PageTransition from '../components/layout/PageTransition';

const SITE_MAP = [
  // --- Pixel Pulse ---
  { keywords: ['pixelpulse/changelog', 'pulse/changelog'], path: '/pixelpulse?page=changelog', name: 'Pixel Pulse Updates' },
  { keywords: ['pixelpulse/privacy', 'pulse/privacy'], path: '/pixelpulse?page=privacy', name: 'Pixel Pulse Privacy' },
  { keywords: ['pixelpulse/help', 'pulse/help'], path: '/pixelpulse?page=help', name: 'Pulse Help Center' },
  { keywords: ['pulse', 'sound', 'meter', 'decibel'], path: '/pixelpulse', name: 'Pixel Pulse' },

  // --- Pixel Compass ---
  { keywords: ['pixelcompass/changelog', 'compass/changelog'], path: '/pixelcompass?page=changelog', name: 'Compass Updates' },
  { keywords: ['compass', 'gps', 'north', 'sensor'], path: '/pixelcompass', name: 'Pixel Compass' },

  // --- Portfolio Site ---
  { keywords: ['site/changelog', 'portfolio/update'], path: '/site?page=changelog', name: 'Portfolio Changelog' },
  { keywords: ['site/overview', 'site/docs', 'architecture'], path: '/site?page=overview', name: 'Technical Overview' },
  { keywords: ['site'], path: '/site?page=overview', name: 'Portfolio Docs' },

  // --- Fallbacks ---
  { keywords: ['privacy', 'policy', 'legal'], path: '/pixelpulse?page=privacy', name: 'Privacy Policy' },
  { keywords: ['help', 'faq', 'support'], path: '/pixelpulse?page=help', name: 'Help Center' },
  { keywords: ['change', 'log', 'update', 'version'], path: '/pixelpulse?page=changelog', name: 'Version History' },
  { keywords: ['plus', 'pro', 'buy'], path: '/pixelpulse?page=plus', name: 'Pixel Pulse+' },
  { keywords: ['about', 'fernando', 'contact', 'mail'], path: '/', name: 'Portfolio Home' }
];

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const { content } = useLanguage();
  const [suggestion, setSuggestion] = useState(null);

  const t = content.not_found || {};
  const tFooter = content.footer || {};

  const surfaceColor = getSurfaceColor(config.seedColor, true);

  usePageMetadata({
    title: `404 - ${t.page_title || "Not Found"}`,
    themeColor: surfaceColor,
    favicon: "https://github.com/fertwbr.png"
  });

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const found = SITE_MAP.find(item =>
        item.keywords.some(keyword => path.includes(keyword))
    );
    if (found) setSuggestion(found);
  }, [location]);

  const errorNavbarConfig = {
    appName: t.page_title || "Error",
    materialIcon: "broken_image"
  };

  return (
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <PageBackground />

        <AppNavbar
            config={errorNavbarConfig}
            activePage="404"
            onNavigate={() => navigate('/')}
            strings={{}}
        />

        <PageTransition className="flex-grow-1" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <main style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '120px 20px 60px 20px',
            textAlign: 'center',
            width: '100%',
            flexDirection: 'column'
          }}>
            <div style={{ maxWidth: '600px', width: '100%' }}>
              <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring" }}
                  style={{ marginBottom: '24px' }}
              >
              <span className="material-symbols-outlined" style={{
                fontSize: '80px',
                color: 'var(--md-sys-color-error)',
                background: 'var(--md-sys-color-error-container)',
                padding: '24px',
                borderRadius: '32px'
              }}>
                broken_image
              </span>
              </motion.div>

              <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1, marginBottom: '16px' }}>
                {t.title || "404"}
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '48px', lineHeight: 1.6 }}>
                {t.message || "Oops! Into the void."} <br />
                <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>
                  {location.pathname}
                </code>
              </p>

              {suggestion && (
                  <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="glass-card"
                      style={{
                        padding: '24px',
                        borderRadius: '24px',
                        border: '1px solid var(--md-sys-color-primary)',
                        background: 'rgba(var(--md-sys-color-primary-rgb), 0.05)',
                        marginBottom: '40px',
                        textAlign: 'left'
                      }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '50%',
                        background: 'var(--md-sys-color-primary-container)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0
                      }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-on-primary-container)', fontSize: '24px' }}>
                      auto_awesome
                    </span>
                      </div>

                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700 }}>{t.suggestion_title}</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.4 }}>
                          {t.suggestion_desc} <strong style={{ color: 'var(--md-sys-color-primary)' }}>{suggestion.name}</strong>.
                        </p>
                      </div>

                      <Link
                          to={suggestion.path}
                          className="btn-glow"
                          style={{ fontSize: '0.9rem', padding: '12px 24px', whiteSpace: 'nowrap', flexGrow: 1, textAlign: 'center' }}
                      >
                        {t.suggestion_btn}
                      </Link>
                    </div>
                  </motion.div>
              )}

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="material-symbols-outlined">home</span>
                  {t.home_btn}
                </Link>
                <Link to="/pixelpulse" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="material-symbols-outlined">graphic_eq</span>
                  Pixel Pulse
                </Link>
              </div>

            </div>
          </main>
        </PageTransition>

        <Footer t={tFooter} />
      </div>
  );
}