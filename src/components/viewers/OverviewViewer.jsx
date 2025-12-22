import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {motion} from 'framer-motion';
import {parseOverview} from '../../utils/overviewParser';
import BackToTop from '../common/BackToTop';
import PageTableOfContents from '../common/PageTableOfContents';
import {useSectionScroll} from "../../hooks/useSectionScroll";

/**
 * Maps a tech category string to a Material Symbol icon name.
 * @param {string} category - The category name.
 * @returns {string} The icon name.
 */
const getIconForCategory = (category) => {
    const normalized = category.toLowerCase();
    const map = {
        'language': 'code',
        'core': 'hub',
        'architecture': 'layers',
        'ui toolkit': 'brush',
        'design': 'palette',
        'design system': 'palette',
        'animation': 'animation',
        'dependency injection': 'vaccines',
        'asynchronicity': 'schedule',
        'networking': 'wifi',
        'data': 'database',
        'data persistence': 'storage',
        'data handling': 'folder_data',
        'background processing': 'settings_applications',
        'audio processing': 'graphic_eq',
        'billing': 'payments',
        'build system': 'build',
        'graphics & export': 'image',
        'platform integration': 'android',
        'device services': 'sensors',
        'remote content': 'cloud_download',
        'ai & automation': 'smart_toy',
        'routing': 'alt_route',
        'website': 'language',
        'license': 'gavel',
        'performance': 'speed'
    };
    return map[normalized] || 'settings';
};

/**
 * Renders a single card for a technology stack item.
 * @param {Object} props
 * @param {Object} props.item - The tech item data {category, stack}.
 * @param {number} props.index - Animation delay index.
 */
const TechStackCard = ({item, index}) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: index * 0.05}}
            className="glass-card"
            style={{
                padding: '24px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                border: '1px solid var(--md-sys-color-outline-variant)',
                background: 'var(--md-sys-color-surface-container-low)',
                height: '100%',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '4px',
                background: 'linear-gradient(90deg, var(--md-sys-color-primary), var(--md-sys-color-tertiary))',
                opacity: 0.8
            }}/>

            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'var(--md-sys-color-surface-container-high)',
                    color: 'var(--md-sys-color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <span className="material-symbols-outlined" style={{fontSize: '22px'}}>
                        {getIconForCategory(item.category)}
                    </span>
                </div>
                <h3 style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    margin: 0,
                    color: 'var(--md-sys-color-on-surface)',
                    letterSpacing: '0.5px'
                }}>{item.category}</h3>
            </div>

            <div className="tech-content" style={{
                fontSize: '0.95rem',
                lineHeight: '1.6',
                color: 'var(--md-sys-color-on-surface-variant)',
                overflowWrap: 'break-word',
                wordBreak: 'break-word'
            }}>
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        p: ({node, ...props}) => <p style={{margin: 0}} {...props} />,
                        strong: ({node, ...props}) => <span style={{
                            color: 'var(--md-sys-color-on-surface)',
                            fontWeight: 600,
                            background: 'rgba(var(--md-sys-color-primary-rgb), 0.1)',
                            padding: '0 4px',
                            borderRadius: '4px'
                        }} {...props} />
                    }}
                >
                    {item.stack}
                </ReactMarkdown>
            </div>
        </motion.div>
    );
};

/**
 * Custom renderer for ReactMarkdown to style content professionally and handle tables safely.
 */
const MarkdownComponents = {
    h3: ({node, ...props}) => (
        <div style={{
            marginTop: '48px',
            marginBottom: '24px',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--md-sys-color-outline-variant)'
        }}>
            <h3 style={{
                fontSize: '1.5rem',
                margin: 0,
                color: 'var(--md-sys-color-primary)',
                fontWeight: 600
            }} {...props} />
        </div>
    ),
    h4: ({node, ...props}) => (
        <h4 style={{
            fontSize: '1.2rem',
            marginTop: '24px',
            marginBottom: '16px',
            color: 'var(--md-sys-color-on-surface)',
            fontWeight: 600
        }} {...props} />
    ),
    ul: ({node, ...props}) => (
        <ul style={{
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '24px'
        }} {...props} />
    ),
    li: ({node, ...props}) => (
        <li style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
            color: 'var(--md-sys-color-on-surface-variant)',
            lineHeight: 1.7,
            fontSize: '1.05rem',
            overflowWrap: 'break-word'
        }}>
            <span className="material-symbols-outlined" style={{
                fontSize: '20px',
                marginTop: '4px',
                color: 'var(--md-sys-color-primary)',
                flexShrink: 0
            }}>check_circle</span>
            <div style={{flex: 1}}>{props.children}</div>
        </li>
    ),
    strong: ({node, ...props}) => (
        <strong style={{color: 'var(--md-sys-color-on-surface)', fontWeight: 700}} {...props} />
    ),
    p: ({node, ...props}) => (
        <p style={{
            marginBottom: '24px',
            lineHeight: 1.8,
            fontSize: '1.1rem',
            color: 'var(--md-sys-color-on-surface-variant)',
            maxWidth: '70ch',
            overflowWrap: 'break-word'
        }} {...props} />
    ),
    table: ({node, ...props}) => (
        <div style={{
            width: '100%',
            overflowX: 'auto',
            marginBottom: '32px',
            borderRadius: '16px',
            border: '1px solid var(--md-sys-color-outline-variant)',
            background: 'var(--md-sys-color-surface-container-low)'
        }}>
            <table style={{width: '100%', borderCollapse: 'collapse', minWidth: '600px'}} {...props} />
        </div>
    ),
    thead: ({node, ...props}) => (
        <thead style={{background: 'var(--md-sys-color-surface-container)'}} {...props} />
    ),
    th: ({node, ...props}) => (
        <th style={{
            padding: '16px',
            textAlign: 'left',
            color: 'var(--md-sys-color-on-surface)',
            fontWeight: 700,
            borderBottom: '1px solid var(--md-sys-color-outline-variant)'
        }} {...props} />
    ),
    td: ({node, ...props}) => (
        <td style={{
            padding: '16px',
            color: 'var(--md-sys-color-on-surface-variant)',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }} {...props} />
    ),
    a: ({node, ...props}) => (
        <a style={{
            color: 'var(--md-sys-color-primary)',
            textDecoration: 'none',
            borderBottom: '1px dashed var(--md-sys-color-primary)'
        }} {...props} />
    )
};

/**
 * Main component to view the Project Overview page.
 */
export default function OverviewViewer({markdownContent, appConfig, strings}) {
    const [data, setData] = useState({sections: []});
    const {activeSection, setActiveSection, scrollToSection} = useSectionScroll('');

    useEffect(() => {
        if (markdownContent) {
            const parsed = parseOverview(markdownContent);
            setData(parsed);
            if (parsed.sections.length > 0) setActiveSection(parsed.sections[0].id);
        }
    }, [markdownContent]);

    const renderTocItems = () => (
        data.sections.map((section) => (
            <button key={section.id} onClick={() => scrollToSection(section.id)} style={{
                textAlign: 'left',
                background: activeSection === section.id ? 'var(--md-sys-color-secondary-container)' : 'transparent',
                border: 'none',
                padding: '12px 16px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                color: activeSection === section.id ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface-variant)',
                fontWeight: activeSection === section.id ? 700 : 500,
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '4px'
            }}>
                {section.title}
                {activeSection === section.id && (
                    <span className="material-symbols-outlined" style={{fontSize: '16px'}}>arrow_left</span>
                )}
            </button>
        ))
    );

    return (
        <div style={{height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0}}>
            <div style={{
                marginBottom: '60px',
                paddingBottom: '32px',
                borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                flexShrink: 0
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '24px'
                }}>
                    <div style={{flex: 1, minWidth: '300px'}}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px',
                            color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.9rem', fontWeight: 500
                        }}>
                            <span>{appConfig?.appName}</span>
                            <span className="material-symbols-outlined" style={{fontSize: '16px'}}>chevron_right</span>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: 'var(--md-sys-color-primary)',
                                fontWeight: 700
                            }}>
                                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>terminal</span>
                                <span>{strings.overview_page.title}</span>
                            </div>
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, margin: 0,
                            lineHeight: 1.1, letterSpacing: '-1px', color: 'var(--md-sys-color-on-surface)'
                        }}>{strings.overview_page.title}</h1>
                        <p style={{
                            fontSize: '1.15rem', color: 'var(--md-sys-color-on-surface-variant)', marginTop: '16px',
                            maxWidth: '700px', lineHeight: 1.6
                        }}>{strings.overview_page.subtitle}</p>
                    </div>
                    {appConfig?.sourceLink && (
                        <a href={appConfig.sourceLink} target="_blank" rel="noreferrer" className="btn-glow">
                            <span className="material-symbols-outlined">code</span> {strings.overview_page.github_btn}
                        </a>
                    )}
                </div>
            </div>

            <div style={{display: 'flex', gap: '80px', flex: 1, alignItems: 'flex-start'}}>

                <div style={{flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0}}>

                    <div className="mobile-toc-wrapper" style={{display: 'none', marginBottom: '40px'}}>
                        <PageTableOfContents title={strings.overview_page.toc_title} isMobile={true}>
                            {renderTocItems()}
                        </PageTableOfContents>
                    </div>

                    <div className="content-scroll">
                        {data.sections.map((section, index) => {
                            if (section.type === 'tech-stack') {
                                return (
                                    <motion.div
                                        key={section.id}
                                        id={section.id}
                                        initial={{opacity: 0}}
                                        whileInView={{opacity: 1}}
                                        viewport={{once: true, margin: "-100px"}}
                                        style={{marginBottom: '100px'}}
                                    >
                                        <h2 style={{
                                            fontSize: '2.2rem', marginBottom: '32px', fontWeight: 800,
                                            letterSpacing: '-0.5px', color: 'var(--md-sys-color-on-surface)'
                                        }}>{section.title}</h2>

                                        {section.intro && (
                                            <div style={{
                                                marginBottom: '40px',
                                                fontSize: '1.1rem',
                                                color: 'var(--md-sys-color-on-surface-variant)',
                                                lineHeight: 1.6,
                                                maxWidth: '70ch'
                                            }}>
                                                <ReactMarkdown>{section.intro}</ReactMarkdown>
                                            </div>
                                        )}

                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                                            gap: '24px'
                                        }}>
                                            {section.items.map((item, i) => (
                                                <TechStackCard key={i} item={item} index={i}/>
                                            ))}
                                        </div>
                                    </motion.div>
                                );
                            }

                            return (
                                <motion.div
                                    key={section.id}
                                    id={section.id}
                                    initial={{opacity: 0, y: 30}}
                                    whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: true, margin: "-100px"}}
                                    transition={{delay: 0.1}}
                                    style={{marginBottom: '100px'}}
                                >
                                    {section.type !== 'intro' && (
                                        <h2 style={{
                                            fontSize: '2.2rem', marginBottom: '32px', fontWeight: 800,
                                            letterSpacing: '-0.5px', color: 'var(--md-sys-color-on-surface)'
                                        }}>{section.title}</h2>
                                    )}

                                    <div style={section.type === 'intro' ? {
                                        fontSize: '1.25rem',
                                        lineHeight: 1.8,
                                        color: 'var(--md-sys-color-on-surface-variant)',
                                        maxWidth: '80ch'
                                    } : {}}>
                                        <ReactMarkdown rehypePlugins={[rehypeRaw]} components={MarkdownComponents}>
                                            {section.content}
                                        </ReactMarkdown>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <div className="desktop-toc-wrapper" style={{
                    width: '300px', flexShrink: 0, position: 'sticky', top: '100px',
                    display: 'flex', flexDirection: 'column', gap: '24px'
                }}>
                    <PageTableOfContents title={strings.overview_page.toc_title} isMobile={false}>
                        {renderTocItems()}
                    </PageTableOfContents>

                    <div className="glass-card" style={{
                        padding: '24px',
                        borderRadius: '24px',
                        border: '1px solid var(--md-sys-color-outline-variant)',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)'
                    }}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                            <span className="material-symbols-outlined"
                                  style={{color: 'var(--md-sys-color-primary)'}}>info</span>
                            <span style={{
                                fontWeight: 700,
                                fontSize: '0.9rem'
                            }}>{strings.overview_page.about_docs_title || "About"}</span>
                        </div>
                        <p style={{
                            fontSize: '0.85rem',
                            color: 'var(--md-sys-color-on-surface-variant)',
                            lineHeight: 1.5,
                            margin: 0
                        }}>
                            {strings.overview_page.dynamic_docs_note}
                        </p>
                    </div>
                </div>

                <BackToTop strings={strings.changelog}/>

                <style>{`
                  @media (max-width: 1200px) {
                    .desktop-toc-wrapper { display: none !important; }
                    .mobile-toc-wrapper { display: block !important; }
                  }
                `}</style>
            </div>
        </div>
    );
}