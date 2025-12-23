import React from 'react';
import {motion} from 'framer-motion';
import {appsHomeConfig} from '../../pages/apps-home/AppsHomeConfig';

/**
 * AppsHero
 * * Renders the animated hero section text for the Apps Portal.
 * Uses a masked gradient text effect and staggered animations.
 *
 * @param {string} title - The main hero title text.
 * @param {string} subtitle - The subtitle/intro text.
 */
export default function AppsHero({title, subtitle}) {
    return (
        <div style={{
            textAlign: 'center',
            marginBottom: '80px',
            position: 'relative',
            zIndex: 2
        }}>
            <motion.div
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.8, ease: "easeOut"}}
            >
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 20px',
                    borderRadius: '100px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    marginBottom: '24px'
                }}>
                    <span className="material-symbols-outlined"
                          style={{fontSize: '20px', color: 'var(--md-sys-color-primary)'}}>
                        apps
                    </span>
                    <span style={{
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--md-sys-color-on-surface-variant)',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                    }}>
                        Ecosystem
                    </span>
                </div>
            </motion.div>

            <motion.h1
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.2, duration: 0.8}}
                style={{
                    fontSize: 'clamp(3rem, 8vw, 5rem)',
                    fontWeight: 800,
                    margin: 0,
                    lineHeight: 1.1,
                    background: appsHomeConfig.heroGradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-2px'
                }}
            >
                {title}
            </motion.h1>

            <motion.p
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.4, duration: 0.8}}
                style={{
                    fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                    color: 'var(--md-sys-color-on-surface-variant)',
                    marginTop: '24px',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    lineHeight: 1.6
                }}
            >
                {subtitle}
            </motion.p>
        </div>
    );
}