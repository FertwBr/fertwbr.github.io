// src/components/layout/Footer.jsx
import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useLanguage} from '../../context/LanguageContext';
import FooterControls from './FooterControls';
import {SiteConfig} from '../../utils/siteConstants';

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
export default function Footer({t}) {
    const {content} = useLanguage();
    const footerStrings = t || content?.footer || {};
    const contactStrings = content?.contact || {};

    const socialLinks = [
        {key: 'github', icon: 'code', url: SiteConfig.links.githubProfile, label: contactStrings.github},
        {key: 'linkedin', icon: 'work', url: SiteConfig.links.linkedin, label: contactStrings.linkedin},
        {key: 'email', icon: 'mail', url: SiteConfig.links.mailTo, label: contactStrings.email}
    ];

    return (
        <footer className="footer-base">
            <div className="footer-content">
                <div className="footer-grid">
                    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
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
                                    whileTap={{scale: 0.9}}
                                    className="footer-social-btn-circular"
                                >
                                    <span className="material-symbols-outlined"
                                          style={{fontSize: '20px'}}>{link.icon}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                    <FooterControls title={footerStrings.appearance?.title}/>
                </div>
                <div className="footer-divider"></div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div className="footer-meta-text"
                         style={{textAlign: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
                        <span>&copy; {SiteConfig.getCopyrightYear()} {footerStrings.built}</span>
                        <span style={{opacity: 0.5}}>•</span>
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