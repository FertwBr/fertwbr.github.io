import React from 'react';
import {motion} from 'framer-motion';
import ReactMarkdown from 'react-markdown';

/**
 * HomePlusTeaser component
 *
 * Renders a promotional teaser section using provided localized `strings`.
 *
 * @param {Object} props
 * @param {Object} props.strings - Localized text and content for the teaser. Expected shape:
 *   { title: string, description: string (markdown), items: Array<{icon: string, title: string, desc: string}>, cta: string }
 * @param {Function} props.onNavigate - Callback invoked with a route key (e.g. 'plus') when CTA is clicked.
 * @param {Object} [props.appConfig] - App configuration, may include `seedColor` used as accent color.
 * @returns {JSX.Element|null} The teaser section or null if `strings` is not provided.
 */
export default function HomePlusTeaser({strings, onNavigate, appConfig}) {
    if (!strings) return null;

    const accentColor = appConfig?.seedColor || 'var(--md-sys-color-primary)';

    return (
        <motion.section
            initial={{opacity: 0, scale: 0.98}}
            whileInView={{opacity: 1, scale: 1}}
            viewport={{once: true}}
            transition={{duration: 0.8}}
            className="glass-card"
            style={{
                borderRadius: '40px',
                background: `linear-gradient(180deg, var(--md-sys-color-surface-container-highest) 0%, var(--md-sys-color-surface) 100%)`,
                border: '1px solid var(--md-sys-color-outline-variant)',
                padding: 'clamp(40px, 6vw, 80px) 24px',
                textAlign: 'center',
                marginBottom: '120px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{
                position: 'absolute', top: -50, right: -50,
                opacity: 0.03, pointerEvents: 'none'
            }}>
                <span className="material-symbols-outlined"
                      style={{fontSize: '400px', color: 'var(--md-sys-color-primary)'}}>diamond</span>
            </div>

            <div style={{position: 'relative', zIndex: 2}}>

                <span className="material-symbols-outlined"
                      style={{fontSize: '56px', color: accentColor, marginBottom: '24px'}}>diamond</span>

                <h2 style={{
                    fontSize: 'clamp(2.2rem, 7vw, 3.5rem)',
                    marginBottom: '20px',
                    lineHeight: 1.1,
                    color: 'var(--md-sys-color-on-surface)'
                }}>
                    {strings.title}
                </h2>

                <div style={{
                    fontSize: 'clamp(1.1rem, 4vw, 1.3rem)',
                    color: 'var(--md-sys-color-on-surface-variant)',
                    maxWidth: '800px',
                    margin: '0 auto 60px auto',
                    lineHeight: 1.6
                }}>
                    <ReactMarkdown
                        components={{
                            strong: ({node, ...props}) => <strong
                                style={{color: accentColor, fontWeight: 700}} {...props} />
                        }}
                    >
                        {strings.description}
                    </ReactMarkdown>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '32px',
                    maxWidth: '1200px',
                    margin: '0 auto 60px auto',
                    textAlign: 'left'
                }}>
                    {strings.items && strings.items.map((item, i) => (
                        <div key={i} style={{display: 'flex', gap: '16px', alignItems: 'flex-start'}}>
                            <div style={{
                                background: 'rgba(var(--md-sys-color-primary-rgb), 0.08)',
                                borderRadius: '12px',
                                padding: '10px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0
                            }}>
                    <span className="material-symbols-outlined" style={{color: accentColor, fontSize: '24px'}}>
                      {item.icon}
                    </span>
                            </div>
                            <div>
                                <h4 style={{
                                    fontSize: '1.1rem',
                                    marginBottom: '6px',
                                    fontWeight: 700,
                                    color: 'var(--md-sys-color-on-surface)'
                                }}>
                                    {item.title}
                                </h4>
                                <p style={{
                                    fontSize: '0.95rem',
                                    color: 'var(--md-sys-color-on-surface-variant)',
                                    lineHeight: 1.5,
                                    margin: 0
                                }}>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => onNavigate('plus')}
                    className="btn-glow"
                    style={{
                        fontSize: '1.1rem',
                        padding: '16px 36px',
                        '--glow-color': accentColor
                    }}
                >
                    {strings.cta}
                </button>
            </div>
        </motion.section>
    );
}