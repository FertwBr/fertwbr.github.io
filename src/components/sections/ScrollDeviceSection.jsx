import React, {useRef} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';
import GooglePixel from '../ui/GooglePixel';
import {PulseMockScreen, CompassMockScreen} from './MockAppScreens';

/**
 * A section displaying an app on a phone device with scroll-triggered animations.
 *
 * @param {Object} config - App configuration object.
 * @param {string} title - Section title.
 * @param {Array<string>} points - List of key feature points.
 * @param {boolean} reversed - If true, places text on left and phone on right.
 */
export default function ScrollDeviceSection({config, title, points, reversed = false}) {
    const containerRef = useRef(null);
    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const rotate = useTransform(scrollYProgress, [0, 1], reversed ? [-10, 10] : [10, -10]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const isPulse = config.scheme === 'pixelpulse';
    const accentColor = isPulse ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-tertiary)';

    return (
        <section
            ref={containerRef}
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '80px 24px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '80px',
                maxWidth: '1200px',
                width: '100%',
                alignItems: 'center',
                direction: reversed ? 'rtl' : 'ltr'
            }}>
                <motion.div
                    className="hardware-accelerated"
                    style={{y, opacity, zIndex: 2, display: 'flex', justifyContent: 'center'}}>
                    <motion.div style={{rotate}}>
                        <GooglePixel>
                            {isPulse ? <PulseMockScreen/> : <CompassMockScreen/>}
                        </GooglePixel>
                    </motion.div>
                </motion.div>

                <div style={{direction: 'ltr', zIndex: 2}}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '12px',
                        marginBottom: '24px', padding: '8px 16px', borderRadius: '100px',
                        background: 'var(--md-sys-color-surface-container-high)'
                    }}>
                        <img src={config.appIcon} alt="" style={{width: '24px', borderRadius: '6px'}}/>
                        <span style={{fontSize: '0.9rem', fontWeight: 600}}>{config.appName}</span>
                    </div>

                    <motion.h2
                        initial={{opacity: 0, x: reversed ? -30 : 30}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.8}}
                        style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            marginBottom: '40px',
                            color: 'var(--md-sys-color-on-surface)'
                        }}
                    >
                        {title}
                    </motion.h2>

                    <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                        {points.map((point, i) => (
                            <motion.div
                                key={i}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{delay: 0.2 + (i * 0.1)}}
                                style={{
                                    display: 'flex',
                                    alignItems: 'start',
                                    gap: '20px'
                                }}
                            >
                                <div style={{
                                    marginTop: '4px',
                                    width: '24px', height: '24px',
                                    borderRadius: '50%',
                                    background: accentColor,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <span className="material-symbols-outlined" style={{
                                        fontSize: '16px',
                                        color: 'var(--md-sys-color-on-primary)'
                                    }}>check</span>
                                </div>
                                <span style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 500,
                                    lineHeight: 1.5,
                                    color: 'var(--md-sys-color-on-surface-variant)'
                                }}>
                                    {point}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}