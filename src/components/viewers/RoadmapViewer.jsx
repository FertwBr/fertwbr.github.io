// src/components/viewers/RoadmapViewer.jsx
import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import {parseRoadmap} from '../../utils/roadmapParser';
import {handleContactSupport} from '../../utils/navigationUtils';
import ViewerHeader from '../common/ViewerHeader';

/**
 * Renders the Roadmap page.
 * Supports dynamic parsing of roadmap Markdown structure.
 */
export default function RoadmapViewer({markdownContent, appConfig, strings}) {
    const [data, setData] = useState({sections: []});
    const navigate = useNavigate();

    const sourceApp = appConfig.appId.includes('pixelpulse') ? 'pixelpulse' :
        appConfig.appId.includes('compass') ? 'pixelcompass' : 'portfolio';

    useEffect(() => {
        if (markdownContent) {
            setData(parseRoadmap(markdownContent));
        }
    }, [markdownContent]);

    return (
        <div className="viewer-container" style={{paddingBottom: '80px', overflowX: 'hidden'}}>

            <ViewerHeader
                appName={appConfig?.appName}
                icon="map"
                title={strings.roadmap_page?.title || "Roadmap"}
                subtitle={strings.roadmap_page?.subtitle}
            />

            <div style={{maxWidth: '1000px', margin: '0 auto'}}>
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
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: sIndex * 0.1}}
                            style={{marginBottom: '80px', position: 'relative'}}
                        >
                            <div
                                className="roadmap-timeline-line"
                                style={{background: `linear-gradient(to bottom, ${accentColor}40, transparent)`}}
                            />

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                marginBottom: '32px',
                                position: 'relative',
                                zIndex: 1
                            }}>
                                <div className="roadmap-node-icon" style={{background: accentColor}}>
                                    <span className="material-symbols-outlined"
                                          style={{fontSize: '28px', color: 'var(--md-sys-color-on-primary)'}}>
                                        {icon}
                                    </span>
                                </div>
                                <div>
                                    <h2 style={{
                                        fontSize: 'clamp(1.6rem, 4vw, 2rem)',
                                        margin: 0,
                                        fontWeight: 700,
                                        color: 'var(--md-sys-color-on-surface)'
                                    }}>{section.title}</h2>
                                </div>
                            </div>

                            <div style={{
                                paddingLeft: 'clamp(40px, 8vw, 68px)',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                                gap: '24px'
                            }}>
                                {section.groups.map((group, gIndex) => (
                                    <motion.div
                                        key={gIndex}
                                        whileHover={{
                                            y: -4,
                                            backgroundColor: 'var(--md-sys-color-surface-container-high)'
                                        }}
                                        transition={{duration: 0.2}}
                                        className="roadmap-card"
                                        style={{borderLeft: `4px solid ${accentColor}`}}
                                    >
                                        {group.title !== "General" && (
                                            <h3 style={{
                                                fontSize: '1.1rem',
                                                marginBottom: '16px',
                                                fontWeight: 700,
                                                color: 'var(--md-sys-color-on-surface)'
                                            }}>
                                                {group.title}
                                            </h3>
                                        )}
                                        <ul style={{
                                            listStyle: 'none',
                                            padding: 0,
                                            margin: 0,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '16px'
                                        }}>
                                            {group.items.map((item, iIndex) => (
                                                <li key={iIndex}
                                                    style={{display: 'flex', gap: '12px', alignItems: 'flex-start'}}>
                                                    <span className="material-symbols-outlined" style={{
                                                        fontSize: '20px',
                                                        color: accentColor,
                                                        marginTop: '2px',
                                                        flexShrink: 0,
                                                        opacity: 0.8
                                                    }}>
                                                        {isLaunched ? 'check_small' : 'arrow_right'}
                                                    </span>
                                                    <div>
                                                        {item.title && <strong style={{
                                                            display: 'block',
                                                            fontSize: '0.95rem',
                                                            color: 'var(--md-sys-color-on-surface)',
                                                            marginBottom: '2px'
                                                        }}>{item.title}</strong>}
                                                        <span style={{
                                                            fontSize: '0.9rem',
                                                            color: 'var(--md-sys-color-on-surface-variant)',
                                                            lineHeight: 1.5,
                                                            display: 'block'
                                                        }}>
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

                <h3 style={{
                    fontSize: '1.8rem',
                    marginBottom: '12px',
                    fontWeight: 700,
                    color: 'var(--md-sys-color-on-surface)'
                }}>{strings.roadmap_page?.contact_title || "Have a Feature Request?"}</h3>
                <p style={{
                    color: 'var(--md-sys-color-on-surface-variant)',
                    marginBottom: '32px',
                    fontSize: '1.1rem',
                    maxWidth: '500px',
                    lineHeight: 1.6
                }}>
                    {strings.roadmap_page?.contact_desc || "Help us shape the future by sharing your ideas directly with the developer."}
                </p>

                <button
                    onClick={() => handleContactSupport('feedback', navigate, {source: sourceApp, platform: 'android'})}
                    className="btn-glow"
                    style={{padding: '16px 32px', fontSize: '1rem'}}
                >
                    {strings.roadmap_page?.suggest_btn || "Suggest a Feature"} <span
                    className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}