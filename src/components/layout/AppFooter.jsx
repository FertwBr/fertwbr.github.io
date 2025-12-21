import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import FooterControls from './FooterControls';

export default function AppFooter({ strings, onNavigate, activePage }) {
    const { content } = useLanguage();

    const t = strings || {};
    const globalFooter = content?.footer || {};

    const usefulLinks = [
        { key: 'changelog', icon: 'update' },
        { key: 'roadmap', icon: 'map' },
        { key: 'privacy', icon: 'security' },
        { key: 'help', icon: 'help_center' },
        { key: 'overview', icon: 'description' }
    ];

    return (
        <footer style={{
            background: 'var(--md-sys-color-surface-container)',
            padding: 'clamp(40px, 8vw, 80px) 24px 40px 24px',
            borderTop: '1px solid var(--md-sys-color-outline-variant)',
            marginTop: 'auto', position: 'relative', zIndex: 10
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '40px', alignItems: 'start'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <h3 style={{
                            fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px',
                            color: 'var(--md-sys-color-on-surface-variant)', fontWeight: 700
                        }}>
                            {t.footer?.links || globalFooter.useful_links}
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {usefulLinks.map(link => {
                                const isSelected = activePage === link.key;
                                return (
                                    <button
                                        key={link.key} onClick={() => onNavigate(link.key)}
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
                                        {t.nav?.[link.key] || link.key}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <FooterControls title={globalFooter.appearance?.title} />
                </div>

                <div style={{ width: '100%', height: '1px', background: 'var(--md-sys-color-outline-variant)', opacity: 0.3 }}></div>

                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <p style={{ color: 'var(--md-sys-color-on-surface)', fontSize: '0.9rem', margin: 0, fontWeight: 500 }}>
                            {t.footer?.rights}
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
                    </div>
                </div>
            </div>
        </footer>
    );
}