import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import FooterControls from './FooterControls';
import { SiteConfig } from '../../utils/siteConstants';

/**
 * Renders the site footer using localized strings from the `useLanguage` context.
 * Enforces Material 3 Expressive layout guidelines.
 *
 * @param {Object} props
 * @param {Object} [props.t] Optional translation/override object for footer strings.
 * @returns {JSX.Element} Footer element
 */
export default function Footer({ t }) {
    const { content } = useLanguage();
    const footerStrings = t || content?.footer || {};
    const contactStrings = content?.contact || {};

    const socialLinks = [
        { key: 'github', icon: 'code', url: SiteConfig.links.githubProfile, label: contactStrings.github },
        { key: 'linkedin', icon: 'work', url: SiteConfig.links.linkedin, label: contactStrings.linkedin },
        { key: 'email', icon: 'mail', url: SiteConfig.links.mailTo, label: contactStrings.email }
    ];

    return (
        <footer className="footer-base">
            <div className="footer-content">
                <div className="footer-grid">
                    <div className="footer-column">
                        <h3 className="footer-heading">
                            {footerStrings.social_title}
                        </h3>
                        <div className="footer-social-links">
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
                                    className="footer-social-btn-circular"
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                                        {link.icon}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                    <FooterControls title={footerStrings.appearance?.title} />
                </div>

                <div className="footer-divider" />

                <div className="footer-bottom-centered">
                    <div className="footer-meta-text footer-meta-centered">
                        <span>&copy; {SiteConfig.getCopyrightYear()} {footerStrings.built}</span>
                        <span style={{ opacity: 0.5 }}>•</span>
                        <Link
                            to={SiteConfig.routes.siteChangelog}
                            className="footer-version-link"
                            title="Portfolio Changelog"
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