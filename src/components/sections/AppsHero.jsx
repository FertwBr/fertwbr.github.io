import React from 'react';
import {motion} from 'framer-motion';
import {appsHomeConfig} from '../../pages/apps-home/AppsHomeConfig';

/**
 * AppsHero
 * Renders the animated hero section text for the Apps Portal.
 * Uses a refined grid background and a bottom spotlight to naturally
 * transition into the first device section, ensuring it's visible on load.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.subtitle
 * @param {string} props.scrollText
 * @returns {JSX.Element}
 */
export default function AppsHero({title, subtitle, scrollText}) {
    return (
        <div style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 24px 20px',
            marginBottom: '0',
            overflow: 'hidden',
            zIndex: 2
        }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: -1,
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundSize: '40px 40px',
                    backgroundImage: 'linear-gradient(to right, rgba(var(--md-sys-color-on-surface-rgb), 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--md-sys-color-on-surface-rgb), 0.04) 1px, transparent 1px)',
                    maskImage: 'radial-gradient(circle at center bottom, black 0%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at center bottom, black 0%, transparent 80%)',
                }}/>
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 1.5, ease: "easeOut"}}
                    style={{
                        position: 'absolute',
                        bottom: '-20%',
                        width: '80vw',
                        maxWidth: '800px',
                        height: '300px',
                        background: 'radial-gradient(ellipse at top, rgba(var(--md-sys-color-primary-rgb), 0.15) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                    }}
                />
            </div>

            <div style={{position: 'relative', zIndex: 2, textAlign: 'center', width: '100%'}}>
                <motion.h1
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, ease: "easeOut"}}
                    style={{
                        fontSize: 'clamp(2.5rem, 10vw, 5.5rem)',
                        fontWeight: 900,
                        margin: 0,
                        lineHeight: 1.15,
                        background: appsHomeConfig.heroGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.03em',
                        overflowWrap: 'break-word',
                        wordWrap: 'break-word',
                        maxWidth: '1000px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.2, duration: 0.8}}
                    style={{
                        fontSize: 'clamp(1.1rem, 3.5vw, 1.4rem)',
                        color: 'var(--md-sys-color-on-surface-variant)',
                        marginTop: '20px',
                        maxWidth: '650px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        lineHeight: 1.6,
                        fontWeight: 500
                    }}
                >
                    {subtitle}
                </motion.p>
            </div>

            <motion.div
                initial={{opacity: 0, y: -10}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.6, duration: 0.8}}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '40px',
                    color: 'var(--md-sys-color-on-surface-variant)'
                }}
            >
                <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    opacity: 0.7
                }}>
                    {scrollText}
                </span>
                <motion.span
                    animate={{y: [0, 6, 0]}}
                    transition={{duration: 2, repeat: Infinity, ease: "easeInOut"}}
                    className="material-symbols-outlined"
                    style={{fontSize: '24px', opacity: 0.7}}
                >
                    arrow_downward
                </motion.span>
            </motion.div>
        </div>
    );
}