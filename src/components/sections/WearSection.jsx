import React from 'react';
import {motion} from 'framer-motion';
import PixelWatchFrame from '../ui/PixelWatchFrame';
import {PulseWatchScreen, CompassWatchScreen} from './MockWatchScreens';

/**
 * Section highlighting Wear OS capabilities with dual watch visuals.
 *
 * @param {Object} pulseConfig - Pixel Pulse configuration.
 * @param {Object} compassConfig - Pixel Compass configuration.
 * @param {Object} texts - Text content for title and subtitle.
 */
export default function WearSection({pulseConfig, compassConfig, texts}) {
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
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
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
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px'}}>
                    <PixelWatchFrame>
                        <PulseWatchScreen/>
                    </PixelWatchFrame>
                    <div style={{textAlign: 'center'}}>
                        <h3 style={{fontSize: '1.5rem', fontWeight: 700, margin: '0 0 8px'}}>{pulseConfig.appName}</h3>
                        <p style={{margin: 0, opacity: 0.7}}>Standalone Monitoring</p>
                    </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px'}}>
                    <PixelWatchFrame>
                        <CompassWatchScreen/>
                    </PixelWatchFrame>
                    <div style={{textAlign: 'center'}}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            margin: '0 0 8px'
                        }}>{compassConfig.appName}</h3>
                        <p style={{margin: 0, opacity: 0.7}}>Wrist Navigation</p>
                    </div>
                </div>
            </div>
        </section>
    );
}