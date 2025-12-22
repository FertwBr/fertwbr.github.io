import React, {useState, useEffect, useMemo} from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import {parseHelpFAQ} from '../../utils/helpParser';
import BackToTop from '../common/BackToTop';
import PageTableOfContents from '../common/PageTableOfContents';
import {useSectionScroll} from '../../hooks/useSectionScroll';
import {handleContactSupport} from '../../utils/navigationUtils';

export default function HelpViewer({markdownContent, strings, appConfig}) {
    const [data, setData] = useState({sections: []});
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const {activeSection, setActiveSection, scrollToSection} = useSectionScroll('');

    useEffect(() => {
        if (markdownContent) {
            const parsed = parseHelpFAQ(markdownContent);
            setData(parsed);
            if (parsed.sections.length > 0 && !activeSection) {
                setActiveSection(parsed.sections[0].id);
            }
        }
    }, [markdownContent, setActiveSection]);

    const filteredSections = useMemo(() => {
        if (!searchQuery) return data.sections;
        const lowerQuery = searchQuery.toLowerCase();
        return data.sections.filter(s => s.title.toLowerCase().includes(lowerQuery) || s.content.toLowerCase().includes(lowerQuery));
    }, [data, searchQuery]);

    const renderTocItems = () => (
        filteredSections.map((section) => (
            <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    background: activeSection === section.id ? 'var(--md-sys-color-secondary-container)' : 'transparent',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    color: activeSection === section.id ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface-variant)',
                    fontWeight: activeSection === section.id ? 700 : 500,
                    marginBottom: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}
            >
                {section.title === 'Introduction' ? 'Overview' : section.title}
            </button>
        ))
    );

    const onSupportClick = () => {
        handleContactSupport('support', navigate, {
            source: appConfig?.appId || 'pixel_compass',
            platform: 'android'
        });
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: 0}}>
            <div style={{
                marginBottom: '40px',
                paddingBottom: '20px',
                borderBottom: '1px solid var(--md-sys-color-outline-variant)',
            }}>
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
                        <span className="material-symbols-outlined" style={{fontSize: '18px'}}>help</span>
                        <span>{strings.help_page.page_title}</span>
                    </div>
                </div>

                <h1 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3rem)',
                    fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-1px'
                }}>{strings.help_page.page_title}</h1>
                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--md-sys-color-on-surface-variant)',
                    marginTop: '12px',
                    maxWidth: '700px'
                }}>{strings.help_page.subtitle}</p>
            </div>

            <div className="help-layout" style={{display: 'flex', gap: '60px', flex: 1, alignItems: 'flex-start'}}>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0}}>
                    <div className="search-input-wrapper" style={{marginBottom: '40px'}}>
                        <span className="material-symbols-outlined" style={{
                            position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                            color: '#ffffff', zIndex: 2
                        }}>search</span>

                        <input
                            type="text"
                            className="search-input-high-contrast"
                            placeholder={strings.help_page.search_placeholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="mobile-toc-wrapper" style={{display: 'none'}}>
                        <PageTableOfContents title={strings.help_page.table_of_contents}
                                             isMobile={true}>{renderTocItems()}</PageTableOfContents>
                    </div>

                    <div className="help-content-scroll">
                        {filteredSections.length > 0 ? (
                            filteredSections.map((section, index) => (
                                <motion.div key={section.id} id={section.id}
                                            initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
                                            transition={{delay: index * 0.1}}
                                            style={{
                                                marginBottom: '40px',
                                                paddingBottom: '40px',
                                                borderBottom: index !== filteredSections.length - 1 ? '1px solid var(--md-sys-color-outline-variant)' : 'none'
                                            }}>
                                    {section.id !== 'introduction' && (
                                        <h2 style={{
                                            fontSize: '1.8rem', marginBottom: '24px',
                                            color: 'var(--md-sys-color-on-surface)',
                                            fontWeight: 700, letterSpacing: '-0.5px'
                                        }}>
                                            {section.title}
                                        </h2>
                                    )}
                                    <div className="markdown-body rich-text">
                                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{section.content}</ReactMarkdown>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div style={{textAlign: 'center', padding: '60px', opacity: 0.7}}>
                                <span className="material-symbols-outlined"
                                      style={{fontSize: '48px', marginBottom: '16px'}}>search_off</span>
                                <p>{strings.help_page.no_results}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="desktop-toc-wrapper" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    width: '300px',
                    position: 'sticky',
                    top: '100px'
                }}>
                    <PageTableOfContents title={strings.help_page.table_of_contents}
                                         isMobile={false}>{renderTocItems()}</PageTableOfContents>

                    <div className="glass-card" style={{
                        padding: '24px',
                        background: 'var(--md-sys-color-surface-container-high)',
                        border: '1px solid var(--md-sys-color-outline-variant)',
                        width: '100%'
                    }}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'var(--md-sys-color-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--md-sys-color-on-primary)'
                            }}><span className="material-symbols-outlined">support_agent</span></div>
                            <h4 style={{margin: 0, fontSize: '1rem'}}>{strings.help_page.contact_title}</h4>
                        </div>
                        <p style={{
                            fontSize: '0.9rem',
                            color: 'var(--md-sys-color-on-surface-variant)',
                            marginBottom: '16px',
                            lineHeight: 1.5
                        }}>
                            {strings.help_page.contact_desc}
                        </p>
                        <button onClick={onSupportClick} className="btn-outline" style={{
                            width: '100%',
                            justifyContent: 'center',
                            background: 'rgba(255,255,255,0.05)',
                            border: 'none',
                            cursor: 'pointer'
                        }}>
                            {strings.help_page.contact_btn}
                        </button>
                    </div>
                </div>

                <BackToTop strings={strings.changelog}/>
                <style>{`
                  .rich-text h1 { display: none; }
                  .rich-text h3 { 
                    font-size: 1.3rem; margin-top: 2em; margin-bottom: 1em; 
                    color: var(--md-sys-color-primary); font-weight: 600; 
                  }
                  .rich-text p { margin-bottom: 1.2em; line-height: 1.7; color: var(--md-sys-color-on-surface-variant); font-size: 1.05rem; }
                  .rich-text ul, .rich-text ol { margin-bottom: 1.5em; padding-left: 1.5em; }
                  .rich-text li { margin-bottom: 0.5em; color: var(--md-sys-color-on-surface-variant); }
                  .rich-text strong { color: var(--md-sys-color-on-surface); font-weight: 700; }
                  .rich-text blockquote { 
                    border-left: 4px solid var(--md-sys-color-primary); 
                    margin-left: 0; padding-left: 20px; 
                    background: var(--md-sys-color-surface-container);
                    padding: 16px; border-radius: 0 12px 12px 0;
                    font-style: italic;
                  }
                  @media (max-width: 1000px) {
                    .desktop-toc-wrapper { display: none !important; }
                    .help-layout { display: block !important; }
                    .mobile-toc-wrapper { display: block !important; }
                  }
                `}</style>
            </div>
        </div>
    );
}