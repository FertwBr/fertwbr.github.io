import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import ViewerHeader from '../common/ViewerHeader';
import { parseChangelog } from '../../utils/changelogParser';
import '../../styles/beta.css';

/**
 * Strips markdown formatting for a clean plain-text preview.
 * @param {string} text
 * @returns {string}
 */
const stripMarkdown = (text) => {
    if (!text) return '';
    return text.replace(/[*_~`#]/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1').trim();
};

/**
 * Main component to view the Beta Program promotional page.
 *
 * @param {Object} props
 * @param {string} props.markdownContent
 * @param {Object} props.appConfig
 * @param {Object} props.strings
 * @param {Function} props.onNavigate
 * @returns {JSX.Element}
 */
export default function BetaViewer({ markdownContent, appConfig, strings, onNavigate }) {
    const t = strings?.beta_page || {};
    const title = t.hero_title ? t.hero_title.replace('{appName}', appConfig?.appName || '') : 'Join Beta';
    const betaLink = appConfig?.playStoreLink?.replace('/store/apps/details?id=', '/apps/testing/') || appConfig?.playStoreLink;

    // A foto deve ser configurada no arquivo de config do app (ex: pixelCompassConfig.js)
    // Se não existir, use um placeholder estético seu.
    const heroPhotoUrl = appConfig?.betaPhotoUrl || '/content/shared/default-beta.jpg';

    const betaVersions = useMemo(() => {
        if (!markdownContent) return [];
        const allVersions = parseChangelog(markdownContent);
        const unstableTypes = ['beta', 'alpha', 'rc', 'pre-release'];
        return allVersions
            .filter(v => unstableTypes.includes(v.type?.toLowerCase()))
            .slice(0, 3); // Pega apenas os 3 mais recentes
    }, [markdownContent]);

    const benefits = [
        { title: t.benefit_1_title, desc: t.benefit_1_desc, icon: 'rocket_launch' },
        { title: t.benefit_2_title, desc: t.benefit_2_desc, icon: 'architecture' },
        { title: t.benefit_3_title, desc: t.benefit_3_desc, icon: 'sensor_door' }
    ];

    return (
        <div className="beta-page-wrapper">
            <ViewerHeader
                appName={appConfig?.appName}
                icon="science"
                title={t.page_title || "Beta"}
            />

            <section className="beta-hero-section">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="beta-badge">{t.badge || 'Early Access'}</span>
                    <h1 className="beta-hero-title">{title}</h1>
                    <p className="beta-hero-subtitle">{t.hero_subtitle}</p>

                    <a
                        href={betaLink}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-glow"
                        style={{
                            background: 'var(--md-sys-color-tertiary)',
                            color: 'var(--md-sys-color-on-tertiary)',
                            boxShadow: '0 8px 24px rgba(var(--md-sys-color-tertiary-rgb), 0.3)'
                        }}
                    >
                        {t.cta_join}
                        <span className="material-symbols-outlined">open_in_new</span>
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="beta-photo-wrapper"
                >
                    <img src={heroPhotoUrl} alt="Beta Preview" className="beta-photo-img" />
                </motion.div>
            </section>

            {betaVersions.length > 0 && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="beta-updates-section"
                >
                    <div className="beta-updates-header">
                        <h2 className="beta-updates-title">
                            <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-tertiary)' }}>
                                bug_report
                            </span>
                            {t.updates_title}
                        </h2>
                        <button onClick={() => onNavigate('changelog')} className="btn-outline" style={{ padding: '8px 20px' }}>
                            {t.view_all_updates}
                        </button>
                    </div>

                    <div className="beta-updates-list">
                        {betaVersions.map(v => (
                            <div key={v.id} className="beta-update-row">
                                <span className="beta-update-version">
                                    {v.version.replace('Version ', '')}
                                </span>
                                <span className="beta-update-desc">
                                    {stripMarkdown(v.content)}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.section>
            )}

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="beta-benefits-section"
            >
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{t.benefits_title}</h2>
                <div className="beta-benefits-grid">
                    {benefits.map((benefit, i) => (
                        <div key={i} className="beta-benefit-item">
                            <span className="material-symbols-outlined beta-benefit-icon">
                                {benefit.icon}
                            </span>
                            <h3 className="beta-benefit-title">{benefit.title}</h3>
                            <p className="beta-benefit-desc">{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            <p className="beta-disclaimer">
                {t.disclaimer}
            </p>
        </div>
    );
}