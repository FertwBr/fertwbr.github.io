import { getThemeOptions, setThemeColor } from '../utils/themeUtils';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ t }) {
  const { toggleLanguage, language } = useLanguage();
  const themes = getThemeOptions();

  return (
    <footer style={{ 
      background: 'var(--md-sys-color-surface-container)',
      padding: '60px 24px 40px 24px',
      borderTop: '1px solid var(--md-sys-color-outline-variant)',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--md-sys-color-on-surface-variant)' }}>
               Theme & Appearance
            </h3>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {themes.map((theme) => (
                    <button 
                        key={theme.value}
                        onClick={() => setThemeColor(theme.value)}
                        title={theme.name}
                        style={{
                            width: '48px', height: '48px',
                            borderRadius: '50%',
                            border: '2px solid var(--md-sys-color-outline-variant)',
                            background: `linear-gradient(135deg, ${theme.palette.primary} 50%, ${theme.palette.secondary} 50%)`,
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                ))}
            </div>
        </div>

        <div style={{ width: '100%', height: '1px', background: 'var(--md-sys-color-outline-variant)', opacity: 0.3 }}></div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.9rem' }}>
                &copy; {new Date().getFullYear()} Fernando Vaz. {t.rights}
            </p>

            <button 
                onClick={toggleLanguage}
                style={{ 
                    background: 'transparent', 
                    border: '1px solid var(--md-sys-color-outline)', 
                    color: 'var(--md-sys-color-on-surface)', 
                    padding: '8px 24px', 
                    borderRadius: '100px', 
                    cursor: 'pointer',
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    transition: 'all 0.3s'
                }}
                className="hover-btn"
            >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>translate</span>
                {language === 'en' ? 'Português' : 'English'}
            </button>
        </div>
      </div>
    </footer>
  );
}