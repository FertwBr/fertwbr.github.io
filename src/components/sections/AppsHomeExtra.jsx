import React from 'react';
import {motion} from 'framer-motion';
import {appsHomeConfig} from '../../pages/apps-home/AppsHomeConfig';

/**
 * AppsHomeExtra
 * Renders supplementary content at the bottom of the Apps Home page.
 * Includes the simulation disclaimer, shared tech stack highlights, and a link to the main portfolio.
 *
 * @param {Object} t - Localized strings object for the footer_extra section.
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
            padding: '40px 24px 80px',
            background: '#000',
            color: 'var(--md-sys-color-on-surface)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '60px'
        }}>
            <motion.p
                initial={{opacity: 0}}
                whileInView={{opacity: 0.4}}
                viewport={{once: true}}
                style={{
                    fontSize: '0.75rem',
                    maxWidth: '600px',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    letterSpacing: '0.5px'
                }}
            >
                * {t.disclaimer}
            </motion.p>

            <div style={{width: '100%', maxWidth: '800px', height: '1px', background: 'rgba(255,255,255,0.1)'}}/>

            <div style={{textAlign: 'center'}}>
                <h4 style={{
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    marginBottom: '32px',
                    color: 'rgba(255,255,255,0.6)'
                }}>
                    {t.tech_title}
                </h4>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '40px'
                }}>
                    {techStack.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{delay: index * 0.1}}
                            style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px'}}
                        >
                            <div style={{
                                width: '48px', height: '48px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.08)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <span className="material-symbols-outlined"
                                      style={{fontSize: '24px', color: 'var(--md-sys-color-primary)'}}>
                                    {item.icon}
                                </span>
                            </div>
                            <span style={{fontSize: '0.9rem', fontWeight: 500}}>{item.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.a
                href={appsHomeConfig.portfolioUrl}
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                style={{
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 28px',
                    borderRadius: '100px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'transparent',
                    color: '#fff',
                    marginTop: '20px',
                    cursor: 'pointer'
                }}
            >
                <span className="material-symbols-outlined">person_search</span>
                <span style={{fontWeight: 600}}>{t.portfolio_cta}</span>
            </motion.a>
        </section>
    );
}