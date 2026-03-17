import React from 'react';

const SidebarBaseCard = ({children, onClick, className = '', style = {}}) => (
    <div
        className={`glass-card ${className}`}
        onClick={onClick}
        style={{
            padding: '26px',
            background: `
            linear-gradient(
                135deg,
                rgba(255,255,255,0.06) 0%,
                rgba(255,255,255,0.02) 40%,
                transparent 100%
            )`,
            width: '100%',
            cursor: onClick ? 'pointer' : 'default',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: '20px',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.08)',
            transition: 'transform 0.18s cubic-bezier(0.2,0,0,1), box-shadow 0.18s cubic-bezier(0.2,0,0,1), background 0.2s',
            boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
            ...style
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 14px 34px rgba(0,0,0,0.22)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.12)';
        }}
        onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.97)';
        }}
        onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
        }}
    >
        {children}
    </div>
);

export const LatestReleaseCard = ({version, strings, link}) => {
    if (!version) return null;

    const Badge = ({type}) => {
        const colors = {
            stable: {bg: 'var(--md-sys-color-primary)', color: 'var(--md-sys-color-on-primary)'},
            beta: {bg: 'rgba(255,183,77,0.18)', color: '#FFB74D'},
            alpha: {bg: 'rgba(239,83,80,0.18)', color: '#EF5350'},
            rc: {bg: 'rgba(171,71,188,0.18)', color: '#AB47BC'}
        };

        const style = colors[type] || colors.stable;

        return (
            <span style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '5px 10px',
                borderRadius: '999px',
                background: style.bg,
                color: style.color,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
            }}>
                {type}
            </span>
        );
    };

    return (
        <SidebarBaseCard
            style={{
                background: `linear-gradient(
                    135deg,
                    var(--md-sys-color-primary-container),
                    rgba(255,255,255,0.04)
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

                <Badge type={version.type}/>
            </div>

            <h3 style={{
                fontSize: '1.9rem',
                margin: '0 0 6px 0',
                lineHeight: 1.1,
                wordBreak: 'break-word'
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

            <a
                href={link}
                target="_blank"
                rel="noreferrer"
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    background: 'var(--md-sys-color-primary)',
                    color: 'var(--md-sys-color-on-primary)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    transition: 'transform .15s ease, box-shadow .15s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.25)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
                onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.96)';
                }}
                onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                }}
            >
                <span style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {strings.update_now}
                </span>

                <span className="material-symbols-outlined">
                    download
                </span>
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
            <h4 style={{
                fontSize: '1.05rem',
                margin: 0,
                color: 'var(--md-sys-color-on-surface)'
            }}>
                {strings.title}
            </h4>

            <span className="material-symbols-outlined" style={{color: '#FFB74D'}}>
                science
            </span>
        </div>

        <p style={{
            fontSize: '0.9rem',
            color: 'var(--md-sys-color-on-surface-variant)',
            marginBottom: '18px',
            lineHeight: 1.45
        }}>
            {strings.subtitle}
        </p>

        <a
            href={betaLink}
            target="_blank"
            rel="noreferrer"
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '12px 16px',
                border: '1px solid #FFB74D',
                color: '#FFB74D',
                borderRadius: '14px',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'transform .15s ease, background .15s ease'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.background = 'rgba(255,183,77,0.08)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'transparent';
            }}
            onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.96)';
            }}
            onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
            }}
        >
            <span style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }}>
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
                <h4 style={{
                    fontSize: '1.05rem',
                    margin: 0,
                    color: 'var(--md-sys-color-on-surface)'
                }}>
                    {strings.title}
                </h4>

                <span className="material-symbols-outlined">
                    watch
                </span>
            </div>

            <p style={{
                fontSize: '0.9rem',
                color: 'var(--md-sys-color-on-surface-variant)',
                marginBottom: '18px',
                lineHeight: 1.45
            }}>
                {isAvailable
                    ? strings.subtitle_available
                    : strings.subtitle_coming}
            </p>

            {isAvailable ? (
                <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        padding: '12px 16px',
                        borderRadius: '14px',
                        border: '1px solid var(--md-sys-color-outline)',
                        textDecoration: 'none',
                        fontWeight: 600,
                        transition: 'transform .15s ease, background .15s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.background = 'transparent';
                    }}
                    onMouseDown={(e) => {
                        e.currentTarget.style.transform = 'scale(0.96)';
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                >
                    <span style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {strings.cta}
                    </span>

                    <span className="material-symbols-outlined" style={{fontSize: '18px'}}>
                        open_in_new
                    </span>
                </a>
            ) : (
                <div style={{
                    padding: '10px 12px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--md-sys-color-on-surface-variant)',
                    letterSpacing: '0.4px'
                }}>
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
            <h4 style={{
                fontSize: '1.05rem',
                margin: 0,
                color: 'var(--md-sys-color-on-surface)'
            }}>
                {strings.title}
            </h4>

            <span className="material-symbols-outlined" style={{
                color: 'var(--md-sys-color-tertiary)'
            }}>
                verified
            </span>
        </div>

        <p style={{
            fontSize: '0.9rem',
            color: 'var(--md-sys-color-on-surface-variant)',
            marginBottom: '18px',
            lineHeight: 1.45
        }}>
            {strings.subtitle}
        </p>

        <button
            onClick={() => onNavigate && onNavigate('plus')}
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '14px',
                border: '1px solid var(--md-sys-color-outline)',
                background: 'transparent',
                fontWeight: 600,
                transition: 'transform .15s ease, background .15s ease'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'transparent';
            }}
            onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.96)';
            }}
            onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
            }}
        >
            <span style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }}>
                {strings.cta}
            </span>
        </button>

    </SidebarBaseCard>
);