import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { parseRoadmap } from '../utils/roadmapParser';

const StatusBadge = ({ status }) => {
    const styles = {
        launched: { bg: 'var(--md-sys-color-primary)', color: 'var(--md-sys-color-on-primary)', icon: 'check_circle', label: 'Released' },
        future: { bg: 'var(--md-sys-color-tertiary)', color: 'var(--md-sys-color-on-tertiary)', icon: 'explore', label: 'Planned' },
        neutral: { bg: 'var(--md-sys-color-outline)', color: 'var(--md-sys-color-surface)', icon: 'info', label: 'Info' }
    };
    const s = styles[status] || styles.neutral;

    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: status === 'launched' ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface-container-high)',
            color: status === 'launched' ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface-variant)',
            padding: '6px 12px', borderRadius: '100px',
            fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px',
            border: `1px solid var(--md-sys-color-outline-variant)`
        }}>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{s.icon}</span>
            {s.label}
        </span>
    );
};

export default function RoadmapViewer({ markdownContent, appConfig, strings }) {
    const [data, setData] = useState({ sections: [] });

    useEffect(() => {
        if (markdownContent) {
            setData(parseRoadmap(markdownContent));
        }
    }, [markdownContent]);

    return (
        <div style={{ paddingBottom: '80px', width: '100%', overflowX: 'hidden' }}>

            <div style={{ marginBottom: '60px', paddingBottom: '30px', borderBottom: '1px solid var(--md-sys-color-outline-variant)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.95rem', fontWeight: 500, flexWrap: 'wrap' }}>
                    <span>{appConfig?.appName}</span>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--md-sys-color-primary)', fontWeight: 700 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>map</span>
                        <span>Roadmap</span>
                    </div>
                </div>
                <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
                    {strings.roadmap_page.title}
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--md-sys-color-on-surface-variant)', marginTop: '12px', maxWidth: '700px' }}>
                    {strings.roadmap_page.subtitle}
                </p>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {data.sections.map((section, sIndex) => {
                    if (section.type === 'intro') return null;

                    const isLaunched = section.status === 'launched';
                    const accentColor = isLaunched ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-tertiary)';

                    return (
                        <motion.div
                            key={sIndex}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: sIndex * 0.1 }}
                            style={{ marginBottom: '60px', position: 'relative' }}
                        >
                            <div style={{
                                position: 'absolute', left: '19px', top: '50px', bottom: '-40px', width: '2px',
                                background: `linear-gradient(to bottom, ${accentColor}60, transparent)`,
                                zIndex: 0
                            }} className="timeline-line"></div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '50%',
                                    background: accentColor, color: 'var(--md-sys-color-surface)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                    boxShadow: `0 0 0 6px var(--md-sys-color-surface), 0 8px 16px rgba(0,0,0,0.2)`
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                                        {isLaunched ? 'check' : 'explore'}
                                    </span>
                                </div>
                                <div>
                                    <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', margin: 0, fontWeight: 700 }}>{section.title}</h2>
                                </div>
                            </div>

                            <div style={{ paddingLeft: 'clamp(40px, 8vw, 60px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px' }}>
                                {section.groups.map((group, gIndex) => (
                                    <motion.div
                                        key={gIndex}
                                        whileHover={{ y: -5 }}
                                        className="glass-card"
                                        style={{
                                            padding: '24px',
                                            borderRadius: '24px',
                                            borderTop: `4px solid ${accentColor}`,
                                            background: `linear-gradient(180deg, var(--md-sys-color-surface-container-low) 0%, transparent 100%)`
                                        }}
                                    >
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', fontWeight: 600 }}>{group.title}</h3>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                            {group.items.map((item, iIndex) => (
                                                <li key={iIndex} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                                    <span className="material-symbols-outlined" style={{
                                                        fontSize: '18px', color: accentColor, marginTop: '2px', flexShrink: 0
                                                    }}>
                                                        {isLaunched ? 'verified' : 'radio_button_unchecked'}
                                                    </span>
                                                    <div>
                                                        {item.title && <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--md-sys-color-on-surface)' }}>{item.title}</strong>}
                                                        <span style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.5 }}>
                                                            {item.desc}
                                                        </span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '60px', padding: 'clamp(24px, 5vw, 40px)', borderRadius: '32px', background: 'var(--md-sys-color-surface-container-low)', border: '1px solid var(--md-sys-color-outline-variant)', boxSizing: 'border-box' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Have a Feature Request?</h3>
                <p style={{ color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '24px', fontSize: '1rem' }}>Pixel Pulse is built for you. Help us shape the future.</p>
                <a href="mailto:fertwbr@gmail.com?subject=Feature Request" className="btn-glow">
                    {strings.roadmap_page.suggest_btn} <span className="material-symbols-outlined">send</span>
                </a>
            </div>

            <style>{`
        @media (max-width: 600px) {
            .timeline-line { left: 19px !important; }
            h2 { font-size: 1.3rem !important; }
        }
      `}</style>
        </div>
    );
}