import React from 'react';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {Function} [props.onClick]
 * @param {string} [props.className]
 * @param {Object} [props.style]
 * @returns {JSX.Element}
 */
const SidebarBaseCard = ({children, onClick, className = '', style = {}}) => (
    <div
        className={`sidebar-base-card ${onClick ? 'clickable' : ''} ${className}`}
        onClick={onClick}
        style={{ width: '100%', boxSizing: 'border-box', ...style }}
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
        <SidebarBaseCard
            style={{
                background: 'var(--md-sys-color-primary-container)',
                border: '1px solid transparent'
            }}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '8px'
            }}>
                <span style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'var(--md-sys-color-on-primary-container)',
                    fontWeight: 700,
                    opacity: 0.8
                }}>
                    {strings.latest_release}
                </span>

                <span className="version-badge" style={{
                    background: 'var(--md-sys-color-on-primary-container)',
                    color: 'var(--md-sys-color-primary-container)'
                }}>
                    {version.type}
                </span>
            </div>

            <h3 style={{
                fontSize: '2rem',
                margin: '0 0 8px 0',
                lineHeight: 1.1,
                wordBreak: 'break-word',
                color: 'var(--md-sys-color-on-primary-container)',
                fontWeight: 800
            }}>
                {version.version.replace('Version ', '')}
            </h3>

            <p style={{
                fontSize: '0.9rem',
                color: 'var(--md-sys-color-on-primary-container)',
                marginBottom: '24px',
                opacity: 0.9
            }}>
                {strings.released} {version.date}
            </p>

            <a href={link} target="_blank" rel="noreferrer" className="action-btn-primary" style={{
                background: 'var(--md-sys-color-on-primary-container)',
                color: 'var(--md-sys-color-primary-container)',
                boxShadow: 'none'
            }}>
                <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    {strings.update_now}
                </span>
                <span className="material-symbols-outlined">download</span>
            </a>
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
    <SidebarBaseCard style={{ background: 'var(--md-sys-color-surface-container)' }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            gap: '8px'
        }}>
            <h4 style={{fontSize: '1.05rem', margin: 0, fontWeight: 700, color: 'var(--md-sys-color-on-surface)'}}>
                {strings.title}
            </h4>
            <span className="material-symbols-outlined" style={{color: 'var(--md-sys-color-tertiary)'}}>
                science
            </span>
        </div>

        <p style={{
            fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)',
            marginBottom: '20px', lineHeight: 1.5
        }}>
            {strings.subtitle}
        </p>

        <button onClick={() => onNavigate && onNavigate('beta')} className="action-btn-outline" style={{ border: '1px solid var(--md-sys-color-tertiary)', color: 'var(--md-sys-color-tertiary)', cursor: 'pointer' }}>
            <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                {strings.cta}
            </span>
            <span className="material-symbols-outlined" style={{fontSize: '18px'}}>
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
    <SidebarBaseCard style={{ background: 'var(--md-sys-color-surface-container)' }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            gap: '8px'
        }}>
            <h4 style={{fontSize: '1.05rem', margin: 0, fontWeight: 700, color: 'var(--md-sys-color-on-surface)'}}>
                {strings.title}
            </h4>
            <span className="material-symbols-outlined" style={{color: 'var(--md-sys-color-on-surface-variant)'}}>
                watch
            </span>
        </div>

        <p style={{
            fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)',
            marginBottom: '20px', lineHeight: 1.5
        }}>
            {isAvailable ? strings.subtitle_available : strings.subtitle_coming}
        </p>

        {isAvailable ? (
            <a href={link} target="_blank" rel="noreferrer" className="action-btn-outline">
                <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    {strings.cta}
                </span>
                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>
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
    <SidebarBaseCard style={{ background: 'var(--md-sys-color-surface-container)' }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            gap: '8px'
        }}>
            <h4 style={{fontSize: '1.05rem', margin: 0, fontWeight: 700, color: 'var(--md-sys-color-on-surface)'}}>
                {strings.title}
            </h4>
            <span className="material-symbols-outlined" style={{color: 'var(--md-sys-color-secondary)'}}>
                verified
            </span>
        </div>

        <p style={{
            fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)',
            marginBottom: '20px', lineHeight: 1.5
        }}>
            {strings.subtitle}
        </p>

        <button onClick={() => onNavigate && onNavigate('plus')} className="action-btn-outline" style={{ cursor: 'pointer' }}>
            <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                {strings.cta}
            </span>
        </button>
    </SidebarBaseCard>
);
