import React from 'react';
import { motion } from 'framer-motion';

/**
 * A clickable badge indicating content was translated by AI.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onClick - Handler triggered when the badge is clicked.
 * @returns {JSX.Element} The rendered badge.
 */
export default function AutoTranslateBadge({ onClick }) {
    return (
        <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            onClick={onClick}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '100px',
                background: 'linear-gradient(90deg, rgba(var(--md-sys-color-primary-rgb), 0.1), rgba(var(--md-sys-color-tertiary-rgb), 0.1))',
                border: '1px solid rgba(var(--md-sys-color-primary-rgb), 0.2)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--md-sys-color-on-surface-variant)',
                cursor: 'pointer',
                marginBottom: '16px',
                position: 'relative',
                overflow: 'hidden',
                outline: 'none'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Translated by AI. Click for details."
        >
            <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: 1 }}
                style={{
                    position: 'absolute',
                    top: 0, left: 0, bottom: 0, width: '50%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    zIndex: 1
                }}
            />

            <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--md-sys-color-primary)' }}>
                auto_awesome
            </span>
            <span>AI Translated</span>
        </motion.button>
    );
}