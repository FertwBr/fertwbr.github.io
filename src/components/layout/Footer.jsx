import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import FooterControls from './FooterControls';
import { SiteConfig } from '../../utils/siteConstants';


/**
 * Footer component documentation
 *
 * Renders the site footer using localized strings from the `useLanguage` context
 * and configuration from `SiteConfig`.
 *
 * @param {Object} props
 * @param {Object} [props.t] - Optional translation/override object for footer strings.
 * @returns {JSX.Element} Footer element
 */
export default function Footer({ t }) {
    const { content } = useLanguage();
    const footerStrings = t || content?.footer || {};
    const contactStrings = content?.contact || {};

    const socialLinks = [
        { key:'github', icon: 'code', url: SiteConfig.links.githubProfile, label: contactStrings.github },
        { key: 'linkedin', icon: 'work', url: SiteConfig.links.linkedin, label: contactStrings.linkedin },
        { key: 'email', icon: 'mail', url: SiteConfig.links.mailTo, label: contactStrings.email }
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
                                <motion.a
                                    key={link.key}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{
                                        y: -5,
                                        backgroundColor: 'var(--md-sys-color-surface-container-highest)',
                                        borderColor: 'var(--md-sys-color-primary)'
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    style={{
                                        width: '40px', height: '40px', borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: 'var(--md-sys-color-surface-container-high)',
                                        color: 'var(--md-sys-color-on-surface)',
                                        border: '1px solid var(--md-sys-color-outline-variant)',
                                        textDecoration: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{link.icon}</span>
                                </motion.a>
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
                        display: 'flex', alignItems: 'center', gap: '8px',
                        flexWrap: 'wrap', justifyContent: 'center'
                    }}>
                        <span>&copy; {SiteConfig.getCopyrightYear()} {footerStrings.built}</span>
                        <span style={{ opacity: 0.5 }}>•</span>
                        <Link
                            to={SiteConfig.routes.siteChangelog}
                            style={{
                                color: 'inherit', textDecoration: 'none',
                                fontFamily: 'monospace', opacity: 0.8
                            }}
                            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                        >
                            v{SiteConfig.meta.version}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}