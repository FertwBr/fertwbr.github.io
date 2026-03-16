import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

/**
 * A clickable badge indicating content was translated by AI.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onClick - Handler triggered when the badge is clicked.
 * @returns {JSX.Element|null} The rendered badge.
 */
export default function AutoTranslateBadge({ onClick }) {
    const { language, content } = useLanguage();

    const isPortfolio = !window.location.pathname.toLowerCase().includes('pixelcompass') &&
        !window.location.pathname.toLowerCase().includes('pixelpulse');

    if (language.startsWith('en') || !isPortfolio) {
        return null;
    }

    const badgeText = content?.changelog?.auto_translated_badge || "Auto Translated";
    const tooltipText = content?.changelog?.auto_translated_tooltip || "Translated by an AI system for your convenience.";

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
            className="btn-outline"
            style={{
                padding: '8px 16px',
                fontSize: '0.9rem',
                borderRadius: '100px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                margin: 0,
                whiteSpace: 'nowrap'
            }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(var(--md-sys-color-on-surface-rgb), 0.05)' }}
            whileTap={{ scale: 0.98 }}
            title={tooltipText}
        >
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--md-sys-color-primary)' }}>
                auto_awesome
            </span>
            <span style={{ fontWeight: 600 }}>{badgeText}</span>
        </motion.button>
    );
}