import React from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import PixelWatchFrame from '../ui/PixelWatchFrame';
import {PulseWatchScreen, CompassWatchScreen} from './MockWatchScreens';

/**
 * Section highlighting Wear OS capabilities with dual watch visuals.
 * The watch frames are interactive and allow direct navigation to the respective apps.
 *
 * @param {Object} props
 * @param {Object} props.pulseConfig
 * @param {Object} props.compassConfig
 * @param {Object} props.texts
 * @returns {JSX.Element}
 */
export default function WearSection({pulseConfig, compassConfig, texts}) {
    const navigate = useNavigate();

    return (
        <section style={{
            padding: '120px 24px',
            textAlign: 'center',
            background: 'linear-gradient(to bottom, transparent, var(--md-sys-color-surface-container-low) 30%, transparent)',
            overflow: 'hidden'
        }}>
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{margin: "-100px"}}
                style={{maxWidth: '800px', margin: '0 auto 80px'}}
            >
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '6px 16px', borderRadius: '100px',
                    background: 'rgba(var(--md-sys-color-on-surface-rgb), 0.05)',
                    border: '1px solid rgba(var(--md-sys-color-on-surface-rgb), 0.1)',
                    marginBottom: '24px'
                }}>
                    <span className="material-symbols-outlined" style={{fontSize: '18px'}}>watch</span>
                    <span style={{fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.5px'}}>WEAR OS</span>
                </div>

                <h2 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: 800,
                    marginBottom: '24px',
                    lineHeight: 1.1
                }}>
                    {texts.title}
                </h2>
                <p style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                    color: 'var(--md-sys-color-on-surface-variant)',
                    lineHeight: 1.6
                }}>
                    {texts.subtitle}
                </p>
            </motion.div>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '80px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <motion.div
                    onClick={() => navigate('/pixelpulse')}
                    whileHover={{scale: 1.05, y: -10}}
                    whileTap={{scale: 0.95}}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '32px',
                        cursor: 'pointer'
                    }}
                >
                    <PixelWatchFrame>
                        <PulseWatchScreen/>
                    </PixelWatchFrame>
                    <div style={{textAlign: 'center'}}>
                        <h3 style={{fontSize: '1.5rem', fontWeight: 700, margin: '0 0 8px'}}>{pulseConfig.appName}</h3>
                        <p style={{margin: 0, opacity: 0.7}}>{texts.pulse_label}</p>
                    </div>
                </motion.div>

                <motion.div
                    onClick={() => navigate('/pixelcompass')}
                    whileHover={{scale: 1.05, y: -10}}
                    whileTap={{scale: 0.95}}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '32px',
                        cursor: 'pointer'
                    }}
                >
                    <PixelWatchFrame>
                        <CompassWatchScreen/>
                    </PixelWatchFrame>
                    <div style={{textAlign: 'center'}}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            margin: '0 0 8px'
                        }}>{compassConfig.appName}</h3>
                        <p style={{margin: 0, opacity: 0.7}}>{texts.compass_label}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}