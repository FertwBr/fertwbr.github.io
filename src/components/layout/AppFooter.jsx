import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useLanguage} from '../../context/LanguageContext';
import FooterControls from './FooterControls';
import {SiteConfig} from '../../utils/siteConstants';

/**
 * AppFooter component for specific routes.
 * * @param {Object} props
 * @param {Object} props.strings
 * @param {Function} props.onNavigate
 * @param {string} props.activePage
 * @param {boolean} [props.isPortfolio]
 * @returns {JSX.Element}
 */
export default function AppFooter({strings, onNavigate, activePage, isPortfolio = false}) {
    const {content} = useLanguage();
    const t = strings || {};
    const globalFooter = content?.footer || {};

    const allLinks = [
        {key: 'overview', icon: 'description'},
        {key: 'changelog', icon: 'update'},
        {key: 'roadmap', icon: 'map'},
        {key: 'privacy', icon: 'security'},
        {key: 'terms', icon: 'gavel'},
        {key: 'help', icon: 'help_center'}
    ];

    const visibleLinks = isPortfolio
        ? allLinks.filter(link => ['overview', 'changelog'].includes(link.key))
        : allLinks;

    return (
        <footer className="footer-base" style={{position: 'relative', zIndex: 190}}>
            <div className="footer-content">
                <div className="footer-grid">
                    <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                        <h3 className="footer-heading" style={{margin: 0}}>
                            {t.footer?.links || globalFooter.useful_links}
                        </h3>
                        <div className="footer-links-group">
                            {visibleLinks.map(link => {
                                const isSelected = activePage === link.key;
                                return (
                                    <motion.button
                                        key={link.key}
                                        onClick={() => onNavigate(link.key)}
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                        className={`footer-link-btn ${isSelected ? 'active' : ''}`}
                                    >
                                        <span className="material-symbols-outlined" style={{fontSize: '18px'}}>
                                            {link.icon}
                                        </span>
                                        {t.nav?.[link.key] || t[link.key] || link.key}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                    <FooterControls title={globalFooter.appearance?.title}/>
                </div>
                <div className="footer-divider"/>
                <div className="footer-bottom">
                    <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                        <p className="footer-rights-text">{t.footer?.rights || globalFooter.rights}</p>
                        <div className="footer-meta-text">
                            <span>&copy; {SiteConfig.getCopyrightYear()} {SiteConfig.meta.author}</span>
                            <span style={{opacity: 0.5}}>•</span>
                            <Link
                                to={SiteConfig.routes.siteChangelog}
                                title="Portfolio Changelog"
                                style={{
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    fontFamily: 'monospace',
                                    opacity: 0.8
                                }}
                                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                            >
                                v{SiteConfig.meta.version}
                            </Link>
                        </div>
                    </div>
                    <div className="footer-social-links">
                        <motion.a
                            href={SiteConfig.links.githubProfile}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{y: -3, color: 'var(--md-sys-color-primary)', opacity: 1}}
                            whileTap={{scale: 0.9}}
                            className="footer-social-btn"
                        >
                            <span className="material-symbols-outlined">code</span>
                        </motion.a>
                        <motion.a
                            href={SiteConfig.links.mailTo}
                            whileHover={{y: -3, color: 'var(--md-sys-color-primary)', opacity: 1}}
                            whileTap={{scale: 0.9}}
                            className="footer-social-btn"
                        >
                            <span className="material-symbols-outlined">mail</span>
                        </motion.a>
                    </div>
                </div>
            </div>
        </footer>
    );
}