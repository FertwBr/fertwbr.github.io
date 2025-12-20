import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import GooglePixel from '../ui/GooglePixel';
import GetScreenForFeature from '../sections/PlusFeatureVisuals';
import { parsePlusMarkdown } from '../../utils/plusParser';

const FeatureGroup = ({ group, isMobile }) => (
    <div style={{ marginBottom: '40px' }}>
        {group.category && (
            <h3 style={{
                fontSize: '1.4rem', fontWeight: 700, margin: '0 0 24px 0',
                color: 'var(--md-sys-color-primary)', borderBottom: '1px solid var(--md-sys-color-outline-variant)', paddingBottom: '8px',
                textAlign: 'center'
            }}>
                {group.category}
            </h3>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {group.items.map((f, i) => (
                <FeatureCard key={i} feature={f} isMobile={isMobile} />
            ))}
        </div>
    </div>
);

const FeatureCard = ({ feature, isMobile }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="glass-card"
        style={{
            padding: isMobile ? '20px' : '24px',
            borderRadius: '24px',
            border: '1px solid var(--md-sys-color-outline-variant)',
            background: 'var(--md-sys-color-surface-container-lowest)',
        }}
    >
        <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '16px' : '20px',
            alignItems: 'flex-start'
        }}>
            <div style={{
                color: 'var(--md-sys-color-on-secondary-container)',
                background: 'var(--md-sys-color-secondary-container)',
                minWidth: isMobile ? '48px' : '56px',
                height: isMobile ? '48px' : '56px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: isMobile ? 'flex-start' : 'auto'
            }}>
                <span className="material-symbols-outlined" style={{ fontSize: isMobile ? '24px' : '28px' }}>
                    {feature.icon}
                </span>
            </div>

            <div style={{ width: '100%' }}>
                <h4 style={{
                    fontSize: isMobile ? '1.1rem' : '1.2rem',
                    margin: '0 0 8px 0',
                    fontWeight: 700
                }}>
                    {feature.title}
                </h4>
                <div style={{
                    margin: 0,
                    fontSize: isMobile ? '0.95rem' : '1rem',
                    opacity: 0.8,
                    lineHeight: 1.6
                }}>
                    <ReactMarkdown>{feature.desc}</ReactMarkdown>
                </div>
            </div>
        </div>
    </motion.div>
);

const ComparisonTable = ({ data, isMobile }) => {
    const hasLegacy = data[0] && data[0].col3;

    if (isMobile) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {data.map((row, i) => (
                    <div key={i} style={{
                        background: 'var(--md-sys-color-surface)',
                        borderRadius: '16px',
                        border: '1px solid var(--md-sys-color-outline-variant)',
                        overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            padding: '16px 20px',
                            borderBottom: '1px solid var(--md-sys-color-surface-variant)',
                            fontWeight: 700,
                            fontSize: '1rem',
                            color: 'var(--md-sys-color-on-surface)'
                        }}>
                            {row.feature}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                padding: '12px 20px' 
                            }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.6, textTransform: 'uppercase' }}>Free</span>
                                <span style={{ fontSize: '0.95rem', opacity: 0.9, textAlign: 'right' }}>{row.col1}</span>
                            </div>

                            {hasLegacy && (
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center', 
                                    padding: '12px 20px',
                                    backgroundColor: 'rgba(0,0,0,0.02)'
                                }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.5, textTransform: 'uppercase' }}>Legacy</span>
                                    <span style={{ fontSize: '0.95rem', opacity: 0.7, textAlign: 'right' }}>{row.col3}</span>
                                </div>
                            )}

                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                padding: '16px 20px',
                                background: 'var(--md-sys-color-secondary-container)',
                                color: 'var(--md-sys-color-on-secondary-container)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Plus</span>
                                </div>
                                <span style={{ fontWeight: 800, fontSize: '1.1rem', textAlign: 'right' }}>
                                    {row.col2}
                                </span>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div style={{
            width: '100%',
            overflowX: 'auto',
            borderRadius: '24px',
            border: '1px solid var(--md-sys-color-outline-variant)',
            background: 'var(--md-sys-color-surface)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                    <tr style={{ background: 'var(--md-sys-color-surface-container)' }}>
                        <th style={{ padding: '24px', textAlign: 'left', width: '40%' }}>Feature</th>
                        <th style={{ padding: '24px', textAlign: 'center' }}>Free</th>
                        <th style={{ padding: '24px', textAlign: 'center', color: 'var(--md-sys-color-primary)' }}>Plus</th>
                        {hasLegacy && <th style={{ padding: '24px', textAlign: 'center', opacity: 0.7 }}>Legacy</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)' }}>
                            <td style={{ padding: '20px 24px', fontWeight: 600 }}>{row.feature}</td>
                            <td style={{ padding: '20px', textAlign: 'center', opacity: 0.7 }}>{row.col1}</td>
                            <td style={{ padding: '20px', textAlign: 'center', fontWeight: 800, color: 'var(--md-sys-color-primary)', fontSize: '1.1rem' }}>{row.col2}</td>
                            {hasLegacy && <td style={{ padding: '20px', textAlign: 'center', opacity: 0.6 }}>{row.col3}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const TextBlockSection = ({ data }) => {
    if (!data) return null;
    return (
        <div style={{ marginBottom: '80px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '40px', textAlign: 'center' }}>{data.title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                {data.items.map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="glass-card"
                        style={{
                            padding: '32px', borderRadius: '24px',
                            background: 'var(--md-sys-color-surface-container)',
                            border: '1px solid var(--md-sys-color-outline-variant)'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                            {item.icon && (
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '12px',
                                    background: 'var(--md-sys-color-secondary-container)', color: 'var(--md-sys-color-on-secondary-container)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                </div>
                            )}
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{item.title}</h3>
                        </div>
                        <div className="markdown-body" style={{ opacity: 0.8, lineHeight: 1.6 }}>
                            <ReactMarkdown>{item.content}</ReactMarkdown>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default function PlusViewer({ markdownContent, appConfig, strings }) {
    const [content, setContent] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    const heroFeatureIcon = appConfig?.name === 'Pixel Compass' ? 'explore' : 'equalizer';

    useEffect(() => {
        if (markdownContent) setContent(parsePlusMarkdown(markdownContent));

        const checkMobile = () => setIsMobile(window.innerWidth < 1000);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [markdownContent]);

    const handleBuy = () => {
        const scheme = appConfig?.scheme;
        const appId = appConfig?.appId;

        const deepLinkBuy = `${scheme}://open/buy`;
        const playStoreWeb = `https://play.google.com/store/apps/details?id=${appId}`;

        window.location.href = deepLinkBuy;

        setTimeout(() => {
            if (!document.hidden) {
                window.open(playStoreWeb, '_blank');
            }
        }, 1000);
    };

    if (!content) return null;

    const gradientButtonCheck = {
        background: `linear-gradient(135deg, ${appConfig?.seedColor || 'var(--md-sys-color-primary)'}, var(--md-sys-color-tertiary))`,
        color: '#ffffff',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
    };

    return (
        <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 20px 100px 20px' }}>

            <div style={{
                display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr',
                gap: '40px', alignItems: 'center', minHeight: '85vh', marginBottom: '80px'
            }}>
                <div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span style={{
                            background: 'var(--md-sys-color-primary)', color: 'var(--md-sys-color-on-primary)',
                            padding: '8px 20px', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.5px'
                        }}>
                            {strings.plus_page.badge || 'PLUS'}
                        </span>
                        <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, margin: '24px 0', lineHeight: 1.1 }}>
                            {strings.plus_page.title}
                        </h1>
                        <div className="markdown-body" style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '40px' }}>
                            <ReactMarkdown>{content.intro}</ReactMarkdown>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(0,0,0,0.3)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleBuy}
                            style={{
                                padding: '20px 48px',
                                borderRadius: '100px',
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                ...gradientButtonCheck
                            }}
                        >
                            {strings.plus_page.cta}
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </motion.button>
                    </motion.div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <motion.div
                        initial={{ rotate: -5, y: 50, opacity: 0 }}
                        animate={{ rotate: 0, y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, type: 'spring' }}
                        style={{ transform: isMobile ? 'scale(0.85)' : 'none' }}
                    >
                        <GooglePixel borderColor="#202020">
                            <GetScreenForFeature
                                featureIcon={heroFeatureIcon}
                                seedColor={appConfig?.seedColor}
                                appName={appConfig?.name}

                            />
                        </GooglePixel>
                    </motion.div>
                </div>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', marginTop: '40px' }}>
                {content.featuresGroups.map((group, i) => (
                    <FeatureGroup key={i} group={group} isMobile={isMobile} />
                ))}
            </div>

            {content.toolsSection && (
                <div style={{ marginTop: '120px' }}>
                    <TextBlockSection data={content.toolsSection} />
                </div>
            )}

            {content.licensingSection && (
                <div style={{ marginTop: '40px' }}>
                    <TextBlockSection data={content.licensingSection} />
                </div>
            )}

            {content.comparison.length > 0 && (
                <div style={{ marginTop: '120px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '40px' }}>
                        Compare Editions
                    </h2>
                    <ComparisonTable data={content.comparison} isMobile={isMobile} />
                </div>
            )}

            {content.whySection && content.whySection.items.length > 0 && (
                <div style={{ marginTop: '120px', textAlign: 'center', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px' }}>{content.whySection.title}</h2>
                    {content.whySection.intro && (
                        <div style={{ maxWidth: '700px', margin: '0 auto 40px auto', opacity: 0.8, fontSize: '1.1rem' }}>
                            <ReactMarkdown>{content.whySection.intro}</ReactMarkdown>
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', textAlign: 'left' }}>
                        {content.whySection.items.map((item, i) => (
                            <motion.div
                                key={i} whileHover={{ y: -5 }} className="glass-card"
                                style={{ padding: '32px', borderRadius: '24px', background: 'var(--md-sys-color-surface-container)' }}
                            >
                                <div style={{ color: 'var(--md-sys-color-primary)', marginBottom: '20px' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>{item.icon}</span>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>{item.title}</h3>
                                <div style={{ opacity: 0.7, fontSize: '1rem', lineHeight: 1.6 }}>
                                    <ReactMarkdown components={{ p: 'span' }}>{item.desc}</ReactMarkdown>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            <div style={{
                marginTop: '80px',
                textAlign: 'center',
                background: 'linear-gradient(180deg, var(--md-sys-color-surface) 0%, var(--md-sys-color-surface-container) 100%)',
                borderRadius: '0 0 32px 32px',
                padding: '80px 24px 100px 24px',
                borderTop: '1px solid var(--md-sys-color-outline-variant)',
            }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                        fontWeight: 800,
                        marginBottom: '16px',
                        color: 'var(--md-sys-color-on-surface)'
                    }}>
                        {strings.plus.title}
                    </h2>

                    <p style={{
                        fontSize: '1.1rem',
                        opacity: 0.7,
                        marginBottom: '40px',
                        lineHeight: 1.6,
                        color: 'var(--md-sys-color-on-surface-variant)'
                    }}>
                        {strings.plus.desc}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleBuy}
                            style={{
                                padding: '20px 56px',
                                borderRadius: '100px',
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                ...gradientButtonCheck,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                            }}
                        >
                            {strings.plus_page.cta}
                            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                                arrow_forward
                            </span>
                        </motion.button>
                    </div>
                </div>
            </div>

        </div>
    );
}