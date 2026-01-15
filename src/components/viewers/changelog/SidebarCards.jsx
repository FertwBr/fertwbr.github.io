import React from 'react';

const SidebarBaseCard = ({children, onClick, className = ''}) => (
    <div
        className={`glass-card ${className}`}
        onClick={onClick}
        style={{
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
            width: '100%',
            cursor: onClick ? 'pointer' : 'default',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
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
            beta: {bg: 'rgba(255, 183, 77, 0.15)', color: '#FFB74D'},
            alpha: {bg: 'rgba(239, 83, 80, 0.15)', color: '#EF5350'},
            rc: {bg: 'rgba(171, 71, 188, 0.15)', color: '#AB47BC'}
        };
        const style = colors[type] || colors.stable;
        return (
            <span style={{
                fontSize: '0.65rem', fontWeight: 700, padding: '4px 8px', borderRadius: '6px',
                background: style.bg, color: style.color, textTransform: 'uppercase'
            }}>
                {type}
            </span>
        );
    };

    return (
        <SidebarBaseCard
            style={{background: `linear-gradient(135deg, var(--md-sys-color-primary-container), rgba(255,255,255,0.02))`}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
                <span style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'var(--md-sys-color-primary)',
                    fontWeight: 800
                }}>
                    {strings.latest_release}
                </span>
                <Badge type={version.type}/>
            </div>
            <h3 style={{fontSize: '1.8rem', margin: '0 0 4px 0'}}>{version.version.replace('Version ', '')}</h3>
            <p style={{fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '20px'}}>
                {strings.released} {version.date}
            </p>
            <a href={link} target="_blank" rel="noreferrer" className="btn-glow"
               style={{
                   width: '100%',
                   justifyContent: 'center',
                   background: 'var(--md-sys-color-primary)',
                   color: 'var(--md-sys-color-on-primary)',
                   textDecoration: 'none',
                   padding: '10px',
                   borderRadius: '12px',
                   display: 'flex',
                   alignItems: 'center',
                   gap: '8px',
                   fontWeight: 500
               }}>
                {strings.update_now} <span className="material-symbols-outlined">system_update</span>
            </a>
        </SidebarBaseCard>
    );
};

export const BetaProgramCard = ({strings, betaLink}) => (
    <SidebarBaseCard>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
            <h4 style={{fontSize: '1rem', margin: 0, color: 'var(--md-sys-color-on-surface)'}}>{strings.title}</h4>
            <span className="material-symbols-outlined" style={{color: '#FFB74D'}}>science</span>
        </div>
        <p style={{
            fontSize: '0.85rem',
            color: 'var(--md-sys-color-on-surface-variant)',
            marginBottom: '16px',
            lineHeight: 1.4
        }}>
            {strings.subtitle}
        </p>
        <a href={betaLink} target="_blank" rel="noreferrer" className="btn-outline" style={{
            width: '100%',
            justifyContent: 'center',
            padding: '10px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderColor: '#FFB74D',
            color: '#FFB74D'
        }}>
            {strings.cta} <span className="material-symbols-outlined" style={{fontSize: '16px'}}>open_in_new</span>
        </a>
    </SidebarBaseCard>
);

export const WearOSCard = ({strings, isAvailable, link}) => {

    return (
        <SidebarBaseCard>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                <h4 style={{fontSize: '1rem', margin: 0, color: 'var(--md-sys-color-on-surface)'}}>{strings.title}</h4>
                <span className="material-symbols-outlined"
                      style={{color: 'var(--md-sys-color-on-surface)'}}>watch</span>
            </div>
            <p style={{
                fontSize: '0.85rem',
                color: 'var(--md-sys-color-on-surface-variant)',
                marginBottom: '16px',
                lineHeight: 1.4
            }}>
                {isAvailable ? strings.subtitle_available : strings.subtitle_coming}
            </p>
            {isAvailable ? (
                <a href={link} target="_blank" rel="noreferrer" className="btn-outline" style={{
                    width: '100%', justifyContent: 'center', padding: '10px', textDecoration: 'none'
                }}>
                    {strings.cta}
                </a>
            ) : (
                <div style={{
                    padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px',
                    textAlign: 'center', fontSize: '0.75rem', color: 'var(--md-sys-color-on-surface-variant)'
                }}>
                    Q1 2026
                </div>
            )}
        </SidebarBaseCard>
    );
};

export const PlusPromoCard = ({strings, onNavigate}) => (
    <SidebarBaseCard>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
            <h4 style={{fontSize: '1rem', margin: 0, color: 'var(--md-sys-color-on-surface)'}}>{strings.title}</h4>
            <span className="material-symbols-outlined" style={{color: 'var(--md-sys-color-tertiary)'}}>verified</span>
        </div>
        <p style={{
            fontSize: '0.85rem',
            color: 'var(--md-sys-color-on-surface-variant)',
            marginBottom: '16px',
            lineHeight: 1.4
        }}>
            {strings.subtitle}
        </p>
        <button onClick={() => onNavigate && onNavigate('plus')} className="btn-outline" style={{
            width: '100%', justifyContent: 'center', padding: '10px'
        }}>
            {strings.cta}
        </button>
    </SidebarBaseCard>
);