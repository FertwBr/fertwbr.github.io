import React from 'react';
import { motion } from 'framer-motion';

/**
 * HomeStoreFooter component.
 *
 * A specific footer section designed to drive downloads.
 * Features Android branding, Play Store badge style button, and final CTA.
 *
 * @param {Object} props
 * @param {Object} props.appConfig - Application configuration (links, colors).
 * @param {Object} props.strings - Localized strings.
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
        <section style={{
            position: 'relative',
            padding: '100px 20px',
            marginTop: '80px',
            overflow: 'hidden',
            textAlign: 'center'
        }}>
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: `linear-gradient(180deg, transparent 0%, var(--md-sys-color-surface-container) 100%)`,
                zIndex: -1
            }} />

            <motion.div
                initial={{ rotate: -10, y: 100, opacity: 0 }}
                whileInView={{ rotate: 0, y: 50, opacity: 0.05 }}
                transition={{ duration: 1.5 }}
                style={{
                    position: 'absolute', bottom: -50, left: '50%', x: '-50%',
                    pointerEvents: 'none', zIndex: -1
                }}
            >
                <span className="material-symbols-outlined" style={{ fontSize: '400px', color: accentColor }}>
                    android
                </span>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}
            >
                <motion.div variants={itemVariants} style={{ marginBottom: '24px' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '12px',
                        padding: '8px 16px', borderRadius: '100px',
                        background: 'var(--md-sys-color-surface-container-high)',
                        marginBottom: '24px'
                    }}>
                        <span className="material-symbols-outlined" style={{ color: '#3DDC84' }}>android</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--md-sys-color-on-surface)' }}>
                            {strings.tagline}
                        </span>
                    </div>

                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                        lineHeight: 1.1,
                        fontWeight: 800,
                        marginBottom: '16px',
                        color: 'var(--md-sys-color-on-surface)'
                    }}>
                        {strings.title}
                    </h2>

                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--md-sys-color-on-surface-variant)',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        {strings.subtitle}
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} style={{ marginTop: '40px' }}>
                    <motion.a
                        href={appConfig.playStoreLink}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'var(--md-sys-color-on-surface)',
                            color: 'var(--md-sys-color-surface)',
                            padding: '12px 24px',
                            borderRadius: '16px',
                            textDecoration: 'none',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
                        }}
                    >
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                            <path d="M4,20.5L21.2,12L4,3.5V20.5M5,5.1L18.8,12L5,18.9V5.1Z" />
                        </svg>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.9 }}>
                                {strings.button_sub}
                            </span>
                            <span style={{ fontSize: '1.4rem', fontWeight: 700, lineHeight: 1 }}>
                                {strings.button_main}
                            </span>
                        </div>
                    </motion.a>

                    <div style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)', opacity: 0.7 }}>
                        {strings.bottom_note}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}