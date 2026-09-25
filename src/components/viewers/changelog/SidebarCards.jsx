import React from 'react';
import { motion } from 'framer-motion';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {Function} [props.onClick]
 * @param {string} [props.className]
 * @returns {JSX.Element}
 */
const SidebarBaseCard = ({children, onClick, className = ''}) => (
    <div
        className={`sidebar-base-card ${onClick ? 'clickable' : ''} ${className}`}
        onClick={onClick}
    >
        {children}
    </div>
);

/**
 * @param {Object} props
 * @param {Object} props.version
 * @param {Object} props.strings
 * @param {string} props.link
 * @returns {JSX.Element|null}
 */
export const LatestReleaseCard = ({version, strings, link}) => {
    if (!version) return null;

    return (
        <SidebarBaseCard className="sidebar-primary-card">
            <span className="sidebar-release-label">
                {strings.latest_release}
            </span>

            <div className="sidebar-release-version-row">
                <h3 className="sidebar-release-version-number">
                    {version.version.replace('Version ', '')}
                </h3>
                <span className="version-badge primary-badge">
                    {version.type}
                </span>
            </div>

            <div className="sidebar-release-date">
                {version.date}
            </div>

            <motion.a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="action-btn-primary no-shadow transparent-border"
                initial={{ backgroundColor: 'var(--md-sys-color-on-primary-container)', color: 'var(--md-sys-color-primary-container)' }}
                whileHover={{ backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)' }}
                whileTap={{ scale: 0.96 }}
            >
                <span className="text-truncate">
                    {strings.update_now}
                </span>
                <span className="material-symbols-outlined">download</span>
            </motion.a>
        </SidebarBaseCard>
    );
};

/**
 * @param {Object} props
 * @param {Object} props.strings
 * @param {Function} props.onNavigate
 * @returns {JSX.Element}
 */
export const BetaProgramCard = ({strings, onNavigate}) => (
    <SidebarBaseCard>
        <div className="sidebar-promo-header">
            <h4 className="sidebar-promo-title">
                {strings.title}
            </h4>
            <span className="material-symbols-outlined icon-tertiary">
                science
            </span>
        </div>

        <p className="sidebar-promo-desc">
            {strings.subtitle}
        </p>

        <button onClick={() => onNavigate && onNavigate('beta')} className="beta-btn-outline cursor-pointer">
            <span className="text-truncate">
                {strings.cta}
            </span>
            <span className="material-symbols-outlined icon-small">
                arrow_forward
            </span>
        </button>
    </SidebarBaseCard>
);

/**
 * @param {Object} props
 * @param {Object} props.strings
 * @param {boolean} props.isAvailable
 * @param {string} props.link
 * @returns {JSX.Element}
 */
export const WearOSCard = ({strings, isAvailable, link}) => (
    <SidebarBaseCard>
        <div className="sidebar-promo-header">
            <h4 className="sidebar-promo-title">
                {strings.title}
            </h4>
            <span className="material-symbols-outlined icon-variant">
                watch
            </span>
        </div>

        <p className="sidebar-promo-desc">
            {isAvailable ? strings.subtitle_available : strings.subtitle_coming}
        </p>

        {isAvailable ? (
            <a href={link} target="_blank" rel="noreferrer" className="action-btn-outline">
                <span className="text-truncate">
                    {strings.cta}
                </span>
                <span className="material-symbols-outlined icon-small">
                    open_in_new
                </span>
            </a>
        ) : (
            <div className="unavailable-badge">
                Q1 2026
            </div>
        )}
    </SidebarBaseCard>
);

/**
 * @param {Object} props
 * @param {Object} props.strings
 * @param {Function} props.onNavigate
 * @returns {JSX.Element}
 */
export const PlusPromoCard = ({strings, onNavigate}) => (
    <SidebarBaseCard>
        <div className="sidebar-promo-header">
            <h4 className="sidebar-promo-title">
                {strings.title}
            </h4>
            <span className="material-symbols-outlined icon-secondary">
                verified
            </span>
        </div>

        <p className="sidebar-promo-desc">
            {strings.subtitle}
        </p>

        <button onClick={() => onNavigate && onNavigate('plus')} className="action-btn-outline cursor-pointer">
            <span className="text-truncate">
                {strings.cta}
            </span>
        </button>
    </SidebarBaseCard>
);