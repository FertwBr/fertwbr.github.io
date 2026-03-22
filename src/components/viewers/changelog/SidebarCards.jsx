import React from 'react';

const SidebarBaseCard = ({children, onClick, className = '', style = {}}) => (
    <div
        className={`sidebar-base-card ${onClick ? 'clickable' : ''} ${!style.background ? 'sidebar-base-card-default' : ''} ${className}`}
        onClick={onClick}
        style={{ width: '100%', boxSizing: 'border-box', ...style }}
    >
        {children}
    </div>
);

export const LatestReleaseCard = ({version, strings, link}) => {
    if (!version) return null;

    return (
        <SidebarBaseCard
            style={{
                background: `linear-gradient(
                    135deg,
                    var(--md-sys-color-primary-container),
                    rgba(var(--md-sys-color-on-surface-rgb), 0.04)
                )`
            }}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '14px',
                flexWrap: 'wrap',
                gap: '8px'
            }}>
                <span style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1.2px',
                    color: 'var(--md-sys-color-primary)',
                    fontWeight: 800
                }}>
                    {strings.latest_release}
                </span>

                <span className="version-badge" style={{
                    background: 'var(--md-sys-color-primary)',
                    color: 'var(--md-sys-color-on-primary)'
                }}>
                    {version.type}
                </span>
            </div>

            <h3 style={{
                fontSize: '1.9rem',
                margin: '0 0 6px 0',
                lineHeight: 1.1,
                wordBreak: 'break-word',
                color: 'var(--md-sys-color-on-surface)'
            }}>
                {version.version.replace('Version ', '')}
            </h3>

            <p style={{
                fontSize: '0.9rem',
                color: 'var(--md-sys-color-on-surface-variant)',
                marginBottom: '22px'
            }}>
                {strings.released} {version.date}
            </p>

            <a href={link} target="_blank" rel="noreferrer" className="action-btn-primary">
                <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    {strings.update_now}
                </span>
                <span className="material-symbols-outlined">download</span>
            </a>
        </SidebarBaseCard>
    );
};

export const BetaProgramCard = ({strings, betaLink}) => (
    <SidebarBaseCard>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            flexWrap: 'wrap',
            gap: '6px'
        }}>
            <h4 style={{fontSize: '1.05rem', margin: 0, color: 'var(--md-sys-color-on-surface)'}}>
                {strings.title}
            </h4>
            <span className="material-symbols-outlined" style={{color: '#FFB74D'}}>
                science
            </span>
        </div>

        <p style={{
            fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)',
            marginBottom: '18px', lineHeight: 1.45
        }}>
            {strings.subtitle}
        </p>

        <a href={betaLink} target="_blank" rel="noreferrer" className="beta-btn-outline">
            <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                {strings.cta}
            </span>
            <span className="material-symbols-outlined" style={{fontSize: '18px'}}>
                open_in_new
            </span>
        </a>
    </SidebarBaseCard>
);

export const WearOSCard = ({strings, isAvailable, link}) => {
    return (
        <SidebarBaseCard>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                flexWrap: 'wrap',
                gap: '6px'
            }}>
                <h4 style={{fontSize: '1.05rem', margin: 0, color: 'var(--md-sys-color-on-surface)'}}>
                    {strings.title}
                </h4>
                <span className="material-symbols-outlined" style={{color: 'var(--md-sys-color-on-surface)'}}>
                    watch
                </span>
            </div>

            <p style={{
                fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)',
                marginBottom: '18px', lineHeight: 1.45
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
};

export const PlusPromoCard = ({strings, onNavigate}) => (
    <SidebarBaseCard>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            flexWrap: 'wrap',
            gap: '6px'
        }}>
            <h4 style={{fontSize: '1.05rem', margin: 0, color: 'var(--md-sys-color-on-surface)'}}>
                {strings.title}
            </h4>
            <span className="material-symbols-outlined" style={{color: 'var(--md-sys-color-tertiary)'}}>
                verified
            </span>
        </div>

        <p style={{
            fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)',
            marginBottom: '18px', lineHeight: 1.45
        }}>
            {strings.subtitle}
        </p>

        <button onClick={() => onNavigate && onNavigate('plus')} className="action-btn-outline">
            <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                {strings.cta}
            </span>
        </button>
    </SidebarBaseCard>
);