import React from 'react';
import { getThemeOptions, setThemeColor } from '../../utils/themeUtils';
import { useLanguage } from '../../context/LanguageContext';

export default function AppFooter({ strings, onNavigate, activePage }) {
  const { toggleLanguage, language, content } = useLanguage();
  const themes = getThemeOptions();

  const t = strings?.pixel_pulse || strings || {};
  const f = content?.footer || {};

  const usefulLinks = [
    { key: 'changelog', icon: 'update' },
    { key: 'roadmap', icon: 'map' },
    { key: 'privacy', icon: 'security' },
    { key: 'help', icon: 'help' },
    { key: 'overview', icon: 'info' }
  ];

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
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 8vw, 60px)' }}>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <h3 style={{
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'var(--md-sys-color-on-surface-variant)',
            fontWeight: 700
          }}>
            {t?.footer?.links || f?.useful_links || "Useful Links"}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {usefulLinks.map(link => {
              const isSelected = activePage === link.key;
              return (
                <button
                  key={link.key}
                  onClick={() => onNavigate(link.key)}
                  style={{
                    borderRadius: '100px',
                    padding: '10px 20px',
                    border: isSelected ? '2px solid var(--md-sys-color-primary)' : '1px solid var(--md-sys-color-outline-variant)',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--md-sys-color-primary-container)' : 'transparent',
                    color: isSelected ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)',
                    transition: 'all 0.2s ease',
                    fontWeight: isSelected ? 700 : 500
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{link.icon}</span>
                  {t?.nav?.[link.key] || link.key}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ width: '100%', height: '1px', background: 'var(--md-sys-color-outline-variant)', opacity: 0.3 }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--md-sys-color-on-surface-variant)', fontWeight: 600 }}>
            {t?.footer?.theme_title || f?.theme_title || f?.appearance?.title || "Theme & Appearance"}
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {themes.map((theme) => (
              <button
                key={theme.value}
                onClick={() => setThemeColor(theme.value)}
                style={{
                  width: '44px', height: '44px',
                  borderRadius: '50%',
                  border: '2px solid var(--md-sys-color-outline-variant)',
                  background: `linear-gradient(135deg, ${theme.palette.primary} 50%, ${theme.palette.secondary} 50%)`,
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ width: '100%', height: '1px', background: 'var(--md-sys-color-outline-variant)', opacity: 0.3 }}></div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          textAlign: 'center'
        }}>
          <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.9rem', flex: '1 1 300px' }}>
            &copy; {new Date().getFullYear()} {t?.footer?.rights || f?.rights || "Fernando Vaz"}
          </p>

          <button
            onClick={toggleLanguage}
            style={{
              background: 'var(--md-sys-color-secondary-container)',
              border: 'none',
              color: 'var(--md-sys-color-on-secondary-container)',
              padding: '10px 24px',
              borderRadius: '100px',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '0.9rem', fontWeight: 600, margin: '0 auto'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>translate</span>
            {language === 'en' ? 'Português' : 'English'}
          </button>
        </div>
      </div>
    </footer>
  );
}