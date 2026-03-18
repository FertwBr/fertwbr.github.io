import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useNavigate} from 'react-router-dom';

/**
 * SplitChoice
 * High-fidelity split screen navigation component.
 * Features expanding panels, depth parallax effects, and dynamic focus states.
 * Fully responsive: Horizontal split on Desktop, Vertical split on Mobile.
 *
 * @param {Object} props
 * @param {Object} props.pulseConfig - Configuration for Pixel Pulse app.
 * @param {Object} props.compassConfig - Configuration for Pixel Compass app.
 * @param {Object} props.texts - Localized texts for actions.
 * @returns {JSX.Element}
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
            minHeight: '700px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            overflow: 'hidden',
            background: 'var(--md-sys-color-surface)',
            marginTop: '0'
        }} onMouseLeave={handleLeave}>

            <SplitPanel
                side="first"
                config={pulseConfig}
                actionText={texts.pulse_action}
                exploreText={texts.explore}
                isFocused={focusedSide === 'left'}
                isDimmed={focusedSide === 'right'}
                isMobile={isMobile}
                onHover={() => handleHover('left')}
                onClick={() => handleClick('left', '/pixelpulse')}
                gradient="linear-gradient(135deg, var(--md-sys-color-primary-container), var(--md-sys-color-surface-container-high))"
                accentColor="var(--md-sys-color-primary)"
                onAccentColor="var(--md-sys-color-on-primary)"
            />

            <div style={{
                width: isMobile ? '100%' : '1px',
                height: isMobile ? '1px' : '100%',
                background: 'var(--md-sys-color-outline-variant)',
                zIndex: 10,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
            }}>
                <motion.div
                    animate={{
                        opacity: focusedSide ? 0 : 1,
                        [isMobile ? 'width' : 'height']: focusedSide ? '0%' : '20%'
                    }}
                    style={{
                        position: 'absolute',
                        [isMobile ? 'height' : 'width']: '4px',
                        background: 'var(--md-sys-color-on-surface)',
                        borderRadius: '2px',
                        boxShadow: '0 0 20px rgba(var(--md-sys-color-on-surface-rgb), 0.3)'
                    }}
                />
            </div>

            <SplitPanel
                side="second"
                config={compassConfig}
                actionText={texts.compass_action}
                exploreText={texts.explore}
                isFocused={focusedSide === 'right'}
                isDimmed={focusedSide === 'left'}
                isMobile={isMobile}
                onHover={() => handleHover('right')}
                onClick={() => handleClick('right', '/pixelcompass')}
                gradient="linear-gradient(225deg, var(--md-sys-color-tertiary-container), var(--md-sys-color-surface-container-high))"
                accentColor="var(--md-sys-color-tertiary)"
                onAccentColor="var(--md-sys-color-on-tertiary)"
            />
        </div>
    );
}

function SplitPanel({
                        side,
                        config,
                        actionText,
                        exploreText,
                        isFocused,
                        isDimmed,
                        isMobile,
                        onHover,
                        onClick,
                        gradient,
                        accentColor,
                        onAccentColor
                    }) {
    const flexGrowValue = isFocused ? 3.5 : isDimmed ? 0.8 : 1.5;

    return (
        <motion.div
            layout
            onMouseEnter={onHover}
            onClick={onClick}
            animate={{
                flexGrow: flexGrowValue,
                opacity: isDimmed ? 0.6 : 1
            }}
            transition={{type: "spring", stiffness: 120, damping: 20}}
            style={{
                flexBasis: 0,
                width: isMobile ? '100%' : 'auto',
                height: isMobile ? 'auto' : '100%',
                background: gradient,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                willChange: 'flex-grow',
                filter: isDimmed ? 'grayscale(0.9) brightness(0.6)' : 'grayscale(0) brightness(1)'
            }}
        >
            <motion.div
                animate={{
                    scale: isFocused ? 1.5 : 1,
                    opacity: isFocused ? 0.15 : 0.05,
                    rotate: isFocused ? 15 : 0
                }}
                transition={{duration: 1.5, ease: "easeOut"}}
                style={{
                    position: 'absolute',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
                    top: side === 'first' ? '-10%' : 'auto',
                    bottom: side === 'second' ? '-10%' : 'auto',
                    left: side === 'first' ? '-10%' : 'auto',
                    right: side === 'second' ? '-10%' : 'auto',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            <motion.h1
                animate={{
                    scale: isFocused ? 1.3 : 1,
                    [isMobile ? 'y' : 'x']: isFocused ? (side === 'first' ? -60 : 60) : 0,
                    opacity: isFocused ? 0.06 : 0.02
                }}
                transition={{duration: 0.8}}
                style={{
                    position: 'absolute',
                    fontSize: isMobile ? '25vw' : '18vw',
                    fontWeight: 900,
                    color: 'var(--md-sys-color-on-surface)',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    zIndex: 0,
                    letterSpacing: '-0.05em'
                }}
            >
                {config.appName.split(' ')[1].toUpperCase()}
            </motion.h1>

            <motion.div
                layout
                animate={{scale: isFocused ? 1.1 : 1, y: isFocused ? -10 : 0}}
                transition={{type: "spring", stiffness: 200, damping: 25}}
                style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '24px',
                    textAlign: 'center',
                    width: '100%'
                }}
            >
                <motion.div
                    animate={{
                        y: isFocused ? [0, -8, 0] : 0
                    }}
                    transition={{
                        duration: 3,
                        repeat: isFocused ? Infinity : 0,
                        ease: "easeInOut"
                    }}
                >
                    <motion.img
                        layoutId={`icon-${config.appId}`}
                        src={config.appIcon}
                        alt={config.appName}
                        style={{
                            width: 'clamp(70px, 9vw, 140px)',
                            borderRadius: '28px',
                            marginBottom: isMobile ? '16px' : '40px',
                            boxShadow: isFocused
                                ? `0 30px 60px -15px ${accentColor}`
                                : '0 20px 40px -10px rgba(var(--md-sys-color-shadow-rgb), 0.2)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    />
                </motion.div>

                <motion.div
                    animate={{opacity: isFocused ? 1 : 0.8}}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <div style={{
                        padding: '4px 12px',
                        borderRadius: '100px',
                        background: 'rgba(var(--md-sys-color-on-surface-rgb), 0.05)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(var(--md-sys-color-on-surface-rgb), 0.1)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '8px',
                        opacity: isFocused ? 1 : 0,
                        transform: `translateY(${isFocused ? '0px' : '10px'})`,
                        transition: 'all 0.4s ease'
                    }}>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: accentColor
                        }}>
                            {config.appName.split(' ')[0]}
                        </span>
                    </div>

                    <motion.h2
                        layout
                        style={{
                            fontSize: 'clamp(1.8rem, 4.5vw, 4rem)',
                            margin: 0,
                            fontWeight: 800,
                            color: 'var(--md-sys-color-on-surface)',
                            lineHeight: 1.1,
                            letterSpacing: '-1px'
                        }}
                    >
                        {config.appName}
                    </motion.h2>
                </motion.div>

                <AnimatePresence>
                    {(isFocused || isMobile) && (
                        <motion.div
                            initial={{opacity: 0, height: 0, y: 20}}
                            animate={{opacity: 1, height: 'auto', y: 0}}
                            exit={{opacity: 0, height: 0, y: 10}}
                            transition={{delay: 0.15, type: "spring", stiffness: 200, damping: 20}}
                            style={{
                                overflow: 'visible',
                                padding: '10px 40px 50px 40px',
                                margin: '-10px -40px -50px -40px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <p style={{
                                fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
                                marginTop: '16px',
                                fontWeight: 500,
                                color: 'var(--md-sys-color-on-surface-variant)',
                                display: isMobile && !isFocused ? 'none' : 'block',
                                maxWidth: '400px',
                                lineHeight: 1.4
                            }}>
                                {actionText}
                            </p>

                            <motion.div
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                style={{
                                    marginTop: '32px',
                                    padding: '16px 40px',
                                    borderRadius: '100px',
                                    background: accentColor,
                                    color: onAccentColor,
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    boxShadow: `0 8px 25px -5px ${accentColor}`,
                                    opacity: isMobile && !isFocused ? 0 : 1,
                                    pointerEvents: isMobile && !isFocused ? 'none' : 'auto'
                                }}
                            >
                                {exploreText || 'Explore'}
                                <span className="material-symbols-outlined"
                                      style={{fontSize: '22px'}}>arrow_forward</span>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}