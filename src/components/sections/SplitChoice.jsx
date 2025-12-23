import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useNavigate} from 'react-router-dom';

/**
 * SplitChoice
 * High-fidelity split screen navigation component.
 * Features expanding panels, depth parallax effects, and dynamic focus states.
 * Fully responsive: Horizontal split on Desktop, Vertical split on Mobile.
 *
 * @param {Object} pulseConfig - Configuration for Pixel Pulse app.
 * @param {Object} compassConfig - Configuration for Pixel Compass app.
 * @param {Object} texts - Localized texts for actions.
 */
export default function SplitChoice({pulseConfig, compassConfig, texts}) {
    const [focusedSide, setFocusedSide] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleHover = (side) => {
        if (!isMobile) setFocusedSide(side);
    };

    const handleLeave = () => {
        if (!isMobile) setFocusedSide(null);
    };

    const handleClick = (side, route) => {
        if (isMobile && focusedSide !== side) {
            setFocusedSide(side);
        } else {
            navigate(route);
        }
    };

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '85vh',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            overflow: 'hidden',
            background: '#000',
            marginTop: '0'
        }} onMouseLeave={handleLeave}>

            <SplitPanel
                side="first"
                config={pulseConfig}
                actionText={texts.pulse_action}
                isFocused={focusedSide === 'left'}
                isDimmed={focusedSide === 'right'}
                isMobile={isMobile}
                onHover={() => handleHover('left')}
                onClick={() => handleClick('left', '/pixelpulse')}
                gradient="linear-gradient(135deg, var(--md-sys-color-primary-container), #1a1a1f)"
                accentColor="var(--md-sys-color-primary)"
            />

            <div style={{
                width: isMobile ? '100%' : '1px',
                height: isMobile ? '1px' : '100%',
                background: 'rgba(255,255,255,0.1)',
                zIndex: 10,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <motion.div
                    animate={{
                        opacity: focusedSide ? 0 : 1,
                        [isMobile ? 'width' : 'height']: focusedSide ? '0%' : '20%'
                    }}
                    style={{
                        position: 'absolute',
                        [isMobile ? 'height' : 'width']: '4px',
                        background: '#fff',
                        borderRadius: '2px',
                        boxShadow: '0 0 20px rgba(255,255,255,0.5)'
                    }}
                />
            </div>

            <SplitPanel
                side="second"
                config={compassConfig}
                actionText={texts.compass_action}
                isFocused={focusedSide === 'right'}
                isDimmed={focusedSide === 'left'}
                isMobile={isMobile}
                onHover={() => handleHover('right')}
                onClick={() => handleClick('right', '/pixelcompass')}
                gradient="linear-gradient(225deg, var(--md-sys-color-tertiary-container), #1a1a1f)"
                accentColor="var(--md-sys-color-tertiary)"
            />
        </div>
    );
}

function SplitPanel({
                        side,
                        config,
                        actionText,
                        isFocused,
                        isDimmed,
                        isMobile,
                        onHover,
                        onClick,
                        gradient,
                        accentColor
                    }) {
    // Animation properties based on orientation
    const flexValue = isFocused ? 3 : isDimmed ? 1 : 1.5;

    return (
        <motion.div
            layout
            onMouseEnter={onHover}
            onClick={onClick}
            animate={{
                flex: flexValue,
                filter: isDimmed ? 'grayscale(0.8) brightness(0.4)' : 'grayscale(0) brightness(1)'
            }}
            transition={{type: "spring", stiffness: 150, damping: 25}}
            style={{
                [isMobile ? 'width' : 'height']: '100%',
                background: gradient,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden'
            }}
        >
            <motion.h1
                animate={{
                    scale: isFocused ? 1.2 : 1,
                    [isMobile ? 'y' : 'x']: isFocused ? (side === 'first' ? -50 : 50) : 0,
                    opacity: isFocused ? 0.1 : 0.05
                }}
                transition={{duration: 0.8}}
                style={{
                    position: 'absolute',
                    fontSize: isMobile ? '20vw' : '15vw',
                    fontWeight: 900,
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    zIndex: 0
                }}
            >
                {config.appName.split(' ')[1].toUpperCase()}
            </motion.h1>

            <motion.div
                layout
                animate={{scale: isFocused ? 1.05 : 1}}
                style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    textAlign: 'center',
                    width: '100%'
                }}
            >
                <motion.img
                    layoutId={`icon-${config.appId}`}
                    src={config.appIcon}
                    alt={config.appName}
                    style={{
                        width: 'clamp(60px, 8vw, 120px)',
                        borderRadius: '22px',
                        marginBottom: isMobile ? '16px' : '32px',
                        boxShadow: `0 20px 50px -10px ${isFocused ? accentColor : 'rgba(0,0,0,0.3)'}`
                    }}
                />

                <motion.h2
                    layout
                    style={{
                        fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
                        margin: 0,
                        fontWeight: 800,
                        color: 'var(--md-sys-color-on-surface)',
                        lineHeight: 1.1
                    }}
                >
                    {config.appName}
                </motion.h2>

                <AnimatePresence>
                    {(isFocused || isMobile) && (
                        <motion.div
                            initial={{opacity: 0, height: 0}}
                            animate={{opacity: 1, height: 'auto'}}
                            exit={{opacity: 0, height: 0}}
                            transition={{delay: 0.1}}
                            style={{overflow: 'hidden'}}
                        >
                            <p style={{
                                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                                marginTop: '12px',
                                fontWeight: 500,
                                color: 'var(--md-sys-color-on-surface-variant)',
                                display: isMobile && !isFocused ? 'none' : 'block'
                            }}>
                                {actionText}
                            </p>

                            <div style={{
                                marginTop: '24px',
                                padding: '12px 32px',
                                borderRadius: '100px',
                                background: accentColor,
                                color: '#fff',
                                fontWeight: 600,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                opacity: isMobile && !isFocused ? 0 : 1
                            }}>
                                Explore
                                <span className="material-symbols-outlined"
                                      style={{fontSize: '20px'}}>arrow_forward</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}