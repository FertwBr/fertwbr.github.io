import React, { useState, useRef, useEffect } from 'react';
import { getThemeOptions, setThemeColor } from '../../utils/themeUtils';
import { useLanguage } from '../../context/LanguageContext';

const LANGUAGE_LABELS = {
  en: "English",
  pt: "Português",
  de: "Deutsch",
  ja: "日本語",
  hi: "हिन्दी",
  es: "Español"
};

export default function AppFooter({ strings, onNavigate, activePage }) {
  const { changeLanguage, language, availableLanguages, content } = useLanguage();
  const themes = getThemeOptions();
  
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);

  const t = strings?.pixel_pulse || strings || {};
  const f = content?.footer || {};

  const usefulLinks = [
    { key: 'changelog', icon: 'update' },
    { key: 'roadmap', icon: 'map' },
    { key: 'privacy', icon: 'security' },
    { key: 'help', icon: 'help_center' },
    { key: 'overview', icon: 'description' }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <footer style={{
      background: 'var(--md-sys-color-surface-container)',
      padding: 'clamp(40px, 8vw, 80px) 24px 40px 24px',
      borderTop: '1px solid var(--md-sys-color-outline-variant)',
      marginTop: 'auto',
      position: 'relative',
      zIndex: 10,
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>

        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'start'
        }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{
              fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px',
              color: 'var(--md-sys-color-on-surface-variant)', fontWeight: 700
            }}>
              {t?.footer?.links || f?.useful_links || "Navigation"}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {usefulLinks.map(link => {
                const isSelected = activePage === link.key;
                return (
                  <button
                    key={link.key}
                    onClick={() => onNavigate(link.key)}
                    style={{
                      borderRadius: '8px', padding: '8px 16px',
                      border: isSelected ? '1px solid var(--md-sys-color-primary)' : '1px solid transparent',
                      background: isSelected ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface-container-high)',
                      color: isSelected ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)',
                      fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px',
                      cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s ease'
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{link.icon}</span>
                    {t?.nav?.[link.key] || link.key}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{
              fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px',
              color: 'var(--md-sys-color-on-surface-variant)', fontWeight: 700
            }}>
              {f?.appearance?.title || "Appearance"}
            </h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {themes.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => setThemeColor(theme.value)}
                  title={theme.name}
                  style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    border: '2px solid var(--md-sys-color-outline-variant)',
                    background: `linear-gradient(135deg, ${theme.palette.primary} 50%, ${theme.palette.secondary} 50%)`,
                    cursor: 'pointer', transition: 'transform 0.2s',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              ))}
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: '1px', background: 'var(--md-sys-color-outline-variant)', opacity: 0.3 }}></div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <p style={{ color: 'var(--md-sys-color-on-surface)', fontSize: '0.9rem', margin: 0, fontWeight: 500 }}>
             {t?.footer?.rights || "All rights reserved."}
            </p>
            <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.8rem', margin: 0 }}>
              &copy; {new Date().getFullYear()} Fernando Vaz
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <a href="https://github.com/fertwbr" target="_blank" rel="noreferrer" style={{ color: 'var(--md-sys-color-on-surface-variant)', opacity: 0.8 }}>
              <span className="material-symbols-outlined">code</span>
            </a>
            <a href="mailto:fertwbr@gmail.com" style={{ color: 'var(--md-sys-color-on-surface-variant)', opacity: 0.8 }}>
              <span className="material-symbols-outlined">mail</span>
            </a>

            <div style={{ width: '1px', height: '24px', background: 'var(--md-sys-color-outline-variant)' }}></div>

            <div style={{ position: 'relative' }} ref={langMenuRef}>
              <button
                 onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                 style={{
                   background: 'var(--md-sys-color-secondary-container)',
                   color: 'var(--md-sys-color-on-secondary-container)',
                   padding: '8px 20px',
                   borderRadius: '100px',
                   display: 'flex', alignItems: 'center', gap: '8px',
                   fontSize: '0.85rem', fontWeight: 600,
                   border: 'none', cursor: 'pointer'
                 }}
              >
                 <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>translate</span>
                 {LANGUAGE_LABELS[language] || language.toUpperCase()}
                 <span className="material-symbols-outlined" style={{ 
                   fontSize: '18px',
                   transform: isLangMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                   transition: 'transform 0.2s'
                 }}>expand_less</span>
              </button>
              
               {isLangMenuOpen && (
                <div style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 8px)',
                  right: 0,
                  background: 'var(--md-sys-color-surface-container-high)',
                  borderRadius: '16px',
                  padding: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: '160px',
                  zIndex: 50,
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  overflow: 'hidden'
                }}>
                  {availableLanguages.map((langCode) => {
                     const isActive = language === langCode;
                     return (
                      <button
                        key={langCode}
                        onClick={() => {
                          changeLanguage(langCode);
                          setIsLangMenuOpen(false);
                        }}
                        style={{
                          background: isActive ? 'var(--md-sys-color-secondary-container)' : 'transparent',
                          color: isActive ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface)',
                          border: 'none',
                          padding: '12px 16px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontWeight: isActive ? 600 : 400,
                          display: 'flex', alignItems: 'center', gap: '12px',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => !isActive && (e.currentTarget.style.background = 'var(--md-sys-color-surface-variant)')}
                        onMouseLeave={(e) => !isActive && (e.currentTarget.style.background = 'transparent')}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px', opacity: isActive ? 1 : 0 }}>check</span>
                        {LANGUAGE_LABELS[langCode]}
                      </button>
                     );
                  })}
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}