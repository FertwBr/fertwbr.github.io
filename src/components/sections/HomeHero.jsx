import React from 'react';
import {motion, useScroll, useTransform, useSpring} from 'framer-motion';
import RatingBadge from '../ui/RatingBadge';

/**
 * HomeHero component.
 * Displays the main app introduction, animated background elements, and CTA buttons.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.appConfig - Application configuration.
 * @param {Object} props.strings - Localized strings.
 * @param {Function} props.onNavigate - Navigation callback.
 */
export default function HomeHero({appConfig, strings, onNavigate}) {
    const {scrollY} = useScroll();

    const yFast = useTransform(scrollY, [0, 1000], [0, -300]);
    const ySlow = useTransform(scrollY, [0, 1000], [0, -150]);

    const yTextRange = useTransform(scrollY, [0, 500], [0, 150]);
    const smoothY = useSpring(yTextRange, {stiffness: 100, damping: 20});
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const isPulse = appConfig.scheme === 'pixelpulse';

    const icon1 = isPulse ? 'graphic_eq' : 'explore';
    const icon2 = isPulse ? 'volume_up' : 'near_me';
    const accentColor = isPulse ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-tertiary)';

    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            textAlign: 'center',
            padding: '80px 20px',
            boxSizing: 'border-box',
            overflow: 'hidden'
        }}>
            <motion.div
                style={{y: yFast, position: 'absolute', top: '15%', left: '10%', zIndex: 0, pointerEvents: 'none'}}>
                <motion.div
                    animate={{y: [0, -20, 0], rotate: [0, 5, 0]}}
                    transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
                    style={{opacity: 0.05}}
                >
                    <span className="material-symbols-outlined" style={{
                        fontSize: 'clamp(80px, 20vw, 120px)',
                        color: accentColor
                    }}>{icon1}</span>
                </motion.div>
            </motion.div>

            <motion.div
                style={{y: ySlow, position: 'absolute', bottom: '20%', right: '10%', zIndex: 0, pointerEvents: 'none'}}>
                <motion.div
                    animate={{y: [0, 30, 0], rotate: [0, -10, 0]}}
                    transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
                    style={{opacity: 0.05}}
                >
                    <span className="material-symbols-outlined" style={{
                        fontSize: 'clamp(100px, 25vw, 150px)',
                        color: 'var(--md-sys-color-secondary)'
                    }}>{icon2}</span>
                </motion.div>
            </motion.div>

            <motion.div style={{
                y: smoothY,
                opacity,
                maxWidth: '900px',
                zIndex: 1,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <motion.div
                    initial={{scale: 0.8, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{duration: 0.8, type: "spring"}}
                    style={{marginBottom: '32px'}}
                >
                    <img
                        src={appConfig.appIcon}
                        alt={appConfig.appName}
                        style={{
                            width: 'clamp(100px, 20vw, 140px)', height: 'auto',
                            borderRadius: '28px'
                        }}
                    />
                </motion.div>

                <motion.h1
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{delay: 0.2}}
                    style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        marginBottom: '24px',
                        color: 'var(--md-sys-color-on-surface)'
                    }}
                >
                    {strings.title}
                </motion.h1>

                <motion.p
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{delay: 0.4}}
                    style={{
                        fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                        color: 'var(--md-sys-color-on-surface-variant)',
                        maxWidth: '650px',
                        margin: '0 auto 40px',
                        lineHeight: 1.6
                    }}
                >
                    {strings.subtitle}
                </motion.p>

                <motion.div
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{delay: 0.6}}
                    style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', width: '100%'}}
                >
                    <a href={appConfig.playStoreLink} target="_blank" rel="noreferrer" className="btn-glow"
                       style={{
                           padding: '12px 24px',
                           display: 'inline-flex',
                           alignItems: 'center',
                           gap: '12px',
                           textDecoration: 'none',
                           borderRadius: '16px'
                       }}>
                        <span className="material-symbols-outlined" style={{fontSize: '24px'}}>download</span>
                        <div
                            style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1}}>
                            <span style={{fontSize: '0.9rem', fontWeight: 600}}>{strings.download}</span>
                            <RatingBadge appId={appConfig.appId} fallback={appConfig.rating} variant="compact"/>
                        </div>
                    </a>

                    <button onClick={() => onNavigate('plus')} className="btn-outline"
                            style={{
                                fontSize: '1rem',
                                padding: '14px 28px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                borderRadius: '100px'
                            }}>
                        <span className="material-symbols-outlined">diamond</span>
                        {appConfig.appName}+
                    </button>
                </motion.div>
            </motion.div>

            <motion.div
                animate={{y: [0, 10, 0]}}
                transition={{duration: 2, repeat: Infinity}}
                style={{
                    position: 'absolute',
                    bottom: '30px',
                    left: '50%',
                    x: '-50%',
                    opacity: 0.5,
                    color: 'var(--md-sys-color-primary)'
                }}
            >
                <span className="material-symbols-outlined">expand_more</span>
            </motion.div>
        </section>
    );
}