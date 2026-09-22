import React from 'react';
import { motion } from 'framer-motion';

/**
 * HomeStoreFooter component.
 * A specific footer section designed to drive downloads adhering to M3 Expressive.
 *
 * @param {Object} props
 * @param {Object} props.appConfig Application configuration (links, colors).
 * @param {Object} props.strings Localized strings.
 * @returns {JSX.Element|null}
 */
export default function HomeStoreFooter({ appConfig, strings }) {
    if (!strings) return null;

    const accentColor = appConfig.seedColor || 'var(--md-sys-color-primary)';

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <section className="home-store-footer">
            <motion.div
                initial={{ rotate: -10, y: 100, opacity: 0 }}
                whileInView={{ rotate: 0, y: 50, opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="store-footer-icon-bg"
            >
                <span className="material-symbols-outlined" style={{ color: accentColor }}>
                    android
                </span>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="store-footer-content"
            >
                <motion.div variants={itemVariants}>
                    <div className="store-footer-badge">
                        <span className="material-symbols-outlined store-footer-badge-icon">android</span>
                        <span className="store-footer-badge-text">
                            {strings.tagline}
                        </span>
                    </div>

                    <h2 className="store-footer-title">
                        {strings.title}
                    </h2>

                    <p className="store-footer-desc">
                        {strings.subtitle}
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="store-footer-actions">
                    <motion.a
                        href={appConfig.playStoreLink}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="store-footer-btn"
                    >
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                            <path d="M4,20.5L21.2,12L4,3.5V20.5M5,5.1L18.8,12L5,18.9V5.1Z" />
                        </svg>

                        <div className="store-footer-btn-content">
                            <span className="store-footer-btn-sub">
                                {strings.button_sub}
                            </span>
                            <span className="store-footer-btn-main">
                                {strings.button_main}
                            </span>
                        </div>
                    </motion.a>

                    <div className="store-footer-note">
                        {strings.bottom_note}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}