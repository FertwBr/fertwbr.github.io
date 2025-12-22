import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { parseRoadmap } from '../../utils/roadmapParser';
import { handleContactSupport } from '../../utils/navigationUtils';

/**
 * Renders the Roadmap page.
 * Supports dynamic parsing of roadmap Markdown structure.
 */
export default function RoadmapViewer({ markdownContent, appConfig, strings }) {
    const [data, setData] = useState({ sections: [] });
    const navigate = useNavigate();

    const sourceApp = appConfig.appId.includes('pixelpulse') ? 'pixelpulse' :
        appConfig.appId.includes('compass') ? 'pixelcompass' : 'portfolio';

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
                <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
                    {strings.roadmap_page.title}
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--md-sys-color-on-surface-variant)', marginTop: '12px', maxWidth: '700px', lineHeight: 1.5 }}>
                    {strings.roadmap_page.subtitle}
                </p>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {data.sections.map((section, sIndex) => {
                    if (section.type === 'intro') return null;

                    const isLaunched = section.status === 'launched';
                    const isActive = section.status === 'active';

                    const accentColor = isLaunched ? 'var(--md-sys-color-primary)' :
                        isActive ? 'var(--md-sys-color-tertiary)' :
                            'var(--md-sys-color-outline)';

                    const icon = isLaunched ? 'check_circle' :
                        isActive ? 'construction' :
                            'schedule';

                    return (
                        <motion.div
                            key={sIndex}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: sIndex * 0.1 }}
                            style={{ marginBottom: '80px', position: 'relative' }}
                        >
                            <div style={{
                                position: 'absolute', left: '23px', top: '60px', bottom: '-60px', width: '2px',
                                background: `linear-gradient(to bottom, ${accentColor}40, transparent)`,
                                zIndex: 0
                            }} className="timeline-line"></div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '50%',
                                    background: accentColor, color: 'var(--md-sys-color-surface)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                    boxShadow: `0 0 0 6px var(--md-sys-color-surface), 0 4px 12px rgba(0,0,0,0.15)`
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                                        {icon}
                                    </span>
                                </div>
                                <div>
                                    <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2rem)', margin: 0, fontWeight: 700 }}>{section.title}</h2>
                                </div>
                            </div>

                            <div style={{ paddingLeft: 'clamp(40px, 8vw, 68px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '24px' }}>
                                {section.groups.map((group, gIndex) => (
                                    <motion.div
                                        key={gIndex}
                                        whileHover={{ y: -4, backgroundColor: 'var(--md-sys-color-surface-container-high)' }}
                                        transition={{ duration: 0.2 }}
                                        className="glass-card"
                                        style={{
                                            padding: '24px',
                                            borderRadius: '24px',
                                            borderLeft: `4px solid ${accentColor}`, // Side accent instead of top for cleaner look
                                            background: `var(--md-sys-color-surface-container-low)`,
                                            border: '1px solid var(--md-sys-color-outline-variant)'
                                        }}
                                    >
                                        {group.title !== "General" && (
                                            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>
                                                {group.title}
                                            </h3>
                                        )}
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            {group.items.map((item, iIndex) => (
                                                <li key={iIndex} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                                    <span className="material-symbols-outlined" style={{
                                                        fontSize: '20px', color: accentColor, marginTop: '2px', flexShrink: 0, opacity: 0.8
                                                    }}>
                                                        {isLaunched ? 'check_small' : 'arrow_right'}
                                                    </span>
                                                    <div>
                                                        {item.title && <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--md-sys-color-on-surface)', marginBottom: '2px' }}>{item.title}</strong>}
                                                        <span style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.5, display: 'block' }}>
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

            <div style={{
                marginTop: '80px',
                padding: '40px',
                borderRadius: '32px',
                background: 'linear-gradient(135deg, var(--md-sys-color-secondary-container), var(--md-sys-color-surface-container))',
                border: '1px solid var(--md-sys-color-outline-variant)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                maxWidth: '800px',
                margin: '80px auto 0 auto'
            }}>
                <div style={{
                    width: '64px', height: '64px', borderRadius: '50%',
                    background: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'
                }}>
                    <span className="material-symbols-outlined" style={{fontSize: '32px'}}>lightbulb</span>
                </div>

                <h3 style={{fontSize: '1.8rem', marginBottom: '12px', fontWeight: 700}}>Have a Feature Request?</h3>
                <p style={{
                    color: 'var(--md-sys-color-on-surface-variant)',
                    marginBottom: '32px',
                    fontSize: '1.1rem',
                    maxWidth: '500px',
                    lineHeight: 1.6
                }}>
                    {appConfig?.appName || "Our app"} is built for you. Help us shape the future by sharing your ideas
                    directly with the developer.
                </p>

                <button
                    onClick={() => handleContactSupport('feedback', navigate, {source: sourceApp, platform: 'android'})}
                    className="btn-glow"
                    style={{padding: '16px 32px', fontSize: '1rem'}}
                >
                    {strings.roadmap_page.suggest_btn} <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>

            <style>{`
                @media (max-width: 600px) {
                    .timeline-line { left: 23px !important; }
                    h1 { font-size: 2.2rem !important; }
                }
            `}</style>
        </div>
    );
}