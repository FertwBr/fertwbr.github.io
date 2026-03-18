import React from 'react';
import {motion} from 'framer-motion';
import {appsHomeConfig} from '../../pages/apps-home/AppsHomeConfig';

/**
 * AppsHomeExtra
 * Renders supplementary content at the bottom of the Apps Home page.
 * Includes the simulation disclaimer, shared tech stack highlights, and a link to the main portfolio.
 *
 * @param {Object} props - Component props
 * @param {Object} props.t - Localized strings object for the footer_extra section.
 * @returns {JSX.Element}
 */
export default function AppsHomeExtra({t}) {
    const techStack = [
        {label: "Kotlin First", icon: "code_blocks"},
        {label: "Jetpack Compose", icon: "layers"},
        {label: "Material Design 3", icon: "palette"},
        {label: "Privacy Focused", icon: "security"}
    ];

    return (
        <section style={{
            position: 'relative',
            zIndex: 2,
            padding: '60px 24px 40px',
            background: 'var(--md-sys-color-surface-container-low)',
            color: 'var(--md-sys-color-on-surface)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
            borderTop: '1px solid var(--md-sys-color-outline-variant)'
        }}>
            <div style={{textAlign: 'center', width: '100%', maxWidth: '800px'}}>
                <h4 style={{
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    marginBottom: '24px',
                    color: 'var(--md-sys-color-on-surface-variant)',
                    fontWeight: 600
                }}>
                    {t.tech_title}
                </h4>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '16px'
                }}>
                    {techStack.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 10}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{delay: index * 0.1}}
                            whileHover={{y: -2, backgroundColor: 'var(--md-sys-color-surface-container-high)'}}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '8px 16px 8px 8px',
                                borderRadius: '100px',
                                background: 'var(--md-sys-color-surface-container)',
                                border: '1px solid var(--md-sys-color-outline-variant)'
                            }}
                        >
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: 'var(--md-sys-color-primary-container)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--md-sys-color-on-primary-container)'
                            }}>
                                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>
                                    {item.icon}
                                </span>
                            </div>
                            <span
                                style={{fontSize: '0.85rem', fontWeight: 500, color: 'var(--md-sys-color-on-surface)'}}>
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.a
                href={appsHomeConfig.portfolioUrl}
                whileHover={{scale: 1.05, backgroundColor: 'var(--md-sys-color-secondary-container)'}}
                whileTap={{scale: 0.95}}
                style={{
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 24px',
                    borderRadius: '100px',
                    border: '1px solid var(--md-sys-color-outline)',
                    background: 'transparent',
                    color: 'var(--md-sys-color-on-surface)',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    marginTop: '8px'
                }}
            >
                <span className="material-symbols-outlined" style={{fontSize: '20px'}}>person_search</span>
                <span style={{fontWeight: 600}}>{t.portfolio_cta}</span>
            </motion.a>

            <div style={{
                width: '100%',
                maxWidth: '600px',
                height: '1px',
                background: 'var(--md-sys-color-outline-variant)',
                opacity: 0.5,
                margin: '16px 0 8px 0'
            }}/>

            <motion.p
                initial={{opacity: 0}}
                whileInView={{opacity: 0.7}}
                viewport={{once: true}}
                style={{
                    fontSize: '0.75rem',
                    maxWidth: '600px',
                    textAlign: 'center',
                    margin: 0,
                    lineHeight: 1.5,
                    color: 'var(--md-sys-color-on-surface-variant)'
                }}
            >
                * {t.disclaimer}
            </motion.p>
        </section>
    );
}