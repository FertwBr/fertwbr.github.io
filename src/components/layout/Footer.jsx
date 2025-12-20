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

export default function Footer({ t, strings }) {
  const { changeLanguage, language, availableLanguages } = useLanguage();
  const themes = getThemeOptions();
  
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);

  const contact = strings?.contact || {};
  const footerStrings = strings?.footer || {};

  const socialLinks = [
    { key: 'github', icon: 'code', url: 'https://github.com/fertwbr', label: contact.github },
    { key: 'linkedin', icon: 'work', url: 'https://linkedin.com/in/fernandovaz', label: contact.linkedin },
    { key: 'email', icon: 'mail', url: 'mailto:fertwbr@gmail.com', label: contact.email }
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
      padding: 'clamp(40px, 6vw, 60px) 24px',
      borderTop: '1px solid var(--md-sys-color-outline-variant)',
      marginTop: 'auto',
      boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', gap: '40px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        <div style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px'
        }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <h3 style={{
              fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px',
              color: 'var(--md-sys-color-on-surface-variant)', fontWeight: 700
            }}>
              {footerStrings.appearance?.title || "Appearance"}
            </h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              {themes.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => setThemeColor(theme.value)}
                  title={theme.name}
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    border: '2px solid var(--md-sys-color-outline-variant)',
                    background: `linear-gradient(135deg, ${theme.palette.primary} 50%, ${theme.palette.secondary} 50%)`,
                    cursor: 'pointer', transition: 'transform 0.2s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
             <h3 style={{
              fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px',
              color: 'var(--md-sys-color-on-surface-variant)', fontWeight: 700
            }}>
              {footerStrings.social_title || "Connect"}
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {socialLinks.map(link => (
                <a 
                  key={link.key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--md-sys-color-surface-container-high)',
                    color: 'var(--md-sys-color-on-surface)',
                    border: '1px solid var(--md-sys-color-outline-variant)',
                    textDecoration: 'none', transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                     e.currentTarget.style.background = 'var(--md-sys-color-primary-container)';
                     e.currentTarget.style.color = 'var(--md-sys-color-on-primary-container)';
                  }}
                  onMouseLeave={(e) => {
                     e.currentTarget.style.background = 'var(--md-sys-color-surface-container-high)';
                     e.currentTarget.style.color = 'var(--md-sys-color-on-surface)';
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{link.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: '1px', background: 'var(--md-sys-color-outline-variant)', opacity: 0.3 }}></div>

        <div style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' 
        }}>
          <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} {footerStrings.built || "Fernando Vaz"}
          </p>

          <div style={{ position: 'relative' }} ref={langMenuRef}>
            <button
               onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
               style={{
                 background: 'transparent',
                 border: '1px solid var(--md-sys-color-outline)',
                 color: 'var(--md-sys-color-on-surface)',
                 padding: '8px 16px',
                 borderRadius: '100px',
                 display: 'flex', alignItems: 'center', gap: '8px',
                 fontSize: '0.85rem', fontWeight: 600,
                 cursor: 'pointer', transition: 'background 0.2s'
               }}
               onMouseEnter={(e) => e.currentTarget.style.background = 'var(--md-sys-color-surface-container-highest)'}
               onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
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
    </footer>
  );
}