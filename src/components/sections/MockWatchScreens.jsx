import React from 'react';
import { motion } from 'framer-motion';

/**
 * PulseWatchScreen
 * Simulates the Wear OS version of Pixel Pulse.
 * Features a pulsing circle and dB reading.
 */
export function PulseWatchScreen() {
    return (
        <div style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: '#000'
        }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        width: '140px', height: '140px',
                        borderRadius: '50%',
                        background: 'var(--md-sys-color-primary)',
                        filter: 'blur(20px)'
                    }}
                />

                <svg width="160" height="160" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="50" cy="50" r="45" stroke="#333" strokeWidth="6" fill="none" />
                    <motion.circle
                        cx="50" cy="50" r="45"
                        stroke="var(--md-sys-color-primary)"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray="283"
                        strokeDashoffset="200"
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: 283 }}
                        animate={{ strokeDashoffset: 180 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                    />
                </svg>

                <div style={{ position: 'absolute', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>42</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-primary)', fontWeight: 500 }}>dB</div>
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: '20px', fontSize: '0.75rem', opacity: 0.7 }}>
                Safe
            </div>
        </div>
    );
}

/**
 * CompassWatchScreen
 * Simulates the Wear OS version of Pixel Compass.
 * Features a rotating bezel and heading info.
 */
export function CompassWatchScreen() {
    const ticks = Array.from({ length: 12 });

    return (
        <div style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: '#000',
            position: 'relative'
        }}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
            >
                {ticks.map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        top: '10px',
                        height: '10px',
                        width: i % 3 === 0 ? '4px' : '2px',
                        background: i === 0 ? 'var(--md-sys-color-tertiary)' : '#444',
                        transform: `rotate(${i * 30}deg)`,
                        transformOrigin: 'center 110px'
                    }} />
                ))}

                <div style={{
                    position: 'absolute', top: '25px',
                    color: 'var(--md-sys-color-tertiary)',
                    fontWeight: 700, fontSize: '1rem',
                    transform: 'rotate(0deg)'
                }}>N</div>
            </motion.div>

            <div style={{ textAlign: 'center', zIndex: 2 }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>340°</div>
                <div style={{ fontSize: '1rem', color: 'var(--md-sys-color-tertiary)', fontWeight: 600, marginTop: '4px' }}>NW</div>
            </div>

            <div style={{ position: 'absolute', bottom: '24px', display: 'flex', gap: '4px', alignItems: 'center', opacity: 0.7 }}>
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>landscape</span>
                <span style={{ fontSize: '0.8rem' }}>420m</span>
            </div>
        </div>
    );
}