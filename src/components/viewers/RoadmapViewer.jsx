import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import {parseRoadmap} from '../../utils/roadmapParser';
import {handleContactSupport} from '../../utils/navigationUtils';
import ViewerHeader from '../common/ViewerHeader';

/**
 * @param {string} text
 * @returns {JSX.Element|string}
 */
const renderRichText = (text) => {
    if (!text || typeof text !== 'string') return text;
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} style={{ fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
            return <strong key={index} style={{ fontStyle: 'italic', fontWeight: 600, color: 'var(--md-sys-color-on-surface)' }}>{part.slice(1, -1)}</strong>;
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
    });
};

/**
 * @param {Object} props
 * @param {string} props.markdownContent
 * @param {Object} props.appConfig
 * @param {Object} props.strings
 * @returns {JSX.Element}
 */
export default function RoadmapViewer({markdownContent, appConfig, strings}) {
    const [data, setData] = useState({sections: []});
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    const sourceApp = appConfig.appId.includes('pixelpulse') ? 'pixelpulse' :
        appConfig.appId.includes('compass') ? 'pixelcompass' : 'portfolio';

    useEffect(() => {
        if (markdownContent) {
            setData(parseRoadmap(markdownContent));
        }

        const checkMobile = () => setIsMobile(window.innerWidth < 850);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [markdownContent]);

    return (
        <div className="viewer-container" style={{paddingBottom: '80px', overflowX: 'hidden', boxSizing: 'border-box'}}>
            <ViewerHeader
                appName={appConfig?.appName}
                icon="map"
                title={strings.roadmap_page?.title || "Roadmap"}
                subtitle={strings.roadmap_page?.subtitle}
            />

            <div className="roadmap-main-content" style={{maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box'}}>
                {data.sections.map((section, sIndex) => {
                    if (section.type === 'intro') return null;

                    const isLaunched = section.status === 'launched';
                    const isActive = section.status === 'active';

                    const iconContainerColor = isLaunched ? 'var(--md-sys-color-primary-container)' :
                        isActive ? 'var(--md-sys-color-tertiary-container)' :
                            'var(--md-sys-color-surface-container-highest)';

                    const iconColor = isLaunched ? 'var(--md-sys-color-on-primary-container)' :
                        isActive ? 'var(--md-sys-color-on-tertiary-container)' :
                            'var(--md-sys-color-on-surface-variant)';

                    const icon = isLaunched ? 'check_circle' :
                        isActive ? 'construction' :
                            section.type === 'history' ? 'history' : 'schedule';

                    return (
                        <motion.article
                            key={sIndex}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: sIndex * 0.1}}
                            style={{
                                marginBottom: isMobile ? '56px' : '80px',
                                position: 'relative',
                                width: '100%',
                                boxSizing: 'border-box'
                            }}
                        >
                            {!isMobile && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: '23px',
                                        top: '60px',
                                        bottom: '-60px',
                                        width: '2px',
                                        background: `linear-gradient(to bottom, ${iconContainerColor}40, transparent)`,
                                        zIndex: 0
                                    }}
                                />
                            )}

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                marginBottom: isMobile ? '24px' : '32px',
                                position: 'relative',
                                zIndex: 1,
                                width: '100%',
                                boxSizing: 'border-box'
                            }}>
                                <div style={{
                                    width: isMobile ? '40px' : '48px',
                                    height: isMobile ? '40px' : '48px',
                                    borderRadius: '50%',
                                    background: iconContainerColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <span className="material-symbols-outlined"
                                          style={{
                                              fontSize: isMobile ? '22px' : '26px',
                                              color: iconColor
                                          }}>
                                        {icon}
                                    </span>
                                </div>
                                <div style={{flex: 1, minWidth: 0}}>
                                    <h2 style={{
                                        fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                                        margin: 0,
                                        fontWeight: 800,
                                        color: 'var(--md-sys-color-on-surface)',
                                        letterSpacing: '-0.02em',
                                        wordBreak: 'break-word'
                                    }}>{section.title}</h2>
                                </div>
                            </div>

                            <div style={{
                                paddingLeft: isMobile ? '0' : '64px',
                                width: '100%',
                                boxSizing: 'border-box'
                            }}>
                                {section.type !== 'history' && section.textContent && (
                                    <div style={{
                                        fontSize: isMobile ? '1.05rem' : '1.15rem',
                                        lineHeight: 1.7,
                                        color: 'var(--md-sys-color-on-surface-variant)',
                                        marginBottom: '24px',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                        width: '100%'
                                    }}>
                                        {renderRichText(section.textContent)}
                                    </div>
                                )}

                                {section.type === 'history' && (
                                    <div style={{
                                        width: '100%',
                                        borderRadius: '24px',
                                        border: '1px solid var(--md-sys-color-outline-variant)',
                                        background: 'var(--md-sys-color-surface-container-low)',
                                        marginTop: '16px',
                                        boxSizing: 'border-box',
                                        overflow: 'hidden'
                                    }}>
                                        {section.textContent && (
                                            <div style={{
                                                padding: isMobile ? '20px' : '24px',
                                                background: 'var(--md-sys-color-surface-container)',
                                                borderBottom: section.table ? '1px solid var(--md-sys-color-outline-variant)' : 'none'
                                            }}>
                                                <p style={{
                                                    margin: 0,
                                                    fontSize: '0.95rem',
                                                    color: 'var(--md-sys-color-on-surface-variant)',
                                                    lineHeight: 1.6
                                                }}>
                                                    {renderRichText(section.textContent)}
                                                </p>
                                            </div>
                                        )}

                                        {section.table && (
                                            isMobile ? (
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    width: '100%',
                                                    padding: '12px',
                                                    gap: '8px'
                                                }}>
                                                    {section.table.rows.map((row, rIdx) => (
                                                        <div key={rIdx} style={{
                                                            background: 'var(--md-sys-color-surface)',
                                                            border: '1px solid var(--md-sys-color-outline-variant)',
                                                            borderRadius: '16px',
                                                            padding: '16px',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '12px'
                                                        }}>
                                                            {row.map((cell, cIdx) => (
                                                                <div key={cIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                                    <span style={{
                                                                        fontSize: '0.8rem',
                                                                        color: 'var(--md-sys-color-primary)',
                                                                        fontWeight: 700,
                                                                        textTransform: 'uppercase',
                                                                        letterSpacing: '0.5px'
                                                                    }}>
                                                                        {renderRichText(section.table.headers[cIdx])}
                                                                    </span>
                                                                    <span style={{
                                                                        fontSize: '0.95rem',
                                                                        color: cIdx === 0 ? 'var(--md-sys-color-on-surface)' : 'var(--md-sys-color-on-surface-variant)',
                                                                        fontWeight: cIdx === 0 ? 700 : 400,
                                                                        wordBreak: 'break-word'
                                                                    }}>
                                                                        {renderRichText(cell)}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div style={{
                                                    width: '100%',
                                                    overflowX: 'auto',
                                                    WebkitOverflowScrolling: 'touch'
                                                }}>
                                                    <table style={{
                                                        width: '100%',
                                                        borderCollapse: 'collapse',
                                                        minWidth: '500px',
                                                        textAlign: 'left'
                                                    }}>
                                                        <thead>
                                                        <tr>
                                                            {section.table.headers.map((h, idx) => (
                                                                <th key={idx} style={{
                                                                    background: 'var(--md-sys-color-surface-container-high)',
                                                                    color: 'var(--md-sys-color-on-surface)',
                                                                    padding: '16px 20px',
                                                                    fontWeight: 700,
                                                                    fontSize: '0.95rem',
                                                                    borderBottom: '2px solid var(--md-sys-color-outline-variant)',
                                                                    whiteSpace: 'nowrap'
                                                                }}>{renderRichText(h)}</th>
                                                            ))}
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {section.table.rows.map((row, rIdx) => (
                                                            <tr key={rIdx}>
                                                                {row.map((cell, cIdx) => (
                                                                    <td key={cIdx} style={{
                                                                        padding: '16px 20px',
                                                                        color: cIdx === 0 ? 'var(--md-sys-color-on-surface)' : 'var(--md-sys-color-on-surface-variant)',
                                                                        fontWeight: cIdx === 0 ? 700 : 400,
                                                                        fontSize: '0.95rem',
                                                                        borderBottom: rIdx === section.table.rows.length - 1 ? 'none' : '1px solid var(--md-sys-color-outline-variant)',
                                                                        wordBreak: 'break-word'
                                                                    }}>
                                                                        {renderRichText(cell)}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}

                                {section.groups && section.groups.length > 0 && (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '16px',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}>
                                        {section.groups.map((group, gIndex) => (
                                            <motion.div
                                                key={gIndex}
                                                whileHover={{
                                                    y: -2,
                                                    boxShadow: '0 8px 24px rgba(var(--md-sys-color-shadow-rgb), 0.05)'
                                                }}
                                                transition={{duration: 0.2}}
                                                style={{
                                                    padding: isMobile ? '20px' : '28px',
                                                    borderRadius: '24px',
                                                    background: 'var(--md-sys-color-surface-container)',
                                                    border: '1px solid var(--md-sys-color-outline-variant)',
                                                    width: '100%',
                                                    boxSizing: 'border-box'
                                                }}
                                            >
                                                {group.title !== "General" && (
                                                    <h3 style={{
                                                        fontSize: '1.2rem',
                                                        marginBottom: '20px',
                                                        fontWeight: 700,
                                                        color: 'var(--md-sys-color-on-surface)',
                                                        borderBottom: '1px solid var(--md-sys-color-surface-variant)',
                                                        paddingBottom: '12px',
                                                        wordBreak: 'break-word'
                                                    }}>
                                                        {group.title}
                                                    </h3>
                                                )}
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '20px',
                                                    width: '100%'
                                                }}>
                                                    {group.items.map((item, iIndex) => (
                                                        <div key={iIndex} style={{
                                                            display: 'flex',
                                                            gap: isMobile ? '12px' : '16px',
                                                            alignItems: 'flex-start',
                                                            width: '100%',
                                                            boxSizing: 'border-box'
                                                        }}>
                                                            <div style={{
                                                                width: '32px',
                                                                height: '32px',
                                                                borderRadius: '10px',
                                                                background: 'var(--md-sys-color-surface-container-highest)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                flexShrink: 0
                                                            }}>
                                                                <span className="material-symbols-outlined" style={{
                                                                    fontSize: '18px',
                                                                    color: 'var(--md-sys-color-on-surface-variant)'
                                                                }}>
                                                                    {isLaunched ? 'done' : 'adjust'}
                                                                </span>
                                                            </div>
                                                            <div style={{flex: 1, minWidth: 0}}>
                                                                {item.title && <strong style={{
                                                                    display: 'block',
                                                                    fontSize: '1.05rem',
                                                                    color: 'var(--md-sys-color-on-surface)',
                                                                    marginBottom: '4px',
                                                                    wordBreak: 'break-word'
                                                                }}>{item.title}</strong>}
                                                                <span style={{
                                                                    fontSize: '0.95rem',
                                                                    color: 'var(--md-sys-color-on-surface-variant)',
                                                                    lineHeight: 1.6,
                                                                    display: 'block',
                                                                    wordBreak: 'break-word'
                                                                }}>
                                                                    {renderRichText(item.desc)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.article>
                    );
                })}
            </div>

            <aside style={{
                marginTop: '80px',
                padding: isMobile ? '32px 20px' : '48px',
                borderRadius: '32px',
                background: 'linear-gradient(135deg, var(--md-sys-color-secondary-container), var(--md-sys-color-surface-container))',
                border: '1px solid var(--md-sys-color-outline-variant)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
                maxWidth: '800px',
                margin: '80px auto 0 auto',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    width: '64px', height: '64px', borderRadius: '50%',
                    background: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px',
                    flexShrink: 0
                }}>
                    <span className="material-symbols-outlined" style={{fontSize: '32px'}}>lightbulb</span>
                </div>

                <h3 style={{
                    fontSize: 'clamp(1.6rem, 4vw, 2rem)',
                    marginBottom: '16px',
                    fontWeight: 800,
                    color: 'var(--md-sys-color-on-surface)',
                    wordBreak: 'break-word'
                }}>{strings.roadmap_page?.contact_title || "Have a Feature Request?"}</h3>
                <p style={{
                    color: 'var(--md-sys-color-on-surface-variant)',
                    marginBottom: '32px',
                    fontSize: '1.1rem',
                    maxWidth: '500px',
                    lineHeight: 1.6,
                    wordBreak: 'break-word'
                }}>
                    {strings.roadmap_page?.contact_desc || "Help us shape the future by sharing your ideas directly with the developer."}
                </p>

                <button
                    onClick={() => handleContactSupport('feedback', navigate, {source: sourceApp, platform: 'android'})}
                    className="btn-glow"
                    style={{padding: '16px 32px', fontSize: '1rem', maxWidth: '100%', boxSizing: 'border-box'}}
                >
                    {strings.roadmap_page?.suggest_btn || "Suggest a Feature"} <span
                    className="material-symbols-outlined">arrow_forward</span>
                </button>
            </aside>
        </div>
    );
}