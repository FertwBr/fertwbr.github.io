import { getThemeOptions, setThemeColor } from '../../utils/themeUtils';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer({ t }) {
  const { toggleLanguage, language } = useLanguage();
  const themes = getThemeOptions();

  return (
    <footer style={{
      background: 'var(--md-sys-color-surface-container)',
      padding: 'clamp(40px, 8vw, 80px) 24px 40px 24px',
      borderTop: '1px solid var(--md-sys-color-outline-variant)',
      marginTop: 'auto',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <h3 style={{
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--md-sys-color-on-surface-variant)',
            fontWeight: 600
          }}>
            {t.theme_title || t.appearance?.title}
          </h3>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {themes.map((theme) => (
              <button
                key={theme.value}
                onClick={() => setThemeColor(theme.value)}
                title={theme.name}
                style={{
                  width: '44px', height: '44px',
                  borderRadius: '50%',
                  border: '2px solid var(--md-sys-color-outline-variant)',
                  background: `linear-gradient(135deg, ${theme.palette.primary} 50%, ${theme.palette.secondary} 50%)`,
                  cursor: 'pointer',
                  transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            ))}
          </div>
        </div>

        <div style={{ width: '100%', height: '1px', background: 'var(--md-sys-color-outline-variant)', opacity: 0.3 }}></div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px', textAlign: 'center' }}>
          <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.9rem', flex: '1 1 300px' }}>
            &copy; {new Date().getFullYear()} {t.built || "Fernando Vaz"}.
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
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem',
              fontWeight: 600,
              margin: '0 auto'
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