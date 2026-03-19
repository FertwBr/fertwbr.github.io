import React from 'react';
import {motion} from 'framer-motion';
import {useLanguage} from '../../context/LanguageContext';

/**
 * A clickable badge indicating content was translated by AI, or offering to translate.
 * Uses styling consistent with the new viewer header actions.
 *
 * @param {Object} props
 * @param {Function} props.onClick
 * @param {boolean} props.isShowingOriginal
 * @returns {JSX.Element|null}
 */
export default function AutoTranslateBadge({onClick, isShowingOriginal}) {
    const {language, content} = useLanguage();

    const isPortfolio = !window.location.pathname.toLowerCase().includes('pixelcompass') &&
        !window.location.pathname.toLowerCase().includes('pixelpulse');

    if (language.startsWith('en') || !isPortfolio) {
        return null;
    }

    const badgeText = isShowingOriginal
        ? (content?.changelog?.translate_badge_restore || "Translate")
        : (content?.changelog?.auto_translated_badge || "Auto Translated");

    const tooltipText = isShowingOriginal
        ? (content?.changelog?.translate_badge_restore_tooltip || "Translate content to your current language.")
        : (content?.changelog?.auto_translated_tooltip || "Translated by an AI system for your convenience.");

    return (
        <motion.button
            initial={{opacity: 0, scale: 0.95}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.3}}
            onClick={onClick}
            className="header-ghost-btn"
            title={tooltipText}
            style={{color: 'var(--md-sys-color-primary)'}}
        >
            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>
                translate
            </span>
            <span className="header-btn-text">{badgeText}</span>
        </motion.button>
    );
}