import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import ViewerHeader from '../common/ViewerHeader';
import { useLanguage } from '../../context/LanguageContext';
import { parseChangelog } from '../../utils/changelogParser';

/**
 * Renders the official download page, emphasizing secure distribution and hardware requirements.
 * Reuses the M3 Expressive layout structure for a clean, non-intrusive presentation.
 *
 * @param {Object} props Component properties.
 * @param {string} props.markdownContent The raw markdown content from the changelog.
 * @param {Object} props.appConfig Application configuration containing IDs and store links.
 * @param {Function} props.onNavigate Navigation callback.
 * @returns {JSX.Element} The rendered Download Viewer component.
 */
export default function DownloadViewer({ markdownContent, appConfig, onNavigate }) {
    const { content } = useLanguage();
    const t = content?.shared?.download_page || {};
    const changelogT = content?.shared?.changelog || {};

    const appName = appConfig?.appName || '';
    const title = t.hero_title ? t.hero_title.replace('{appName}', appName) : appName;

    const isCompass = appConfig?.appId?.includes('compass');
    const isPulse = appConfig?.appId?.includes('pulse');
    const isMeasure = appConfig?.appId?.includes('measure');

    const latestVersion = useMemo(() => {
        if (!markdownContent) return null;
        const versions = parseChangelog(markdownContent);
        return versions.find(v => v.type === 'stable') || versions[0];
    }, [markdownContent]);

    return (
        <div className="download-page-wrapper">
            <ViewerHeader
                appName={appName}
                icon="get_app"
                title={t.page_title || "Download"}
            />

            <section className="download-hero-section">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="download-hero-icon"
                >
                    <div className="download-icon-wrapper">
                        <img
                            src={appConfig?.appIcon}
                            alt={appName}
                            className="download-app-icon"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="download-hero-text"
                >
                    <h1 className="download-hero-title">{title}</h1>
                    <p className="download-hero-subtitle">
                        {t.hero_subtitle ? t.hero_subtitle.replace('{appName}', appName) : ''}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="download-hero-actions"
                >
                    <a
                        href={appConfig?.playStoreLink}
                        target="_blank"
                        rel="noreferrer"
                        className="download-btn-store"
                    >
                        <img
                            src="/content/assets/google-play-store-icon.svg"
                            alt="Google Play"
                            className="download-store-icon"
                        />
                        {t.cta_store || "Download on Google Play"}
                    </a>
                </motion.div>

                {latestVersion && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="download-hero-version"
                    >
                        <div
                            className="download-version-card"
                            onClick={() => onNavigate('changelog')}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="download-version-info">
                                <span className="download-version-label">{changelogT.latest_release || "Latest Release"}</span>
                                <span className="download-version-number">{latestVersion.version}</span>
                                <span className="download-version-date">{latestVersion.date}</span>
                            </div>
                            <div className="download-version-icon-btn">
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </section>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="download-req-section"
            >
                <h2 className="download-req-title">{t.compatibility_title || "Requirements"}</h2>
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

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="download-fineprint"
            >
                <p className="download-fineprint-text">
                    <span className="download-fineprint-highlight">{t.security_warning || "Security Warning"}: </span>
                    {t.no_direct_download} {t.warning_desc} {t.malware_desc}
                </p>
            </motion.div>
        </div>
    );
}