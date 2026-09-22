import React from 'react';
import { motion } from 'framer-motion';
import ViewerHeader from '../common/ViewerHeader';

/**
 * Renders the official download page, emphasizing security and hardware requirements.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.appConfig Application configuration containing IDs and store links.
 * @param {Object} props.strings Localized strings payload.
 * @returns {JSX.Element} The rendered Download Viewer component.
 */
export default function DownloadViewer({ appConfig, strings }) {
    const t = strings?.download_page || {};
    const appName = appConfig?.appName || '';
    const title = t.hero_title ? t.hero_title.replace('{appName}', appName) : appName;

    const isCompass = appConfig?.appId?.includes('compass');
    const isPulse = appConfig?.appId?.includes('pulse');
    const isMeasure = appConfig?.appId?.includes('measure');

    return (
        <div className="download-page-wrapper">
            <ViewerHeader
                appName={appName}
                icon="get_app"
                title={t.page_title}
            />

            <section className="download-hero-section">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="download-badge-row">
                        <span className="download-secure-badge">
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>verified_user</span>
                            {t.badge_secure}
                        </span>
                        <span className="download-secure-badge" style={{ background: 'var(--md-sys-color-surface-container-high)', color: 'var(--md-sys-color-on-surface)' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>shop</span>
                            {t.badge_official}
                        </span>
                    </div>

                    <h1 className="download-hero-title">{title}</h1>
                    <p className="download-hero-subtitle">
                        {t.hero_subtitle ? t.hero_subtitle.replace('{appName}', appName) : ''}
                    </p>

                    <a
                        href={appConfig?.playStoreLink}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-glow"
                    >
                        <span className="material-symbols-outlined">shop</span>
                        {t.cta_store}
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <img
                        src={appConfig?.appIcon}
                        alt={appName}
                        style={{ width: 'clamp(180px, 30vw, 300px)', borderRadius: '25%', boxShadow: '0 24px 48px rgba(0,0,0,0.2)' }}
                    />
                </motion.div>
            </section>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="download-security-card"
            >
                <div className="download-security-icon-container">
                    <span className="material-symbols-outlined download-security-icon">gpp_bad</span>
                </div>
                <div className="download-security-content">
                    <h2 className="download-security-title">{t.warning_title}</h2>
                    <p className="download-security-desc">
                        <strong>{t.no_direct_download}</strong> {t.warning_desc}
                    </p>
                    <p className="download-security-desc">
                        {t.malware_desc}
                    </p>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="download-req-section"
            >
                <h2 className="download-req-title">{t.compatibility_title}</h2>
                <p style={{ color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '32px', fontSize: '1.1rem' }}>
                    {t.compatibility_desc ? t.compatibility_desc.replace('{appName}', appName) : ''}
                </p>

                <div className="download-req-grid">
                    {isCompass && (
                        <>
                            <div className="download-req-card">
                                <span className="material-symbols-outlined download-req-icon">explore</span>
                                <p className="download-req-text">{t.req_compass}</p>
                            </div>
                            <div className="download-req-card">
                                <span className="material-symbols-outlined download-req-icon">watch</span>
                                <p className="download-req-text">{t.req_wear}</p>
                            </div>
                        </>
                    )}
                    {isPulse && (
                        <>
                            <div className="download-req-card">
                                <span className="material-symbols-outlined download-req-icon">mic</span>
                                <p className="download-req-text">{t.req_pulse}</p>
                            </div>
                            <div className="download-req-card">
                                <span className="material-symbols-outlined download-req-icon">watch</span>
                                <p className="download-req-text">{t.req_wear}</p>
                            </div>
                        </>
                    )}
                    {isMeasure && (
                        <div className="download-req-card">
                            <span className="material-symbols-outlined download-req-icon">view_in_ar</span>
                            <p className="download-req-text">{t.req_measure}</p>
                        </div>
                    )}
                </div>
            </motion.section>
        </div>
    );
}