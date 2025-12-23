import React from 'react';
import {motion} from 'framer-motion';

/**
 * Visual component for Sound Wave animation.
 * @param {Object} props - Component props.
 * @param {string} props.seedColor - Color for the visualization.
 * @returns {JSX.Element}
 */
const SoundWaveVisual = ({seedColor}) => (
    <div style={{
        padding: '40px 24px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
    }}>
        <div style={{marginBottom: '40px', textAlign: 'center'}}>
            <div style={{fontSize: '14px', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '2px'}}>Current
                Level
            </div>
            <div style={{fontSize: '64px', fontWeight: 800, color: 'var(--md-sys-color-on-surface)', lineHeight: 1}}>
                68<span style={{fontSize: '24px', opacity: 0.5}}>dB</span>
            </div>
        </div>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', height: '120px'}}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <motion.div
                    key={i}
                    animate={{
                        height: [20, Math.random() * 100 + 20, 20],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.1
                    }}
                    style={{
                        width: '12px',
                        background: seedColor || 'var(--md-sys-color-primary)',
                        borderRadius: '100px',
                    }}
                />
            ))}
        </div>

        <div style={{
            marginTop: '40px',
            padding: '16px',
            background: 'var(--md-sys-color-primary-container)',
            borderRadius: '16px',
            color: 'var(--md-sys-color-on-primary-container)',
            textAlign: 'center',
            fontWeight: 600
        }}>
            Recording Session...
        </div>
    </div>
);

/**
 * Visual component for Compass animation.
 * @param {Object} props - Component props.
 * @param {string} props.seedColor - Color for the visualization.
 * @returns {JSX.Element}
 */
const CompassVisual = ({seedColor}) => (
    <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
    }}>
        <div style={{
            width: '240px', height: '240px', borderRadius: '50%',
            background: 'var(--md-sys-color-surface-container-high)',
            position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
        }}>
            {['N', 'E', 'S', 'W'].map((cardinal, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    top: i === 0 ? '10px' : 'auto', bottom: i === 2 ? '10px' : 'auto',
                    left: i === 3 ? '10px' : 'auto', right: i === 1 ? '10px' : 'auto',
                    fontWeight: 'bold', color: i === 0 ? 'var(--md-sys-color-error)' : 'inherit'
                }}>{cardinal}</div>
            ))}

            <motion.div
                animate={{rotate: [0, 15, -10, 5, 0]}}
                transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
                style={{width: '20px', height: '180px', position: 'relative'}}
            >
                <div style={{
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    height: '50%',
                    background: 'var(--md-sys-color-error)',
                    borderRadius: '10px 10px 0 0'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: '50%',
                    background: 'var(--md-sys-color-on-surface)',
                    borderRadius: '0 0 10px 10px'
                }}></div>
            </motion.div>
        </div>

        <div style={{marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%'}}>
            <div style={{
                padding: '16px',
                background: 'var(--md-sys-color-surface-container)',
                borderRadius: '16px',
                textAlign: 'center'
            }}>
                <div style={{fontSize: '12px', opacity: 0.7}}>Altitude</div>
                <div style={{fontWeight: 'bold'}}>842m</div>
            </div>
            <div style={{
                padding: '16px',
                background: 'var(--md-sys-color-surface-container)',
                borderRadius: '16px',
                textAlign: 'center'
            }}>
                <div style={{fontSize: '12px', opacity: 0.7}}>Pressure</div>
                <div style={{fontWeight: 'bold'}}>1012 hPa</div>
            </div>
        </div>
    </div>
);

/**
 * Returns the appropriate feature screen visualization based on app ID.
 *
 * @param {Object} props
 * @param {string} props.seedColor - Theme seed color.
 * @param {string} props.appId - Application Identifier.
 * @returns {JSX.Element}
 */
export default function GetScreenForFeature({seedColor, appId}) {
    if (appId && appId.includes('pixelcompass')) {
        return <CompassVisual seedColor={seedColor}/>;
    }
    return <SoundWaveVisual seedColor={seedColor}/>;
}