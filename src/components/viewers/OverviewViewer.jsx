import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {motion} from 'framer-motion';
import {parseOverview} from '../../utils/overviewParser';
import BackToTop from '../common/BackToTop';
import PageTableOfContents from '../common/PageTableOfContents';

const getIconForCategory = (category) => {
    const map = {
        'Language': 'code',
        'Architecture': 'layers',
        'UI Toolkit': 'brush',
        'Design System': 'palette',
        'Dependency Injection': 'hub',
        'Asynchronicity': 'schedule',
        'Data Persistence': 'database',
        'Background Processing': 'settings_applications',
        'Audio Processing': 'graphic_eq',
        'Billing': 'payments',
        'Build System': 'build',
        'Graphics & Export': 'image',
        'Platform Integration': 'android',
        'Remote Content': 'cloud_download'
    };
    return map[category] || 'settings';
};

const TechStackCard = ({item, index}) => {
    return (
        <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                    transition={{delay: index * 0.05}} whileHover={{y: -5}} className="glass-card" style={{
            padding: '24px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            border: '1px solid var(--md-sys-color-outline-variant)',
            background: `linear-gradient(145deg, var(--md-sys-color-surface-container-low) 0%, transparent 100%)`,
            height: '100%'
        }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px'}}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'var(--md-sys-color-primary-container)',
                    color: 'var(--md-sys-color-on-primary-container)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span className="material-symbols-outlined"
                          style={{fontSize: '18px'}}>{getIconForCategory(item.category)}</span>
                </div>
                <span style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontWeight: 700,
                    color: 'var(--md-sys-color-on-surface-variant)'
                }}>{item.category}</span>
            </div>
            <div className="tech-content"
                 style={{fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--md-sys-color-on-surface)'}}>
                <ReactMarkdown rehypePlugins={[rehypeRaw]} components={{
                    p: ({node, ...props}) => <p style={{margin: 0}} {...props} />,
                    strong: ({node, ...props}) => <span
                        style={{color: 'var(--md-sys-color-primary)', fontWeight: 600}} {...props} />
                }}>{item.stack}</ReactMarkdown>
            </div>
        </motion.div>
    );
};

const DeepDiveRenderer = ({content}) => {
    return (
        <ReactMarkdown rehypePlugins={[rehypeRaw]} components={{
            h3: ({node, ...props}) => <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '40px',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid var(--md-sys-color-outline-variant)'
            }}><span className="material-symbols-outlined"
                     style={{color: 'var(--md-sys-color-primary)'}}>label_important</span><h3
                style={{fontSize: '1.4rem', margin: 0, color: 'var(--md-sys-color-on-surface)'}} {...props} /></div>,
            ul: ({node, ...props}) => <ul
                style={{listStyle: 'none', padding: 0, display: 'grid', gap: '12px'}} {...props} />,
            li: ({node, ...props}) => <li style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                color: 'var(--md-sys-color-on-surface-variant)',
                lineHeight: 1.6
            }}><span className="material-symbols-outlined" style={{
                fontSize: '18px',
                marginTop: '3px',
                color: 'var(--md-sys-color-primary)',
                flexShrink: 0
            }}>check_small</span>
                <div>{props.children}</div>
            </li>,
            strong: ({node, ...props}) => <strong
                style={{color: 'var(--md-sys-color-on-surface)', fontWeight: 700}} {...props} />,
            p: ({node, ...props}) => <p style={{
                marginBottom: '1.5em',
                lineHeight: 1.8,
                fontSize: '1.05rem',
                color: 'var(--md-sys-color-on-surface)'
            }} {...props} />
        }}>{content}</ReactMarkdown>
    );
};

export default function OverviewViewer({markdownContent, appConfig, strings}) {
    const [data, setData] = useState({sections: []});
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        if (markdownContent) {
            const parsed = parseOverview(markdownContent);
            setData(parsed);
            if (parsed.sections.length > 0) setActiveSection(parsed.sections[0].id);
        }
    }, [markdownContent]);

    const scrollToSection = (id) => {
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                const offset = 160;
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({top: elementPosition - offset, behavior: 'smooth'});
                setActiveSection(id);
            }
        }, 100);
    };

    const renderTocItems = () => (
        data.sections.map((section) => (
            <button key={section.id} onClick={() => scrollToSection(section.id)} style={{
                textAlign: 'left', background: activeSection === section.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem',
                color: activeSection === section.id ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface-variant)',
                fontWeight: activeSection === section.id ? 600 : 400,
                borderLeft: activeSection === section.id ? `3px solid var(--md-sys-color-primary)` : '3px solid transparent',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
                {section.title}
            </button>
        ))
    );

    return (
        <div style={{height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0}}>
            <div style={{
                marginBottom: '40px',
                paddingBottom: '24px',
                borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                flexShrink: 0
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px'
                }}>
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '16px',
                            color: 'var(--md-sys-color-on-surface-variant)',
                            fontSize: '0.95rem',
                            fontWeight: 500
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
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: 800,
                            margin: 0,
                            lineHeight: 1.1
                        }}>{strings.overview_page.title}</h1>
                        <p style={{
                            fontSize: '1.1rem',
                            color: 'var(--md-sys-color-on-surface-variant)',
                            marginTop: '12px',
                            maxWidth: '800px'
                        }}>{strings.overview_page.subtitle}</p>
                    </div>
                    <a href="https://github.com/fertwbr/PixelPulse" target="_blank" rel="noreferrer"
                       className="btn-outline" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textDecoration: 'none',
                        borderRadius: '100px',
                        padding: '10px 24px',
                        fontSize: '0.9rem'
                    }}>
                        <span className="material-symbols-outlined">code</span> {strings.overview_page.github_btn}
                    </a>
                </div>
            </div>

            <div style={{display: 'flex', gap: '60px', flex: 1, alignItems: 'flex-start'}}>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0}}>
                    <div className="mobile-toc-wrapper" style={{display: 'none'}}>
                        <PageTableOfContents title={strings.overview_page.toc_title}
                                             isMobile={true}>{renderTocItems()}</PageTableOfContents>
                    </div>

                    <div className="content-scroll">
                        {data.sections.map((section, index) => {
                            if (section.type === 'tech-stack') {
                                return (
                                    <motion.div key={section.id} id={section.id} initial={{opacity: 0}}
                                                animate={{opacity: 1}} style={{marginBottom: '80px'}}>
                                        <h2 style={{
                                            fontSize: '2rem',
                                            marginBottom: '24px',
                                            fontWeight: 700
                                        }}>{section.title}</h2>
                                        {section.intro && (<div className="markdown-body" style={{
                                            marginBottom: '40px',
                                            fontSize: '1.1rem',
                                            color: 'var(--md-sys-color-on-surface-variant)',
                                            lineHeight: 1.6
                                        }}><ReactMarkdown>{section.intro}</ReactMarkdown></div>)}
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                            gap: '20px'
                                        }}>
                                            {section.items.map((item, i) => (
                                                <TechStackCard key={i} item={item} index={i}/>))}
                                        </div>
                                    </motion.div>
                                );
                            }
                            return (
                                <motion.div key={section.id} id={section.id} initial={{opacity: 0, y: 20}}
                                            animate={{opacity: 1, y: 0}} transition={{delay: index * 0.1}}
                                            style={{marginBottom: '80px'}}>
                                    {section.type !== 'intro' && (<h2 style={{
                                        fontSize: '2rem',
                                        marginBottom: '32px',
                                        fontWeight: 700
                                    }}>{section.title}</h2>)}
                                    <div className={section.type === 'intro' ? '' : 'glass-card'}
                                         style={section.type === 'intro' ? {fontSize: '1.2rem'} : {
                                             padding: 'clamp(24px, 5vw, 48px)',
                                             borderRadius: '32px'
                                         }}>
                                        {section.type === 'intro' ? (
                                            <ReactMarkdown>{section.content}</ReactMarkdown>) : (
                                            <DeepDiveRenderer content={section.content}/>)}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <div className="desktop-toc-wrapper">
                    <PageTableOfContents title={strings.overview_page.toc_title}
                                         isMobile={false}>{renderTocItems()}</PageTableOfContents>
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