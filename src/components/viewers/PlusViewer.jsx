import React, {useState, useEffect, useRef} from 'react';
import ReactMarkdown from 'react-markdown';
import {motion, AnimatePresence} from 'framer-motion';
import GooglePixel from '../ui/GooglePixel';
import GetScreenForFeature from '../sections/PlusFeatureVisuals';
import {parsePlusMarkdown} from '../../utils/plusParser';

/**
 * Renders a group of features with a category title.
 *
 * @param {Object} props
 * @param {Object} props.group
 * @param {boolean} props.isMobile
 * @returns {JSX.Element}
 */
const FeatureGroup = ({group, isMobile}) => (
    <div style={{marginBottom: '40px'}}>
        {group.category && (
            <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                margin: '0 0 24px 0',
                color: 'var(--md-sys-color-primary)',
                borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                paddingBottom: '8px',
                textAlign: 'center'
            }}>
                {group.category}
            </h3>
        )}
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            {group.items.map((f, i) => (
                <FeatureCard key={i} feature={f} isMobile={isMobile}/>
            ))}
        </div>
    </div>
);

/**
 * Renders an individual feature card.
 *
 * @param {Object} props
 * @param {Object} props.feature
 * @param {boolean} props.isMobile
 * @returns {JSX.Element}
 */
const FeatureCard = ({feature, isMobile}) => (
    <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.2}}
        transition={{duration: 0.5}}
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
                <span className="material-symbols-outlined" style={{fontSize: isMobile ? '24px' : '28px'}}>
                    {feature.icon}
                </span>
            </div>

            <div style={{width: '100%', color: 'var(--md-sys-color-on-surface)'}}>
                <h4 style={{
                    fontSize: isMobile ? '1.1rem' : '1.2rem',
                    margin: '0 0 8px 0',
                    fontWeight: 700
                }}>
                    {feature.title}
                </h4>
                <div className="markdown-body" style={{
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

/**
 * Renders a comparison table between editions.
 *
 * @param {Object} props
 * @param {Array} props.data
 * @param {boolean} props.isMobile
 * @returns {JSX.Element}
 */
const ComparisonTable = ({data, isMobile}) => {
    const hasLegacy = data[0] && data[0].col3;

    if (isMobile) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {data.map((row, i) => (
                    <div key={i} style={{
                        background: 'var(--md-sys-color-surface)',
                        borderRadius: '16px',
                        border: '1px solid var(--md-sys-color-outline-variant)',
                        overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(var(--md-sys-color-shadow-rgb), 0.05)'
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

                        <div style={{display: 'flex', flexDirection: 'column'}}>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '12px 20px',
                                color: 'var(--md-sys-color-on-surface)'
                            }}>
                                <span style={{
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    opacity: 0.6,
                                    textTransform: 'uppercase'
                                }}>Free</span>
                                <span style={{fontSize: '0.95rem', opacity: 0.9, textAlign: 'right'}}>{row.col1}</span>
                            </div>

                            {hasLegacy && (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '12px 20px',
                                    backgroundColor: 'rgba(var(--md-sys-color-on-surface-rgb), 0.02)',
                                    color: 'var(--md-sys-color-on-surface)'
                                }}>
                                    <span style={{
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        opacity: 0.5,
                                        textTransform: 'uppercase'
                                    }}>Legacy</span>
                                    <span style={{
                                        fontSize: '0.95rem',
                                        opacity: 0.7,
                                        textAlign: 'right'
                                    }}>{row.col3}</span>
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
                                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                    <span style={{
                                        fontSize: '0.85rem',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}>Plus</span>
                                </div>
                                <span style={{fontWeight: 800, fontSize: '1.1rem', textAlign: 'right'}}>
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
        <div className="plus-compare-table">
            <table>
                <thead>
                <tr style={{background: 'var(--md-sys-color-surface-container)'}}>
                    <th style={{width: '40%', color: 'var(--md-sys-color-on-surface)'}}>Feature</th>
                    <th style={{color: 'var(--md-sys-color-on-surface)'}}>Free</th>
                    <th style={{color: 'var(--md-sys-color-primary)'}}>Plus</th>
                    {hasLegacy && <th style={{color: 'var(--md-sys-color-on-surface)', opacity: 0.7}}>Legacy</th>}
                </tr>
                </thead>
                <tbody>
                {data.map((row, i) => (
                    <tr key={i} style={{borderTop: '1px solid var(--md-sys-color-outline-variant)'}}>
                        <td style={{fontWeight: 600, color: 'var(--md-sys-color-on-surface)'}}>{row.feature}</td>
                        <td style={{opacity: 0.7, color: 'var(--md-sys-color-on-surface)'}}>{row.col1}</td>
                        <td style={{
                            fontWeight: 800,
                            color: 'var(--md-sys-color-primary)',
                            fontSize: '1.1rem'
                        }}>{row.col2}</td>
                        {hasLegacy &&
                            <td style={{opacity: 0.6, color: 'var(--md-sys-color-on-surface)'}}>{row.col3}</td>}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

/**
 * Renders a generic text block section.
 *
 * @param {Object} props
 * @param {Object} props.data
 * @returns {JSX.Element|null}
 */
const TextBlockSection = ({data}) => {
    if (!data) return null;
    return (
        <div style={{marginBottom: '80px'}}>
            <h2 style={{
                fontSize: '2.2rem',
                fontWeight: 800,
                marginBottom: '40px',
                textAlign: 'center',
                color: 'var(--md-sys-color-on-surface)'
            }}>{data.title}</h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px'}}>
                {data.items.map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{y: -5}}
                        className="glass-card"
                        style={{
                            padding: '32px', borderRadius: '24px',
                            background: 'var(--md-sys-color-surface-container)',
                            border: '1px solid var(--md-sys-color-outline-variant)'
                        }}
                    >
                        <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px'}}>
                            {item.icon && (
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    background: 'var(--md-sys-color-secondary-container)',
                                    color: 'var(--md-sys-color-on-secondary-container)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                </div>
                            )}
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                margin: 0,
                                color: 'var(--md-sys-color-on-surface)'
                            }}>{item.title}</h3>
                        </div>
                        <div className="markdown-body" style={{opacity: 0.8, lineHeight: 1.6}}>
                            <ReactMarkdown>{item.content}</ReactMarkdown>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

/**
 * Main component to view the Plus promotional page.
 * Implements a dynamic floating CTA button with directional scroll tracking.
 *
 * @param {Object} props
 * @param {string} props.markdownContent
 * @param {Object} props.appConfig
 * @param {Object} props.strings
 * @returns {JSX.Element|null}
 */
export default function PlusViewer({markdownContent, appConfig, strings}) {
    const [content, setContent] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [ctaVisible, setCtaVisible] = useState({top: true, bottom: false});

    const topCtaRef = useRef(null);
    const bottomCtaRef = useRef(null);

    const heroFeatureIcon = appConfig?.name === 'Pixel Compass' ? 'explore' : 'equalizer';

    useEffect(() => {
        if (markdownContent) setContent(parsePlusMarkdown(markdownContent));

        const checkMobile = () => setIsMobile(window.innerWidth < 1000);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [markdownContent]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                setCtaVisible((prev) => {
                    const nextState = {...prev};
                    entries.forEach((entry) => {
                        if (entry.target === topCtaRef.current) {
                            if (entry.isIntersecting) {
                                nextState.top = true;
                            } else {
                                nextState.top = entry.boundingClientRect.top >= 0;
                            }
                        }
                        if (entry.target === bottomCtaRef.current) {
                            nextState.bottom = entry.isIntersecting;
                        }
                    });
                    return nextState;
                });
            },
            {threshold: 0, rootMargin: "0px"}
        );

        if (topCtaRef.current) observer.observe(topCtaRef.current);
        if (bottomCtaRef.current) observer.observe(bottomCtaRef.current);

        return () => observer.disconnect();
    }, [content]);

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
        boxShadow: '0 8px 24px rgba(var(--md-sys-color-shadow-rgb), 0.2)'
    };

    const showFloatingBtn = !ctaVisible.top && !ctaVisible.bottom;

    return (
        <div className="viewer-container" style={{paddingBottom: '100px'}}>

            <AnimatePresence>
                {showFloatingBtn && (
                    <motion.div
                        initial={{y: 100, opacity: 0, x: '-50%'}}
                        animate={{y: 0, opacity: 1, x: '-50%'}}
                        exit={{y: 100, opacity: 0, x: '-50%'}}
                        transition={{type: "spring", stiffness: 400, damping: 30}}
                        style={{
                            position: 'fixed',
                            bottom: '24px',
                            left: '50%',
                            zIndex: 90,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 'calc(100% - 32px)',
                            maxWidth: '400px'
                        }}
                    >
                        <button
                            onClick={handleBuy}
                            className="plus-cta-btn"
                            style={{
                                ...gradientButtonCheck,
                                width: '100%',
                                justifyContent: 'center',
                                boxShadow: '0 8px 32px rgba(var(--md-sys-color-shadow-rgb), 0.4)',
                                padding: '16px 24px'
                            }}
                        >
                            <span className="material-symbols-outlined" style={{fontSize: '24px'}}>diamond</span>
                            {strings.plus_page?.cta || 'Get Plus'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="plus-hero-container">
                <div>
                    <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}}>
                        <span className="plus-badge">
                            {strings.plus_page?.badge || 'PLUS'}
                        </span>
                        <h1 className="viewer-title" style={{margin: '24px 0'}}>
                            {strings.plus_page?.title || 'Upgrade to Plus'}
                        </h1>
                        <div className="markdown-body" style={{fontSize: '1.2rem', opacity: 0.8, marginBottom: '40px'}}>
                            <ReactMarkdown>{content.intro}</ReactMarkdown>
                        </div>

                        <div ref={topCtaRef} style={{display: 'inline-flex'}}>
                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 12px 32px rgba(var(--md-sys-color-shadow-rgb), 0.3)'
                                }}
                                whileTap={{scale: 0.95}}
                                onClick={handleBuy}
                                className="plus-cta-btn"
                                style={gradientButtonCheck}
                            >
                                {strings.plus_page?.cta || 'Get Plus'}
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <motion.div
                        initial={{rotate: -5, y: 50, opacity: 0}}
                        animate={{rotate: 0, y: 0, opacity: 1}}
                        transition={{duration: 0.8, type: 'spring'}}
                        style={{transform: isMobile ? 'scale(0.85)' : 'none'}}
                    >
                        <GooglePixel style={{border: '4px solid var(--md-sys-color-outline-variant)'}}>
                            <GetScreenForFeature
                                featureIcon={heroFeatureIcon}
                                seedColor={appConfig?.seedColor}
                                appName={appConfig?.name}
                                appId={appConfig?.appId}
                            />
                        </GooglePixel>
                    </motion.div>
                </div>
            </div>

            <div style={{maxWidth: '800px', margin: '0 auto', marginTop: '40px'}}>
                {content.featuresGroups.map((group, i) => (
                    <FeatureGroup key={i} group={group} isMobile={isMobile}/>
                ))}
            </div>

            {content.toolsSection && (
                <div style={{marginTop: '120px'}}>
                    <TextBlockSection data={content.toolsSection}/>
                </div>
            )}

            {content.licensingSection && (
                <div style={{marginTop: '40px'}}>
                    <TextBlockSection data={content.licensingSection}/>
                </div>
            )}

            {content.comparison.length > 0 && (
                <div style={{marginTop: '120px'}}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        textAlign: 'center',
                        marginBottom: '40px',
                        color: 'var(--md-sys-color-on-surface)'
                    }}>
                        Compare Editions
                    </h2>
                    <ComparisonTable data={content.comparison} isMobile={isMobile}/>
                </div>
            )}

            {content.whySection && content.whySection.items.length > 0 && (
                <div style={{
                    marginTop: '120px',
                    textAlign: 'center',
                    maxWidth: '1000px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        marginBottom: '24px',
                        color: 'var(--md-sys-color-on-surface)'
                    }}>{content.whySection.title}</h2>
                    {content.whySection.intro && (
                        <div style={{
                            maxWidth: '700px',
                            margin: '0 auto 40px auto',
                            opacity: 0.8,
                            fontSize: '1.1rem',
                            color: 'var(--md-sys-color-on-surface)'
                        }}>
                            <ReactMarkdown>{content.whySection.intro}</ReactMarkdown>
                        </div>
                    )}

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '24px',
                        textAlign: 'left'
                    }}>
                        {content.whySection.items.map((item, i) => (
                            <motion.div
                                key={i} whileHover={{y: -5}} className="glass-card"
                                style={{
                                    padding: '32px',
                                    borderRadius: '24px',
                                    background: 'var(--md-sys-color-surface-container)'
                                }}
                            >
                                <div style={{color: 'var(--md-sys-color-primary)', marginBottom: '20px'}}>
                                    <span className="material-symbols-outlined"
                                          style={{fontSize: '36px'}}>{item.icon}</span>
                                </div>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 700,
                                    marginBottom: '12px',
                                    color: 'var(--md-sys-color-on-surface)'
                                }}>{item.title}</h3>
                                <div className="markdown-body"
                                     style={{opacity: 0.7, fontSize: '1rem', lineHeight: 1.6}}>
                                    <ReactMarkdown components={{p: 'span'}}>{item.desc}</ReactMarkdown>
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
                <div style={{maxWidth: '600px', margin: '0 auto'}}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                        fontWeight: 800,
                        marginBottom: '16px',
                        color: 'var(--md-sys-color-on-surface)'
                    }}>
                        {strings.plus_page?.title || 'Ready for Plus?'}
                    </h2>

                    <p style={{
                        fontSize: '1.1rem',
                        opacity: 0.7,
                        marginBottom: '40px',
                        lineHeight: 1.6,
                        color: 'var(--md-sys-color-on-surface-variant)'
                    }}>
                        {strings.plus_page?.subtitle || 'Get the full potential.'}
                    </p>

                    <div ref={bottomCtaRef} style={{display: 'flex', justifyContent: 'center'}}>
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            onClick={handleBuy}
                            className="plus-cta-btn"
                            style={{
                                ...gradientButtonCheck,
                                boxShadow: '0 4px 12px rgba(var(--md-sys-color-shadow-rgb), 0.15)'
                            }}
                        >
                            {strings.plus_page?.cta || 'Get Plus'}
                            <span className="material-symbols-outlined" style={{fontSize: '24px'}}>
                                arrow_forward
                            </span>
                        </motion.button>
                    </div>
                </div>
            </div>

        </div>
    );
}