import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import FooterControls from './FooterControls';
import { SiteConfig } from '../../utils/siteConstants';

/**
 * Footer specific to App pages (Docs, internal Changelogs, etc).
 * Provides contextual navigation (Overview, Roadmap, etc) while keeping global links consistent.
 *
 * @param {Object} props
 * @param {Object} props.strings - Translated strings specific to the app
 * @param {Function} props.onNavigate - Function to switch internal tabs/pages
 * @param {string} props.activePage - Key of the current page
 * @param {boolean} [props.isPortfolio=false] - If true, filters links for portfolio mode
 * @returns {JSX.Element}
 */
export default function AppFooter({ strings, onNavigate, activePage, isPortfolio = false }) {
    const { content } = useLanguage();

    const t = strings || {};
    const globalFooter = content?.footer || {};

    const allLinks = [
        { key: 'overview', icon: 'description' },
        { key: 'changelog', icon: 'update' },
        { key: 'roadmap', icon: 'map' },
        { key: 'privacy', icon: 'security' },
        { key: 'help', icon: 'help_center' }
    ];

    const visibleLinks = isPortfolio
        ? allLinks.filter(link => ['overview', 'changelog'].includes(link.key))
        : allLinks;

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
                            {visibleLinks.map(link => {
                                const isSelected = activePage === link.key;
                                return (
                                    <motion.button
                                        key={link.key}
                                        onClick={() => onNavigate(link.key)}
                                        whileHover={{ scale: 1.05, backgroundColor: isSelected ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface-variant)' }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            borderRadius: '8px', padding: '8px 16px',
                                            border: isSelected ? '1px solid var(--md-sys-color-primary)' : '1px solid transparent',
                                            background: isSelected ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface-container-high)',
                                            color: isSelected ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)',
                                            fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px',
                                            cursor: 'pointer', fontWeight: 500, transition: 'color 0.2s ease, border 0.2s ease'
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{link.icon}</span>
                                        {t.nav?.[link.key] || t[link.key] || link.key}
                                    </motion.button>
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

                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.8rem'
                        }}>
                            <span>&copy; {SiteConfig.getCopyrightYear()} {SiteConfig.meta.author}</span>
                            <span style={{ opacity: 0.5 }}>•</span>
                            <Link
                                to={SiteConfig.routes.siteChangelog}
                                title="Portfolio Changelog"
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

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <motion.a
                            href={SiteConfig.links.githubProfile}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ y: -3, color: 'var(--md-sys-color-primary)', opacity: 1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{ color: 'var(--md-sys-color-on-surface-variant)', opacity: 0.8, display: 'inline-block' }}
                        >
                            <span className="material-symbols-outlined">code</span>
                        </motion.a>
                        <motion.a
                            href={SiteConfig.links.mailTo}
                            whileHover={{ y: -3, color: 'var(--md-sys-color-primary)', opacity: 1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{ color: 'var(--md-sys-color-on-surface-variant)', opacity: 0.8, display: 'inline-block' }}
                        >
                            <span className="material-symbols-outlined">mail</span>
                        </motion.a>
                    </div>
                </div>
            </div>
        </footer>
    );
}