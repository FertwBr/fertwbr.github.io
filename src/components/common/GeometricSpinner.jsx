import React from 'react';
import {motion} from 'framer-motion';

/**
 * Modern geometric loading spinner using Framer Motion.
 * Features glassmorphism effects and Material 3 theme colors.
 * Purely visual (no text) to avoid localization/translation requirements.
 * Use the ?testLoading=true URL parameter to preview this component without network latency.
 *
 * @returns {JSX.Element}
 */
export default function GeometricSpinner() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            width: '100%',
            gap: '32px'
        }}>
            <div style={{position: 'relative', width: '100px', height: '100px'}}>
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                        borderRadius: ["30%", "50%", "30%"]
                    }}
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        times: [0, 0.5, 1],
                        repeat: Infinity
                    }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, var(--md-sys-color-primary), var(--md-sys-color-primary-container))',
                        opacity: 0.7,
                        filter: 'blur(8px)'
                    }}
                />
                <motion.div
                    animate={{
                        scale: [1, 1.4, 1],
                        rotate: [0, -180, -360],
                        borderRadius: ["50%", "20%", "50%"]
                    }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                        times: [0, 0.5, 1],
                        repeat: Infinity
                    }}
                    style={{
                        position: 'absolute',
                        inset: 10,
                        background: 'linear-gradient(135deg, var(--md-sys-color-tertiary), var(--md-sys-color-secondary-container))',
                        opacity: 0.5,
                        filter: 'blur(12px)'
                    }}
                />
                <motion.div
                    animate={{
                        scale: [0.9, 1.1, 0.9],
                        rotate: [0, 90, 0]
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.5, 1],
                        repeat: Infinity
                    }}
                    style={{
                        position: 'absolute',
                        inset: 20,
                        background: 'rgba(var(--md-sys-color-surface-container-high-rgb), 0.4)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <motion.div
                        animate={{opacity: [0.4, 1, 0.4], scale: [0.8, 1, 0.8]}}
                        transition={{duration: 1.5, repeat: Infinity, ease: "easeInOut"}}
                        style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: 'var(--md-sys-color-primary)'
                        }}
                    />
                </motion.div>
            </div>

            <div style={{display: 'flex', gap: '8px'}}>
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        animate={{
                            scale: [0.6, 1.2, 0.6],
                            opacity: [0.3, 1, 0.3],
                            backgroundColor: [
                                'var(--md-sys-color-on-surface-variant)',
                                'var(--md-sys-color-primary)',
                                'var(--md-sys-color-on-surface-variant)'
                            ]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.2
                        }}
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}