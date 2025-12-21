import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import FooterControls from './FooterControls';
import pkg from '../../../package.json';

export default function Footer({ t }) {
    const { content } = useLanguage();
    const footerStrings = t || content?.footer || {};
    const contactStrings = content?.contact || {};

    const startYear = 2025;
    const currentYear = new Date().getFullYear();
    const displayYear = currentYear > startYear ? `${startYear} - ${currentYear}` : startYear;

    const socialLinks = [
        { key: 'github', icon: 'code', url: 'https://github.com/fertwbr', label: contactStrings.github },
        { key: 'linkedin', icon: 'work', url: 'https://linkedin.com/in/fernando-bela', label: contactStrings.linkedin },
        { key: 'email', icon: 'mail', url: 'mailto:fertwbr@gmail.com', label: contactStrings.email }
    ];

    return (
        <footer style={{
            background: 'var(--md-sys-color-surface-container)',
            padding: 'clamp(40px, 6vw, 60px) 24px',
            borderTop: '1px solid var(--md-sys-color-outline-variant)',
            marginTop: 'auto'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>

                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '40px', alignItems: 'start'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <h3 style={{
                            fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px',
                            color: 'var(--md-sys-color-on-surface-variant)', fontWeight: 700
                        }}>
                            {footerStrings.social_title}
                        </h3>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {socialLinks.map(link => (
                                <a
                                    key={link.key} href={link.url} target="_blank" rel="noopener noreferrer"
                                    style={{
                                        width: '40px', height: '40px', borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: 'var(--md-sys-color-surface-container-high)',
                                        color: 'var(--md-sys-color-on-surface)',
                                        border: '1px solid var(--md-sys-color-outline-variant)',
                                        textDecoration: 'none', transition: 'all 0.2s'
                                    }}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{link.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <FooterControls title={footerStrings.appearance?.title} />
                </div>

                <div style={{ width: '100%', height: '1px', background: 'var(--md-sys-color-outline-variant)', opacity: 0.3 }}></div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{
                        color: 'var(--md-sys-color-on-surface-variant)',
                        fontSize: '0.9rem',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <span>&copy; {displayYear} {footerStrings.built}</span>
                        <span style={{ opacity: 0.5 }}>•</span>
                        <Link
                            to="/site?page=changelog"
                            style={{
                                color: 'inherit',
                                textDecoration: 'none',
                                fontFamily: 'monospace',
                                opacity: 0.8
                            }}
                            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                        >
                            v{pkg.version}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}