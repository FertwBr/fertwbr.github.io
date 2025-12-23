import React from 'react';
import {motion} from 'framer-motion';
import {useLanguage} from '../../context/LanguageContext';

/**
 * PulseMockScreen
 * Simulates the UI of Pixel Pulse with animated audio bars and dB reading.
 */
export function PulseMockScreen() {
    const {content} = useLanguage();
    const t = content.apps_home?.pulse_section?.mock_ui || {};

    const bars = Array.from({length: 12});

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: '60px 24px',
            background: 'linear-gradient(180deg, var(--md-sys-color-surface) 0%, var(--md-sys-color-surface-container) 100%)',
            color: 'var(--md-sys-color-on-surface)'
        }}>
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    padding: '6px 16px',
                    borderRadius: '100px',
                    background: 'var(--md-sys-color-primary-container)',
                    color: 'var(--md-sys-color-on-primary-container)',
                    marginBottom: '24px'
                }}>
                    {t.status || "Safe Level"}
                </div>

                <div style={{position: 'relative', textAlign: 'center'}}>
                    <h1 style={{fontSize: '5rem', fontWeight: 700, margin: 0, lineHeight: 1}}>
                        {t.reading || "45"}
                    </h1>
                    <span style={{fontSize: '1.5rem', color: 'var(--md-sys-color-on-surface-variant)'}}>
                        {t.unit || "dB"}
                    </span>
                </div>

                <div style={{display: 'flex', alignItems: 'flex-end', gap: '6px', height: '120px', marginTop: '60px'}}>
                    {bars.map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                height: [20, Math.random() * 80 + 20, 20],
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: i * 0.05
                            }}
                            style={{
                                width: '12px',
                                background: 'var(--md-sys-color-primary)',
                                borderRadius: '100px',
                                opacity: 0.8
                            }}
                        />
                    ))}
                </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 'auto'}}>
                <Stat label={t.label_min || "Min"} value="32"/>
                <Stat label={t.label_avg || "Avg"} value="48"/>
                <Stat label={t.label_max || "Max"} value="65"/>
            </div>
        </div>
    );
}

/**
 * CompassMockScreen
 * Simulates the UI of Pixel Compass with a rotating dial and sensor data.
 */
export function CompassMockScreen() {
    const {content} = useLanguage();
    const t = content.apps_home?.compass_section?.mock_ui || {};

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: '60px 24px',
            background: 'linear-gradient(180deg, var(--md-sys-color-surface) 0%, var(--md-sys-color-surface-container) 100%)',
            color: 'var(--md-sys-color-on-surface)'
        }}>
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                <div style={{
                    position: 'relative',
                    width: '220px',
                    height: '220px',
                    marginBottom: '40px'
                }}>
                    <motion.div
                        animate={{rotate: 360}}
                        transition={{duration: 20, ease: "linear", repeat: Infinity}}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            border: '2px dashed var(--md-sys-color-outline-variant)',
                            position: 'absolute'
                        }}
                    />
                    <motion.div
                        animate={{rotate: [0, -10, 5, 0]}}
                        transition={{duration: 8, repeat: Infinity, repeatType: "reverse"}}
                        style={{
                            position: 'absolute',
                            top: '50%', left: '50%',
                            width: '4px', height: '100px',
                            background: 'var(--md-sys-color-tertiary)',
                            borderRadius: '2px',
                            transformOrigin: 'top center',
                            marginTop: '0px',
                            marginLeft: '-2px',
                            zIndex: 2
                        }}
                    />
                    <div style={{
                        position: 'absolute', inset: '10px', borderRadius: '50%',
                        border: '8px solid var(--md-sys-color-surface-container-high)'
                    }}/>
                    <div style={{
                        position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
                        color: 'var(--md-sys-color-tertiary)', fontWeight: 'bold'
                    }}>N
                    </div>
                </div>

                <h1 style={{fontSize: '4rem', fontWeight: 700, margin: 0, lineHeight: 1}}>
                    {t.heading || "340"}°
                </h1>
                <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 500,
                    color: 'var(--md-sys-color-tertiary)',
                    letterSpacing: '2px'
                }}>
                    {t.direction || "NW"}
                </span>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                <Card label={t.label_alt || "Altitude"} value={t.value_alt || "420m"} icon="landscape"/>
                <Card label={t.label_pressure || "Pressure"} value={t.value_pressure || "1013 hPa"} icon="speed"/>
            </div>
        </div>
    );
}

function Stat({label, value}) {
    return (
        <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '0.8rem', color: 'var(--md-sys-color-on-surface-variant)'}}>{label}</div>
            <div style={{fontSize: '1.2rem', fontWeight: 600}}>{value}</div>
        </div>
    );
}

function Card({label, value, icon}) {
    return (
        <div style={{
            padding: '16px',
            borderRadius: '16px',
            background: 'var(--md-sys-color-surface-container-high)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        }}>
            <span className="material-symbols-outlined"
                  style={{fontSize: '20px', color: 'var(--md-sys-color-on-surface-variant)'}}>{icon}</span>
            <div>
                <div style={{fontSize: '0.8rem', opacity: 0.7}}>{label}</div>
                <div style={{fontWeight: 600}}>{value}</div>
            </div>
        </div>
    );
}