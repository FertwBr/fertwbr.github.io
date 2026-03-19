import React, {useRef} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import GooglePixel from '../ui/GooglePixel';
import {PulseMockScreen, CompassMockScreen} from './MockAppScreens';
import RatingBadge from '../ui/RatingBadge';

/**
 * A section displaying an app on a phone device with scroll-triggered animations.
 * Provides direct interactive CTAs with high-contrast styling and localized strings.
 *
 * @param {Object} props
 * @param {Object} props.config
 * @param {string} props.title
 * @param {Array<string>} props.points
 * @param {string} props.exploreText
 * @param {string} props.plusText
 * @param {boolean} [props.reversed=false]
 * @returns {JSX.Element}
 */
export default function ScrollDeviceSection({config, title, points, exploreText, plusText, reversed = false}) {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
    const rotate = useTransform(scrollYProgress, [0, 1], reversed ? [-5, 5] : [5, -5]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

    const isPulse = config.scheme === 'pixelpulse';
    const accentColor = isPulse ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-tertiary)';
    const accentColorRgb = isPulse ? 'var(--md-sys-color-primary-rgb)' : 'var(--md-sys-color-tertiary-rgb)';

    const handleNavigate = () => navigate(`/${config.scheme}`);
    const handlePlusNavigate = () => navigate(`/${config.scheme}/plus`);

    return (
        <section
            ref={containerRef}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 24px 80px',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 3
            }}
        >
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '40px',
                maxWidth: '1200px',
                width: '100%',
                alignItems: 'center',
                direction: reversed ? 'rtl' : 'ltr'
            }}>
                <motion.div
                    className="hardware-accelerated"
                    style={{y, opacity, zIndex: 2, display: 'flex', justifyContent: 'center'}}
                >
                    <motion.div
                        style={{rotate, cursor: 'pointer'}}
                        whileHover={{scale: 1.05, y: -10, rotate: 0}}
                        whileTap={{scale: 0.95}}
                        transition={{type: "spring", stiffness: 300, damping: 20}}
                        onClick={handleNavigate}
                    >
                        <GooglePixel>
                            {isPulse ? <PulseMockScreen/> : <CompassMockScreen/>}
                        </GooglePixel>
                    </motion.div>
                </motion.div>

                <div style={{direction: 'ltr', zIndex: 2}}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '24px',
                        padding: '8px 16px',
                        borderRadius: '100px',
                        background: 'var(--md-sys-color-surface-container-high)',
                        border: '1px solid var(--md-sys-color-outline-variant)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}>
                        <img src={config.appIcon} alt=""
                             style={{width: '24px', borderRadius: '6px', display: 'block'}}/>

                        <span style={{
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            color: 'var(--md-sys-color-on-surface)',
                            lineHeight: 1,
                            paddingTop: '2px'
                        }}>
                            {config.appName}
                        </span>

                        <div style={{
                            width: '1px',
                            height: '14px',
                            background: 'var(--md-sys-color-outline)',
                            opacity: 0.4
                        }}/>

                        <div style={{display: 'flex', alignItems: 'center', marginTop: '-1px'}}>
                            <RatingBadge appId={config.appId} fallback={config.rating} variant="compact"/>
                        </div>
                    </div>

                    <motion.h2
                        initial={{opacity: 0, x: reversed ? -30 : 30}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.6}}
                        viewport={{once: true, margin: "-100px"}}
                        style={{
                            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                            fontWeight: 800,
                            lineHeight: 1.15,
                            marginBottom: '32px',
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
                                transition={{delay: i * 0.1}}
                                viewport={{once: true, margin: "-50px"}}
                                style={{
                                    display: 'flex',
                                    alignItems: 'start',
                                    gap: '16px'
                                }}
                            >
                                <div style={{
                                    marginTop: '4px',
                                    width: '24px', height: '24px',
                                    borderRadius: '50%',
                                    background: `rgba(${accentColorRgb}, 0.15)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <span className="material-symbols-outlined" style={{
                                        fontSize: '16px',
                                        color: accentColor,
                                        fontWeight: 600
                                    }}>check</span>
                                </div>
                                <span style={{
                                    fontSize: '1.15rem',
                                    fontWeight: 500,
                                    lineHeight: 1.5,
                                    color: 'var(--md-sys-color-on-surface-variant)'
                                }}>
                                    {point}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{delay: 0.4}}
                        viewport={{once: true, margin: "-50px"}}
                        style={{display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap'}}
                    >
                        <motion.button
                            onClick={handleNavigate}
                            className="btn-glow"
                            whileHover={{scale: 1.05, boxShadow: `0 8px 24px rgba(${accentColorRgb}, 0.4)`}}
                            whileTap={{scale: 0.95}}
                            style={{
                                backgroundColor: accentColor,
                                color: '#ffffff',
                                textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                            }}
                        >
                            {exploreText} <span className="material-symbols-outlined">arrow_forward</span>
                        </motion.button>

                        <motion.button
                            onClick={handlePlusNavigate}
                            className="btn-outline"
                            whileHover={{scale: 1.05, backgroundColor: `rgba(${accentColorRgb}, 0.08)`}}
                            whileTap={{scale: 0.95}}
                            style={{
                                backgroundColor: 'var(--md-sys-color-surface-container-high)',
                                color: 'var(--md-sys-color-on-surface)',
                                border: '1px solid var(--md-sys-color-outline-variant)'
                            }}
                        >
                            <span className="material-symbols-outlined"
                                  style={{color: accentColor}}>diamond</span> {plusText}
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}